import { Bot, session, webhookCallback } from "grammy";
import { ISession, MongoDBAdapter } from "@grammyjs/storage-mongodb";

import BaseContext from "../src/types/BaseContext";
import { Configuration } from "../src/helpers/Configuration";
import ISessionData from "../src/types/ISessionData";
import addCallback from "../src/callbackQueries/addCallback";
import addCommand from "../src/commands/addCommand";
import addExerciseConversation from "../src/conversations/addExerciseConversation";
import backFromSelectedExerciseCallback from "../src/callbackQueries/backFromSelectedExerciseCallback";
import changeExerciseWeightCallback from "../src/callbackQueries/changeExerciseWeightCallback";
import changeExerciseWeightConversation from "../src/conversations/changeExerciseWeightConversation";
import { conversations } from "@grammyjs/conversations";
import defaultCommand from "../src/commands/defaultCommand";
import deleteExerciseCallback from "../src/callbackQueries/deleteExerciseCallback";
import editExerciseCallback from "../src/callbackQueries/editExerciseCallback";
import helpCommand from "../src/commands/helpCommand";
import listCallback from "../src/callbackQueries/listCallback";
import listCommand from "../src/commands/listCommand";
import mongoose from "mongoose";
import selectExerciseCallback from "../src/callbackQueries/selectExerciseCallback";
import startCommand from "../src/commands/startCommand";
import { waitUntil } from "@vercel/functions";

async function launch() {
  const cfg = new Configuration();
  const token = cfg.get("BOT_API_TOKEN");
  const mongodbConnectionString = cfg.get("MONGODB");

  await mongoose.connect(mongodbConnectionString);
  const collection = mongoose.connection.db?.collection<ISession>("users");

  const bot = new Bot<BaseContext>(token);

  if (collection === undefined) throw new Error("Cannot connect to MongoDB");

  bot.use(
    session<ISessionData, BaseContext>({
      initial: () => ({ exercises: [] }),
      storage: new MongoDBAdapter({ collection }),
      getSessionKey: (ctx) => ctx.from?.id.toString(),
    })
  );

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

  bot.command("start", startCommand);
  bot.command("add", addCommand);
  bot.command("list", listCommand);
  bot.command("help", helpCommand);
  bot.on("msg", defaultCommand);

  return bot;
}

let launchedBot: any;

waitUntil(launch().then((bot) => (launchedBot = bot)));

export default webhookCallback(launchedBot, "https");
