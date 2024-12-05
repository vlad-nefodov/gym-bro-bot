import { Composer, InlineKeyboard } from "grammy";
import BaseContext from "../types/BaseContext";
import listMenu from "../navigation/listMenu";
import toEmojiNumbers from "../helpers/toEmojiNumbers";

const listCommand = new Composer<BaseContext>(async ctx => {
  if (ctx.session.exercises.length === 0) {
    await ctx.reply(`😢 There are no exercises yet.`, {
      reply_markup: new InlineKeyboard().text('➕ Add new', 'add')
    });
    return;
  }

  await ctx.reply(`📋 <b>Count</b> – ${toEmojiNumbers(ctx.session.exercises.length)}`, {
    reply_markup: listMenu(ctx),
    parse_mode: 'HTML'
  });
});

export default listCommand;