import { Composer } from "grammy";
import BaseContext from "../types/BaseContext";

const addCommand = new Composer<BaseContext>(async ctx => {
  await ctx.conversation.enter('addExerciseConversation');
});

export default addCommand;