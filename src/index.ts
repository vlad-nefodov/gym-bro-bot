import { Bot, session } from "grammy";
import { conversations } from "@grammyjs/conversations";
import { MongoDBAdapter, ISession } from "@grammyjs/storage-mongodb";
import mongoose from "mongoose";

import { Configuration } from "./helpers/Configuration";
import BaseContext from "./types/BaseContext";
import addExerciseConversation from "./conversations/addExerciseConversation";
import startCommand from "./commands/startCommand";
import addCommand from "./commands/addCommand";
import listCommand from "./commands/listCommand";
import helpCommand from "./commands/helpCommand";

import changeExerciseWeightConversation from "./conversations/changeExerciseWeightConversation";
import defaultCommand from "./commands/defaultCommand";
import ISessionData from "./types/ISessionData";

import selectExerciseCallback from "./callbackQueries/selectExerciseCallback";
import changeExerciseWeightCallback from "./callbackQueries/changeExerciseWeightCallback";
import editExerciseCallback from "./callbackQueries/editExerciseCallback";
import backFromSelectedExerciseCallback from "./callbackQueries/backFromSelectedExerciseCallback";
import deleteExerciseCallback from "./callbackQueries/deleteExerciseCallback";
import listCallback from "./callbackQueries/listCallback";
import addCallback from "./callbackQueries/addCallback";

async function launch() {
  const cfg = new Configuration();
  const token = cfg.get('BOT_API_TOKEN');
  const mongodbConnectionString = cfg.get('MONGODB');

  await mongoose.connect(mongodbConnectionString);
  const collection = mongoose.connection.db.collection<ISession>('users');

  const bot = new Bot<BaseContext>(token);

  bot.use(session<ISessionData, BaseContext>({
    initial: () => ({ exercises: [] }),
    storage: new MongoDBAdapter({ collection }),
    getSessionKey: ctx => ctx.from?.id.toString()
  }));

  bot.use(conversations());
  bot.use(addExerciseConversation);
  bot.use(changeExerciseWeightConversation);

  bot.callbackQuery(/^exercise:\d+$/, selectExerciseCallback);
  bot.callbackQuery(/^exercise:\d+:-?\d+$/, changeExerciseWeightCallback);
  bot.callbackQuery(/^exercise:\d+:edit$/, editExerciseCallback);
  bot.callbackQuery(/^exercise:back$/, backFromSelectedExerciseCallback);
  bot.callbackQuery(/^exercise:\d+:delete$/, deleteExerciseCallback);

  bot.callbackQuery(/list/, listCallback);
  bot.callbackQuery(/add/, addCallback);

  bot.command('start', startCommand);
  bot.command('add', addCommand);
  bot.command('list', listCommand);
  bot.command('help', helpCommand);
  bot.on('msg', defaultCommand);

  bot.start();
}

launch();