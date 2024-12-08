"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IngredientRepository = void 0;
const BaseRepository_1 = require("./BaseRepository");
const Ingredient_1 = __importDefault(require("../models/Ingredient"));
class IngredientRepository extends BaseRepository_1.BaseRepository {
    constructor() {
        super(Ingredient_1.default);
    }
}
exports.IngredientRepository = IngredientRepository;
//# sourceMappingURL=IngredientRepository.js.map