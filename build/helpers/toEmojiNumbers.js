"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function toEmojiNumbers(num) {
    const emojiCodes = ['0️⃣', '1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣'];
    return num.toString().split('').map(n => emojiCodes[Number(n)]).join('');
}
exports.default = toEmojiNumbers;
