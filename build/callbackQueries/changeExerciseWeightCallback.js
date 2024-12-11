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
const grammy_1 = require("grammy");
const exerciseMenu_1 = __importDefault(require("../navigation/exerciseMenu"));
const changeExerciseWeightCallback = new grammy_1.Composer((ctx) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const args = (_b = (_a = ctx.callbackQuery) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.split(':');
    if (!args)
        throw new Error('changeExerciseWeightCallback::args is undefined');
    const id = Number(args[1]);
    const value = Number(args[2]);
    const exercise = ctx.session.exercises[id];
    exercise.weight += value;
    yield ctx.editMessageText(`<b>${exercise.title}</b> – ${exercise.weight}kg`, {
        reply_markup: (0, exerciseMenu_1.default)(ctx, id),
        parse_mode: 'HTML'
    });
    yield ctx.answerCallbackQuery();
}));
exports.default = changeExerciseWeightCallback;
