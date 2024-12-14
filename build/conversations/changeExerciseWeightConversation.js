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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const conversations_1 = require("@grammyjs/conversations");
const exerciseMenu_1 = __importDefault(require("../navigation/exerciseMenu"));
const changeExerciseWeightConversation = (0, conversations_1.createConversation)((conversation, ctx) => __awaiter(void 0, void 0, void 0, function* () {
    const id = conversation.session.selectedExerciseId;
    if (id === undefined)
        throw new Error('conversation.session.selectedExerciseId is undefined');
    const oldWeight = conversation.session.exercises[id].weight;
    const newWeightRequestMessage = yield ctx.reply('🏋️‍♂️ New weight?', {
        reply_markup: {
            force_reply: true,
            input_field_placeholder: oldWeight.toString()
        }
    });
    const newWeight = yield conversation.form.number((ctx) => __awaiter(void 0, void 0, void 0, function* () {
        yield ctx.reply('⚠️ Weight must be a whole number', {
            reply_to_message_id: newWeightRequestMessage.message_id,
            reply_markup: {
                force_reply: true,
                input_field_placeholder: oldWeight.toString()
            }
        });
        yield conversation.skip({ drop: true });
    }));
    const exercise = conversation.session.exercises[id];
    exercise.weight = newWeight;
    const headerEmoji = exercise.weight >= oldWeight ? '🎉' : '😢';
    yield ctx.reply(`${headerEmoji} <b>Changed!</b>
<i>${exercise.title}</i> – ${oldWeight}kg ➡️ <b>${exercise.weight}kg</b>`, {
        reply_markup: (0, exerciseMenu_1.default)(ctx, id),
        parse_mode: 'HTML'
    });
}), 'changeExerciseWeightConversation');
exports.default = changeExerciseWeightConversation;
