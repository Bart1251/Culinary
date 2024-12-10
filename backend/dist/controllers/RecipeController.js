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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserRecipes = exports.createRecipe = void 0;
const RecipeRepository_1 = require("../repositories/RecipeRepository");
const dbconfig_1 = require("../dbconfig");
const IngredientRepository_1 = require("../repositories/IngredientRepository");
const StepRepository_1 = require("../repositories/StepRepository");
const recipeRepository = new RecipeRepository_1.RecipeRepository();
const ingredientRepository = new IngredientRepository_1.IngredientRepository();
const stepRepository = new StepRepository_1.StepRepository();
const createRecipe = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const transaction = yield dbconfig_1.sequlize.transaction();
    console.log(req.body);
    try {
        const { name, description, difficulty, prepareTime, categoryId, userId } = req.body;
        const ingredients = JSON.parse(req.body.ingredients || "[]");
        const steps = JSON.parse(req.body.steps || "[]");
        const newRecipe = yield recipeRepository.create({
            name: name,
            description: description,
            difficulty: difficulty,
            prepareTime: prepareTime,
            categoryId: categoryId,
            userId: userId,
            imagePath: req.file.path,
        }, { transaction: transaction });
        for (const i of ingredients) {
            yield ingredientRepository.create(Object.assign(Object.assign({}, i), { recipeId: newRecipe.id }), { transaction: transaction });
        }
        for (const s of steps) {
            yield stepRepository.create({ content: s, recipeId: newRecipe.id }, { transaction: transaction });
        }
        yield transaction.commit();
        res.status(201).json({ message: "Recipe created successfully" });
    }
    catch (error) {
        yield transaction.rollback();
        res.status(500).json({ error: error.message });
    }
});
exports.createRecipe = createRecipe;
const getUserRecipes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.userId;
        res.json(yield recipeRepository.findByUser(userId));
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.getUserRecipes = getUserRecipes;
//# sourceMappingURL=RecipeController.js.map