"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const grammy_1 = require("grammy");
const deleteExerciseCallback = new grammy_1.Composer((ctx) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const args = (_b = (_a = ctx.callbackQuery) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.split(':');
    if (!args)
        throw new Error('deleteExerciseCallback::args is undefined');
    const id = Number(args[1]);
    const exercise = ctx.session.exercises[id];
    ctx.session.exercises.splice(id, 1);
    yield ctx.editMessageText(`❌ <b>Deleted!</b>
<i>${exercise.title}</i> – ${exercise.weight}kg`, {
        reply_markup: new grammy_1.InlineKeyboard().text('📋 Show all', 'list'),
        parse_mode: 'HTML'
    });
    yield ctx.answerCallbackQuery();
}));
exports.default = deleteExerciseCallback;
