import { Composer } from "grammy";
import BaseContext from "../types/BaseContext";

const helpCommand = new Composer<BaseContext>(async ctx =>
  await ctx.reply(
    `⭐️ My goal is to make it easy for you to track the results of your workouts. I will do everything in my power to make sure you stay persistent!\n\n⬇️ Here are some helpful commands:

/add – add a new exercise ➕
/list – show exercises 📋

💬 Also, if you feel like support, feel free to send me any message.`));

export default helpCommand;