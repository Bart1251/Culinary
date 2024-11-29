"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequlize = void 0;
const path_1 = __importDefault(require("path"));
const sequelize_typescript_1 = require("sequelize-typescript");
exports.sequlize = new sequelize_typescript_1.Sequelize({
    dialect: "mysql",
    username: "root",
    password: "",
    database: "culinary",
    models: [path_1.default.join(__dirname, "./Models")],
    timezone: "+01:00",
});
//# sourceMappingURL=dbconfig.js.map