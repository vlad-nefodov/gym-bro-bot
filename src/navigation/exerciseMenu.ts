import { Composer, InlineKeyboard } from "@grammyjs/conversations/out/deps.node";
import BaseContext from "../types/BaseContext";

function exerciseMenu(ctx: BaseContext, id: number) {
  const keyboard = new InlineKeyboard()
    .text('-10', `exercise:${id}:${-10}`)
    .text('-5', `exercise:${id}:${-5}`)
    .text('✏️', `exercise:${id}:edit`)
    .text('+5', `exercise:${id}:${5}`)
    .text('+10', `exercise:${id}:${10}`).row()
    .text('⬅️ Back', `exercise:back`)
    .text('🗑 Delete', `exercise:${id}:delete`);

  return keyboard;
};

export default exerciseMenu;