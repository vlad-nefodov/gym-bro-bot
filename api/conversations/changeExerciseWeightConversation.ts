import BaseContext from "../types/BaseContext";
import IExercise from "../types/IExercise";
import { createConversation } from "@grammyjs/conversations";
import exerciseMenu from "../navigation/exerciseMenu";

const changeExerciseWeightConversation = createConversation<BaseContext>(async (conversation, ctx) => {
  const id = conversation.session.selectedExerciseId;
  if (id === undefined) throw new Error('conversation.session.selectedExerciseId is undefined');
  const oldWeight = conversation.session.exercises[id].weight;

  const newWeightRequestMessage = await ctx.reply('🏋️‍♂️ New weight?', {
    reply_markup: {
      force_reply: true,
      input_field_placeholder: oldWeight.toString()
    }
  });
  const newWeight = await conversation.form.number(async ctx => {
    await ctx.reply('⚠️ Weight must be a whole number', {
      reply_to_message_id: newWeightRequestMessage.message_id,
      reply_markup: {
        force_reply: true,
        input_field_placeholder: oldWeight.toString()
      }
    });
    await conversation.skip({ drop: true });
  });

  const exercise = conversation.session.exercises[id];
  exercise.weight = newWeight;
  const headerEmoji = exercise.weight >= oldWeight ? '🎉' : '😢';

  await ctx.reply(`${headerEmoji} <b>Changed!</b>
<i>${exercise.title}</i> – ${oldWeight}kg ➡️ <b>${exercise.weight}kg</b>`, {
    reply_markup: exerciseMenu(ctx, id),
    parse_mode: 'HTML'
  });
}, 'changeExerciseWeightConversation');

export default changeExerciseWeightConversation;