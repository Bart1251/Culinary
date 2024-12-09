"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryRepository = void 0;
const BaseRepository_1 = require("./BaseRepository");
const Category_1 = __importDefault(require("../models/Category"));
class CategoryRepository extends BaseRepository_1.BaseRepository {
    constructor() {
        super(Category_1.default);
    }
}
exports.CategoryRepository = CategoryRepository;
//# sourceMappingURL=CategoryRepository.js.map