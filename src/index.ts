import { Bot, session, webhookCallback } from "grammy";
import { ISession, MongoDBAdapter } from "@grammyjs/storage-mongodb";

import BaseContext from "./types/BaseContext";
import { Configuration } from "./helpers/Configuration";
import ISessionData from "./types/ISessionData";
import addCallback from "./callbackQueries/addCallback";
import addCommand from "./commands/addCommand";
import addExerciseConversation from "./conversations/addExerciseConversation";
import backFromSelectedExerciseCallback from "./callbackQueries/backFromSelectedExerciseCallback";
import changeExerciseWeightCallback from "./callbackQueries/changeExerciseWeightCallback";
import changeExerciseWeightConversation from "./conversations/changeExerciseWeightConversation";
import { conversations } from "@grammyjs/conversations";
import defaultCommand from "./commands/defaultCommand";
import deleteExerciseCallback from "./callbackQueries/deleteExerciseCallback";
import editExerciseCallback from "./callbackQueries/editExerciseCallback";
import helpCommand from "./commands/helpCommand";
import listCallback from "./callbackQueries/listCallback";
import listCommand from "./commands/listCommand";
import mongoose from "mongoose";
import selectExerciseCallback from "./callbackQueries/selectExerciseCallback";
import startCommand from "./commands/startCommand";

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

  process.once("SIGINT", () => bot.stop());
  process.once("SIGTERM", () => bot.stop());

  bot.start();
}

launch();
