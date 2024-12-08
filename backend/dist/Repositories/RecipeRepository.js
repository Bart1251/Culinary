"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecipeRepository = void 0;
const BaseRepository_1 = require("./BaseRepository");
const Recipe_1 = __importDefault(require("../models/Recipe"));
class RecipeRepository extends BaseRepository_1.BaseRepository {
    constructor() {
        super(Recipe_1.default);
    }
}
exports.RecipeRepository = RecipeRepository;
//# sourceMappingURL=RecipeRepository.js.map