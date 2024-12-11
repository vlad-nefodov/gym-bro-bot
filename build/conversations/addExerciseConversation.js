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
const conversations_1 = require("@grammyjs/conversations");
const grammy_1 = require("grammy");
const addExerciseConversation = (0, conversations_1.createConversation)((conversation, ctx) => __awaiter(void 0, void 0, void 0, function* () {
    const nameRequestMessage = yield ctx.reply('🤔 Name?', {
        reply_markup: {
            force_reply: true,
            input_field_placeholder: 'Bench press'
        }
    });
    const title = yield conversation.form.text((ctx) => __awaiter(void 0, void 0, void 0, function* () {
        yield ctx.reply('⚠️ Name must be between 5 and 100 characters', {
            reply_to_message_id: nameRequestMessage.message_id,
            reply_markup: {
                force_reply: true,
                input_field_placeholder: 'Bench press'
            }
        });
        yield conversation.skip({ drop: true });
    }));
    const weightRequestMessage = yield ctx.reply(`🏋️‍♂️ Weight?`, {
        reply_markup: {
            force_reply: true,
            input_field_placeholder: '100'
        }
    });
    const weight = yield conversation.form.number((ctx) => __awaiter(void 0, void 0, void 0, function* () {
        yield ctx.reply('⚠️ Weight must be a whole number', {
            reply_to_message_id: weightRequestMessage.message_id,
            reply_markup: {
                force_reply: true,
                input_field_placeholder: '100'
            }
        });
        yield conversation.skip({ drop: true });
    }));
    const exercise = {
        title,
        weight
    };
    conversation.session.exercises.push(exercise);
    yield ctx.reply(`✅ <b>Added!</b>
<i>${exercise.title}</i> – ${exercise.weight}kg`, {
        reply_markup: new grammy_1.InlineKeyboard().text('📋 Show all', 'list'),
        parse_mode: 'HTML'
    });
}), 'addExerciseConversation');
exports.default = addExerciseConversation;
