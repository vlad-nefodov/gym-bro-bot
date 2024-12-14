"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const deps_node_1 = require("@grammyjs/conversations/out/deps.node");
function exerciseMenu(ctx, id) {
    const keyboard = new deps_node_1.InlineKeyboard()
        .text('-10', `exercise:${id}:${-10}`)
        .text('-5', `exercise:${id}:${-5}`)
        .text('✏️', `exercise:${id}:edit`)
        .text('+5', `exercise:${id}:${5}`)
        .text('+10', `exercise:${id}:${10}`).row()
        .text('⬅️ Back', `exercise:back`)
        .text('🗑 Delete', `exercise:${id}:delete`);
    return keyboard;
}
;
exports.default = exerciseMenu;
