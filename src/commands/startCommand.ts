import { Composer } from "grammy";
import BaseContext from "../types/BaseContext";

const startCommand = new Composer<BaseContext>(async ctx => {
  await ctx.reply(`Welcome, ${ctx.from?.first_name}!`);
});

export default startCommand;