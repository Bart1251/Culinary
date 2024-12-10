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
const User_1 = __importDefault(require("./User"));
const Category_1 = __importDefault(require("./Category"));
const Ingredient_1 = __importDefault(require("./Ingredient"));
const Step_1 = __importDefault(require("./Step"));
const Opinion_1 = __importDefault(require("./Opinion"));
let Recipe = class Recipe extends sequelize_typescript_1.Model {
};
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING, allowNull: false }),
    __metadata("design:type", String)
], Recipe.prototype, "name", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING, allowNull: false }),
    __metadata("design:type", String)
], Recipe.prototype, "description", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING, allowNull: true }),
    __metadata("design:type", String)
], Recipe.prototype, "imagePath", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, allowNull: false }),
    __metadata("design:type", Number)
], Recipe.prototype, "difficulty", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, allowNull: false }),
    __metadata("design:type", Number)
], Recipe.prototype, "prepareTime", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => User_1.default),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, allowNull: false }),
    __metadata("design:type", Number)
], Recipe.prototype, "userId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => User_1.default),
    __metadata("design:type", User_1.default)
], Recipe.prototype, "user", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => Category_1.default),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, allowNull: false }),
    __metadata("design:type", Number)
], Recipe.prototype, "categoryId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => Category_1.default),
    __metadata("design:type", Category_1.default)
], Recipe.prototype, "category", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => Ingredient_1.default),
    __metadata("design:type", Array)
], Recipe.prototype, "ingredient", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => Step_1.default),
    __metadata("design:type", Array)
], Recipe.prototype, "steps", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => Opinion_1.default),
    __metadata("design:type", Array)
], Recipe.prototype, "opinions", void 0);
Recipe = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: "recipe", timestamps: true })
], Recipe);
exports.default = Recipe;
//# sourceMappingURL=Recipe.js.map