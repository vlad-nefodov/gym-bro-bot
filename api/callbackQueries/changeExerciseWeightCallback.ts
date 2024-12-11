import { Composer } from "grammy";
import exerciseMenu from "../navigation/exerciseMenu";
import BaseContext from "../types/BaseContext";

const changeExerciseWeightCallback = new Composer<BaseContext>(async ctx => {
  const args = ctx.callbackQuery?.data?.split(':');
  if (!args) throw new Error('changeExerciseWeightCallback::args is undefined');
  const id = Number(args[1]);
  const value = Number(args[2]);

  const exercise = ctx.session.exercises[id];
  exercise.weight += value;

  await ctx.editMessageText(`<b>${exercise.title}</b> – ${exercise.weight}kg`, {
    reply_markup: exerciseMenu(ctx, id),
    parse_mode: 'HTML'
  });
  await ctx.answerCallbackQuery();
});

export default changeExerciseWeightCallback;