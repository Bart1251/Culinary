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
exports.RecipeRepository = void 0;
const BaseRepository_1 = require("./BaseRepository");
const Recipe_1 = __importDefault(require("../models/Recipe"));
const Ingredient_1 = __importDefault(require("../models/Ingredient"));
const Step_1 = __importDefault(require("../models/Step"));
const Unit_1 = __importDefault(require("../models/Unit"));
const Category_1 = __importDefault(require("../models/Category"));
const Opinion_1 = __importDefault(require("../models/Opinion"));
const User_1 = __importDefault(require("../models/User"));
class RecipeRepository extends BaseRepository_1.BaseRepository {
    constructor() {
        super(Recipe_1.default);
    }
    findByUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.model.findAll({
                where: { userId },
                include: [
                    {
                        model: Ingredient_1.default,
                        include: [
                            {
                                model: Unit_1.default,
                            },
                        ],
                    },
                    {
                        model: Step_1.default,
                    },
                    {
                        model: Category_1.default,
                    },
                    {
                        model: Opinion_1.default,
                    }
                ],
            });
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.model.findByPk(id, {
                include: [
                    {
                        model: Ingredient_1.default,
                        include: [
                            {
                                model: Unit_1.default,
                            },
                        ],
                    },
                    {
                        model: Step_1.default,
                    },
                    {
                        model: Category_1.default,
                    },
                    {
                        model: Opinion_1.default,
                        include: [
                            {
                                model: User_1.default
                            }
                        ]
                    }
                ],
            });
        });
    }
}
exports.RecipeRepository = RecipeRepository;
//# sourceMappingURL=RecipeRepository.js.map