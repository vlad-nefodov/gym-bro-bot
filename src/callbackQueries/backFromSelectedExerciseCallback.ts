import { Composer, InlineKeyboard } from "grammy";
import BaseContext from "../types/BaseContext";
import toEmojiNumbers from "../helpers/toEmojiNumbers";
import listMenu from "../navigation/listMenu";

const backFromSelectedExerciseCallback = new Composer<BaseContext>(async ctx => {
  if (ctx.session.exercises.length === 0) {
    await ctx.reply(`😢 There are no exercises yet.`, {
      reply_markup: new InlineKeyboard().text('➕ Add new', 'add')
    });
  }
  else {
    await ctx.editMessageText(`📋 <b>Count</b> – ${toEmojiNumbers(ctx.session.exercises.length)}`, {
      reply_markup: listMenu(ctx),
      parse_mode: 'HTML'
    });
  }
  await ctx.answerCallbackQuery();
});

export default backFromSelectedExerciseCallback;