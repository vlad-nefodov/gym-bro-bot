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
const helpCommand = new grammy_1.Composer((ctx) => __awaiter(void 0, void 0, void 0, function* () {
    return yield ctx.reply(`⭐️ My goal is to make it easy for you to track the results of your workouts. I will do everything in my power to make sure you stay persistent!\n\n⬇️ Here are some helpful commands:

/add – add a new exercise ➕
/list – show exercises 📋

💬 Also, if you feel like support, feel free to send me any message.`);
}));
exports.default = helpCommand;
