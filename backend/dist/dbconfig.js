"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequlize = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const Ingredient_1 = __importDefault(require("./models/Ingredient"));
const Opinion_1 = __importDefault(require("./models/Opinion"));
const Recipe_1 = __importDefault(require("./models/Recipe"));
const Unit_1 = __importDefault(require("./models/Unit"));
const User_1 = __importDefault(require("./models/User"));
exports.sequlize = new sequelize_typescript_1.Sequelize({
    dialect: "mysql",
    username: "root",
    password: "",
    database: "culinary",
    models: [
        Ingredient_1.default,
        Opinion_1.default,
        Recipe_1.default,
        Unit_1.default,
        User_1.default
    ],
    timezone: "+01:00",
});
//# sourceMappingURL=dbconfig.js.map