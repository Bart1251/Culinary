import { Request, Response } from 'express';
import { RecipeRepository } from '../repositories/RecipeRepository';
import { sequlize } from '../dbconfig';
import { IngredientRepository } from '../repositories/IngredientRepository';
import { StepRepository } from '../repositories/StepRepository';

const recipeRepository = new RecipeRepository();
const ingredientRepository = new IngredientRepository();
const stepRepository = new StepRepository();

export const createRecipe = async (req: Request, res: Response) => {
    const transaction = await sequlize.transaction();
    console.log(req.body);
    
    try {
        const { name, description, difficulty, prepareTime, categoryId, userId } = req.body;

        const ingredients = JSON.parse(req.body.ingredients || "[]");
        const steps = JSON.parse(req.body.steps || "[]");

        const newRecipe = await recipeRepository.create({
            name: name,
            description: description,
            difficulty: difficulty,
            prepareTime: prepareTime,
            categoryId: categoryId,
            userId: userId,
            imagePath: req.file.path,
        }, { transaction: transaction });

        for (const i of ingredients) {
            await ingredientRepository.create(
                { ...i, recipeId: newRecipe.id },
                { transaction: transaction }
            );
        }

        for (const s of steps) {
            await stepRepository.create(
                { content: s, recipeId: newRecipe.id },
                { transaction: transaction }
            );
        }

        await transaction.commit();
        res.status(201).json({ message: "Recipe created successfully" });
    } catch (error) {
        await transaction.rollback();
        res.status(500).json({ error: error.message });
    }
}

export const getUserRecipes = async (req: Request, res: Response) => {
    try {
        const userId = req.params.userId as string;
        res.json(await recipeRepository.findByUser(userId))
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}