import { Composer } from "grammy";
import BaseContext from "../types/BaseContext";
import listCommand from "../commands/listCommand";

const listCallback = new Composer<BaseContext>(async (ctx, next) => {
  await next();
  await ctx.answerCallbackQuery();
}, listCommand);

export default listCallback;