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
const quotes = [
    {
        text: "The only way to do great work is to love what you do.",
        author: "Steve Jobs"
    },
    {
        text: "Believe you can and you're halfway there.",
        author: "Theodore Roosevelt"
    },
    {
        text: "Success is not final, failure is not fatal: It is the courage to continue that counts.",
        author: "Winston Churchill"
    },
    {
        text: "The future belongs to those who believe in the beauty of their dreams.",
        author: "Eleanor Roosevelt"
    },
    {
        text: "The only limit to our realization of tomorrow will be our doubts of today.",
        author: "Franklin D. Roosevelt"
    },
    {
        text: "Strive for progress, not perfection."
    },
    {
        text: "Your attitude determines your direction."
    },
    {
        text: "The harder you work for something, the greater you'll feel when you achieve it."
    },
    {
        text: "Every accomplishment starts with the decision to try."
    },
    {
        text: "Dream big and dare to fail.",
        author: "Norman Vaughan"
    },
    {
        text: "You are never too old to set another goal or to dream a new dream.",
        author: "C.S. Lewis"
    },
    {
        text: "Success is walking from failure to failure with no loss of enthusiasm.",
        author: "Winston Churchill"
    },
    {
        text: "Challenges are what make life interesting and overcoming them is what makes life meaningful.",
        author: "Joshua J. Marine"
    },
    {
        text: "The secret of getting ahead is getting started.",
        author: "Mark Twain"
    },
    {
        text: "The only person you are destined to become is the person you decide to be.",
        author: "Ralph Waldo Emerson"
    },
    {
        text: "Don't watch the clock; do what it does. Keep going.",
        author: "Sam Levenson"
    },
    {
        text: "In the middle of every difficulty lies opportunity.",
        author: "Albert Einstein"
    },
    {
        text: "Your time is limited, don't waste it living someone else's life.",
        author: "Steve Jobs"
    },
    {
        text: "Strength does not come from physical capacity. It comes from an indomitable will.",
        author: "Mahatma Gandhi"
    },
    {
        text: "You miss 100% of the shots you don’t take.",
        author: "Wayne Gretzky"
    },
    {
        text: "Opportunities don't happen. You create them.",
        author: "Chris Grosser"
    },
    {
        text: "The only place where success comes before work is in the dictionary.",
        author: "Vidal Sassoon"
    },
    {
        text: "The best way to predict the future is to create it.",
        author: "Peter Drucker"
    },
    {
        text: "Success is not the key to happiness. Happiness is the key to success. If you love what you are doing, you will be successful.",
        author: "Albert Schweitzer"
    },
    {
        text: "If you can dream it, you can achieve it.",
        author: "Zig Ziglar"
    },
    {
        text: "Failure is the opportunity to begin again more intelligently.",
        author: "Henry Ford"
    },
    {
        text: "Believe in yourself and all that you are. Know that there is something inside you that is greater than any obstacle.",
        author: "Christian D. Larson"
    },
    {
        text: "The road to success and the road to failure are almost exactly the same.",
        author: "Colin R. Davis"
    },
    {
        text: "The only person you should try to be better than is the person you were yesterday."
    },
    {
        text: "Success is not just about making money. It's about making a difference."
    },
    {
        text: "You are capable of more than you know.",
        author: "Glinda, The Wizard of Oz"
    },
    {
        text: "Action is the foundational key to all success.",
        author: "Pablo Picasso"
    },
    {
        text: "A journey of a thousand miles begins with a single step.",
        author: "Lao Tzu"
    },
    {
        text: "Success is liking yourself, liking what you do, and liking how you do it.",
        author: "Maya Angelou"
    },
    {
        text: "The biggest risk is not taking any risk. In a world that's changing quickly, the only strategy that is guaranteed to fail is not taking risks.",
        author: "Mark Zuckerberg"
    },
    {
        text: "The difference between a stumbling block and a stepping stone is how high you raise your foot.",
        author: "Benny Lewis"
    },
    {
        text: "The only limit to our realization of tomorrow will be our doubts of today.",
        author: "Franklin D. Roosevelt"
    },
    {
        text: "You don't have to be great to start, but you have to start to be great.",
        author: "Zig Ziglar"
    },
    {
        text: "If opportunity doesn’t knock, build a door.",
        author: "Milton Berle"
    },
    {
        text: "Success is walking from failure to failure with no loss of enthusiasm.",
        author: "Winston Churchill"
    },
    {
        text: "Success is not the absence of failure; it's the persistence through failure.",
        author: "Aisha Tyler"
    },
    {
        text: "When you feel like quitting, think about why you started."
    },
    {
        text: "The secret to getting ahead is getting started.",
        author: "Mark Twain"
    },
    {
        text: "The only way to achieve the impossible is to believe it is possible.",
        author: "Charles Kingsleigh, Alice in Wonderland"
    },
    {
        text: "The only limit to our realization of tomorrow will be our doubts of today.",
        author: "Franklin D. Roosevelt"
    },
    {
        text: "Success usually comes to those who are too busy to be looking for it.",
        author: "Henry David Thoreau"
    },
    {
        text: "Don't be afraid to give up the good to go for the great.",
        author: "John D. Rockefeller"
    },
    {
        text: "If you want to achieve greatness, stop asking for permission."
    },
    {
        text: "The key to success is to focus on goals, not obstacles."
    },
    {
        text: "Believe you can and you're halfway there.",
        author: "Theodore Roosevelt"
    },
    {
        text: "The only way to do great work is to love what you do.",
        author: "Steve Jobs"
    }
];
const defaultCommand = new grammy_1.Composer((ctx) => __awaiter(void 0, void 0, void 0, function* () {
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    const authorPart = randomQuote.author ? ` – ${randomQuote.author}` : '';
    yield ctx.reply(`✨ <b><i>"${randomQuote.text}"</i></b>${authorPart}`, {
        parse_mode: 'HTML'
    });
}));
exports.default = defaultCommand;
