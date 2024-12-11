import BaseContext from "../types/BaseContext";
import { InlineKeyboard } from "grammy";

function listMenu(ctx: BaseContext) {

  const buttons = ctx.session.exercises.map((e, i) =>
    [InlineKeyboard.text(`${i + 1}. ${e.title} – ${e.weight}kg`, `exercise:${i}`)]);
  return new InlineKeyboard(buttons);
};

export default listMenu;