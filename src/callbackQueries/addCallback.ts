import { Composer } from "grammy";
import BaseContext from "../types/BaseContext";
import addCommand from "../commands/addCommand";

const addCallback = new Composer<BaseContext>(async (ctx, next) => {
  await next();
  await ctx.answerCallbackQuery();
}, addCommand);

export default addCallback;