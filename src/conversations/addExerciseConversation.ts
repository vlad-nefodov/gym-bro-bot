import { createConversation } from "@grammyjs/conversations";
import BaseContext from "../types/BaseContext";
import IExercise from "../types/IExercise";
import { InlineKeyboard } from "grammy";

const addExerciseConversation = createConversation<BaseContext>(async (conversation, ctx) => {
  const nameRequestMessage = await ctx.reply('🤔 Name?', {
    reply_markup: {
      force_reply: true,
      input_field_placeholder: 'Bench press'
    }
  });

  const title = await conversation.form.text(async ctx => {
    await ctx.reply('⚠️ Name must be between 5 and 100 characters', {
      reply_to_message_id: nameRequestMessage.message_id,
      reply_markup: {
        force_reply: true,
        input_field_placeholder: 'Bench press'
      }
    });
    await conversation.skip({ drop: true });
  });

  const weightRequestMessage = await ctx.reply(`🏋️‍♂️ Weight?`, {
    reply_markup: {
      force_reply: true,
      input_field_placeholder: '100'
    }
  });
  const weight = await conversation.form.number(async ctx => {
    await ctx.reply('⚠️ Weight must be a whole number', {
      reply_to_message_id: weightRequestMessage.message_id,
      reply_markup: {
        force_reply: true,
        input_field_placeholder: '100'
      }
    });
    await conversation.skip({ drop: true });
  });

  const exercise: IExercise = {
    title,
    weight
  };

  conversation.session.exercises.push(exercise);

  await ctx.reply(`✅ <b>Added!</b>
<i>${exercise.title}</i> – ${exercise.weight}kg`, {
    reply_markup: new InlineKeyboard().text('📋 Show all', 'list'),
    parse_mode: 'HTML'
  });
}, 'addExerciseConversation');

export default addExerciseConversation;