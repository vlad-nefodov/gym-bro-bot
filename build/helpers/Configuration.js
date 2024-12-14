"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Configuration = void 0;
const dotenv_1 = require("dotenv");
class Configuration {
    constructor() {
        const { error, parsed } = (0, dotenv_1.config)();
        if (error) {
            throw new Error(".env file is missing");
        }
        this._parsed = parsed;
    }
    get(key) {
        var _a;
        const value = (_a = this._parsed) === null || _a === void 0 ? void 0 : _a[key];
        if (!value) {
            throw new Error(`Value with key "${key}" is not assigned`);
        }
        return value;
    }
}
exports.Configuration = Configuration;
