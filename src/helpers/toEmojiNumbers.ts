function toEmojiNumbers(num: number) {
  const emojiCodes = ['0️⃣', '1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣'];
  return num.toString().split('').map(n => emojiCodes[Number(n)]).join('');
}

export default toEmojiNumbers;