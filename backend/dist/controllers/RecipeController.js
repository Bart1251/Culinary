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
exports.getInspirations = exports.getAllRecipes = exports.getRecipesWithIds = exports.getNewestRecipes = exports.updateRecipe = exports.getRecipe = exports.deleteRecipe = exports.getUserRecipes = exports.createRecipe = void 0;
const RecipeRepository_1 = require("../repositories/RecipeRepository");
const dbconfig_1 = require("../dbconfig");
const IngredientRepository_1 = require("../repositories/IngredientRepository");
const StepRepository_1 = require("../repositories/StepRepository");
const promises_1 = __importDefault(require("fs/promises"));
const recipeRepository = new RecipeRepository_1.RecipeRepository();
const ingredientRepository = new IngredientRepository_1.IngredientRepository();
const stepRepository = new StepRepository_1.StepRepository();
const createRecipe = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const transaction = yield dbconfig_1.sequlize.transaction();
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
const deleteRecipe = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const recipeId = req.params.recipeId;
        const recipe = yield recipeRepository.findById(recipeId);
        if (recipe) {
            if (recipe.imagePath) {
                yield promises_1.default.unlink(recipe.imagePath);
            }
            yield recipe.destroy();
            res.status(200).json({ message: "Recipe deleted successfully" });
        }
        else {
            res.status(404).json({ message: "Recipe not found" });
        }
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.deleteRecipe = deleteRecipe;
const getRecipe = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const recipeId = req.params.recipeId;
        res.json(yield recipeRepository.findById(recipeId));
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.getRecipe = getRecipe;
const updateRecipe = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const transaction = yield dbconfig_1.sequlize.transaction();
    try {
        const { id, name, description, difficulty, prepareTime, categoryId, newIngredients, newSteps, ingredientsToDelete, stepsToDelete } = req.body;
        const recipe = yield recipeRepository.findById(id);
        recipe.name = name;
        recipe.description = description;
        recipe.difficulty = difficulty;
        recipe.prepareTime = prepareTime;
        recipe.categoryId = categoryId;
        if ((_a = req.file) === null || _a === void 0 ? void 0 : _a.path) {
            if (recipe.imagePath) {
                yield promises_1.default.unlink(recipe.imagePath);
            }
            recipe.imagePath = req.file.path;
        }
        yield recipe.save({ transaction });
        if (ingredientsToDelete) {
            const ingredientIdsToDelete = JSON.parse(ingredientsToDelete);
            for (const i of ingredientIdsToDelete) {
                yield ingredientRepository.delete(i, transaction);
            }
        }
        if (stepsToDelete) {
            const stepIdsToDelete = JSON.parse(stepsToDelete);
            for (const s of stepIdsToDelete) {
                yield stepRepository.delete(s, transaction);
            }
        }
        if (newIngredients) {
            const newIngredientsData = JSON.parse(newIngredients);
            for (const ingredient of newIngredientsData) {
                yield ingredientRepository.create(Object.assign(Object.assign({}, ingredient), { recipeId: id }), { transaction });
            }
        }
        if (newSteps) {
            const newStepsData = JSON.parse(newSteps);
            for (const step of newStepsData) {
                yield stepRepository.create({ content: step.content, recipeId: id }, { transaction });
            }
        }
        yield transaction.commit();
        res.status(200).json({ message: "Recipe updated successfully" });
    }
    catch (error) {
        yield transaction.rollback();
        console.error("Error updating recipe:", error);
        res.status(500).json({ error: error.message });
    }
});
exports.updateRecipe = updateRecipe;
const getNewestRecipes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.json(yield recipeRepository.findNewest());
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.getNewestRecipes = getNewestRecipes;
const getRecipesWithIds = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ids = req.query.ids;
        res.json(yield Promise.all(ids.map((id) => __awaiter(void 0, void 0, void 0, function* () { return yield recipeRepository.findById(id); }))));
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.getRecipesWithIds = getRecipesWithIds;
const getAllRecipes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.json(yield recipeRepository.findAll());
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.getAllRecipes = getAllRecipes;
const getInspirations = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ingredients = req.query.ingredients;
        res.json(yield recipeRepository.findInspirations(ingredients));
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.getInspirations = getInspirations;
//# sourceMappingURL=RecipeController.js.map