import { Composer } from "grammy";
import BaseContext from "../types/BaseContext";

const editExerciseCallback = new Composer<BaseContext>(async ctx => {
  const args = ctx.callbackQuery?.data?.split(':');
  if (!args) throw new Error('editExerciseCallback::args is undefined');
  const id = Number(args[1]);

  ctx.session.selectedExerciseId = id;
  await ctx.conversation.enter('changeExerciseWeightConversation');

  await ctx.answerCallbackQuery();
});

export default editExerciseCallback;