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
const storage_mongodb_1 = require("@grammyjs/storage-mongodb");
const Configuration_1 = require("./helpers/Configuration");
const addCallback_1 = __importDefault(require("./callbackQueries/addCallback"));
const addCommand_1 = __importDefault(require("./commands/addCommand"));
const addExerciseConversation_1 = __importDefault(require("./conversations/addExerciseConversation"));
const backFromSelectedExerciseCallback_1 = __importDefault(require("./callbackQueries/backFromSelectedExerciseCallback"));
const changeExerciseWeightCallback_1 = __importDefault(require("./callbackQueries/changeExerciseWeightCallback"));
const changeExerciseWeightConversation_1 = __importDefault(require("./conversations/changeExerciseWeightConversation"));
const conversations_1 = require("@grammyjs/conversations");
const defaultCommand_1 = __importDefault(require("./commands/defaultCommand"));
const deleteExerciseCallback_1 = __importDefault(require("./callbackQueries/deleteExerciseCallback"));
const editExerciseCallback_1 = __importDefault(require("./callbackQueries/editExerciseCallback"));
const helpCommand_1 = __importDefault(require("./commands/helpCommand"));
const listCallback_1 = __importDefault(require("./callbackQueries/listCallback"));
const listCommand_1 = __importDefault(require("./commands/listCommand"));
const mongoose_1 = __importDefault(require("mongoose"));
const selectExerciseCallback_1 = __importDefault(require("./callbackQueries/selectExerciseCallback"));
const startCommand_1 = __importDefault(require("./commands/startCommand"));
function launch() {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const cfg = new Configuration_1.Configuration();
        const token = cfg.get("BOT_API_TOKEN");
        const mongodbConnectionString = cfg.get("MONGODB");
        yield mongoose_1.default.connect(mongodbConnectionString);
        const collection = (_a = mongoose_1.default.connection.db) === null || _a === void 0 ? void 0 : _a.collection("users");
        const bot = new grammy_1.Bot(token);
        if (collection === undefined)
            throw new Error("Cannot connect to MongoDB");
        bot.use((0, grammy_1.session)({
            initial: () => ({ exercises: [] }),
            storage: new storage_mongodb_1.MongoDBAdapter({ collection }),
            getSessionKey: (ctx) => { var _a; return (_a = ctx.from) === null || _a === void 0 ? void 0 : _a.id.toString(); },
        }));
        bot.use((0, conversations_1.conversations)());
        bot.use(addExerciseConversation_1.default);
        bot.use(changeExerciseWeightConversation_1.default);
        bot.callbackQuery(/^exercise:\d+$/, selectExerciseCallback_1.default);
        bot.callbackQuery(/^exercise:\d+:-?\d+$/, changeExerciseWeightCallback_1.default);
        bot.callbackQuery(/^exercise:\d+:edit$/, editExerciseCallback_1.default);
        bot.callbackQuery(/^exercise:back$/, backFromSelectedExerciseCallback_1.default);
        bot.callbackQuery(/^exercise:\d+:delete$/, deleteExerciseCallback_1.default);
        bot.callbackQuery(/list/, listCallback_1.default);
        bot.callbackQuery(/add/, addCallback_1.default);
        bot.command("start", startCommand_1.default);
        bot.command("add", addCommand_1.default);
        bot.command("list", listCommand_1.default);
        bot.command("help", helpCommand_1.default);
        bot.on("msg", defaultCommand_1.default);
        process.once("SIGINT", () => bot.stop());
        process.once("SIGTERM", () => bot.stop());
        bot.start();
    });
}
launch();
