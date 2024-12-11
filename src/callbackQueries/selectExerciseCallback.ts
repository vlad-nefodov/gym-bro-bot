import { Composer } from "grammy";
import exerciseMenu from "../navigation/exerciseMenu";
import BaseContext from "../types/BaseContext";

const selectExerciseCallback = new Composer<BaseContext>(async ctx => {
  const args = ctx.callbackQuery?.data?.split(':');
  if (!args) throw new Error('selectExerciseCallback::args is undefined');
  const id = Number(args[1]);
  const exercise = ctx.session.exercises[id];

  await ctx.editMessageText(`<b>${exercise.title}</b> – ${exercise.weight}kg`, {
    reply_markup: exerciseMenu(ctx, id),
    parse_mode: 'HTML'
  });
  await ctx.answerCallbackQuery();
});

export default selectExerciseCallback;