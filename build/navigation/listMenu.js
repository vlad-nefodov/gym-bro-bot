"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const grammy_1 = require("grammy");
function listMenu(ctx) {
    const buttons = ctx.session.exercises.map((e, i) => [grammy_1.InlineKeyboard.text(`${i + 1}. ${e.title} – ${e.weight}kg`, `exercise:${i}`)]);
    return new grammy_1.InlineKeyboard(buttons);
}
;
exports.default = listMenu;
