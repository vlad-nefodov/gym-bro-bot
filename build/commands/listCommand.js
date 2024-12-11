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
const listMenu_1 = __importDefault(require("../navigation/listMenu"));
const toEmojiNumbers_1 = __importDefault(require("../helpers/toEmojiNumbers"));
const listCommand = new grammy_1.Composer((ctx) => __awaiter(void 0, void 0, void 0, function* () {
    if (ctx.session.exercises.length === 0) {
        yield ctx.reply(`😢 There are no exercises yet.`, {
            reply_markup: new grammy_1.InlineKeyboard().text('➕ Add new', 'add')
        });
        return;
    }
    yield ctx.reply(`📋 <b>Count</b> – ${(0, toEmojiNumbers_1.default)(ctx.session.exercises.length)}`, {
        reply_markup: (0, listMenu_1.default)(ctx),
        parse_mode: 'HTML'
    });
}));
exports.default = listCommand;
