"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const Unit_1 = __importDefault(require("./Unit"));
const Recipe_1 = __importDefault(require("./Recipe"));
let Ingredient = class Ingredient extends sequelize_typescript_1.Model {
};
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING, allowNull: false }),
    __metadata("design:type", String)
], Ingredient.prototype, "name", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.FLOAT, allowNull: false }),
    __metadata("design:type", Number)
], Ingredient.prototype, "amount", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => Unit_1.default),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, allowNull: false }),
    __metadata("design:type", Number)
], Ingredient.prototype, "unitId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => Unit_1.default),
    __metadata("design:type", Unit_1.default)
], Ingredient.prototype, "unit", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => Recipe_1.default),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, allowNull: false }),
    __metadata("design:type", Number)
], Ingredient.prototype, "recipeId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => Recipe_1.default),
    __metadata("design:type", Recipe_1.default)
], Ingredient.prototype, "recipe", void 0);
Ingredient = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: "ingredient", timestamps: false })
], Ingredient);
exports.default = Ingredient;
//# sourceMappingURL=Ingredient.js.map