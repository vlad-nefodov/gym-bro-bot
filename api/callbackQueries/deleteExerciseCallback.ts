import { Composer, InlineKeyboard } from "grammy";
import BaseContext from "../types/BaseContext";
import toEmojiNumbers from "../helpers/toEmojiNumbers";
import listMenu from "../navigation/listMenu";

const deleteExerciseCallback = new Composer<BaseContext>(async ctx => {
  const args = ctx.callbackQuery?.data?.split(':');
  if (!args) throw new Error('deleteExerciseCallback::args is undefined');
  const id = Number(args[1]);
  const exercise = ctx.session.exercises[id];

  ctx.session.exercises.splice(id, 1);

  await ctx.editMessageText(`❌ <b>Deleted!</b>
<i>${exercise.title}</i> – ${exercise.weight}kg`, {
    reply_markup: new InlineKeyboard().text('📋 Show all', 'list'),
    parse_mode: 'HTML'
  });
  await ctx.answerCallbackQuery();
});

export default deleteExerciseCallback;