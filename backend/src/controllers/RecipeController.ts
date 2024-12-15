import { Request, Response } from 'express';
import { RecipeRepository } from '../repositories/RecipeRepository';
import { sequlize } from '../dbconfig';
import { IngredientRepository } from '../repositories/IngredientRepository';
import { StepRepository } from '../repositories/StepRepository';
import fs from "fs/promises";

const recipeRepository = new RecipeRepository();
const ingredientRepository = new IngredientRepository();
const stepRepository = new StepRepository();

export const createRecipe = async (req: Request, res: Response) => {
    const transaction = await sequlize.transaction();
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

export const deleteRecipe = async (req: Request, res: Response) => {
    try {
        const recipeId = req.params.recipeId as string;

        const recipe = await recipeRepository.findById(recipeId);
    
        if (recipe) {
            if (recipe.imagePath) {
                await fs.unlink(recipe.imagePath);
            }

            await recipe.destroy();
            res.status(200).json({ message: "Recipe deleted successfully" });
        } else {
            res.status(404).json({ message: "Recipe not found" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const getRecipe = async (req: Request, res: Response) => {
    try {
        const recipeId = req.params.recipeId;
        res.json(await recipeRepository.findById(recipeId));
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const updateRecipe = async (req: Request, res: Response) => {
    const transaction = await sequlize.transaction();
    try {
        const { id, name, description, difficulty, prepareTime, categoryId, newIngredients, newSteps, ingredientsToDelete, stepsToDelete } = req.body;

        const recipe = await recipeRepository.findById(id);

        recipe.name = name;
        recipe.description = description;
        recipe.difficulty = difficulty;
        recipe.prepareTime = prepareTime;
        recipe.categoryId = categoryId;

        if (req.file?.path) {
            if (recipe.imagePath) {
                await fs.unlink(recipe.imagePath);
            }
            recipe.imagePath = req.file.path;
        }

        await recipe.save({ transaction });

        if (ingredientsToDelete) {
            const ingredientIdsToDelete = JSON.parse(ingredientsToDelete);
            for (const i of ingredientIdsToDelete) {
                await ingredientRepository.delete(i, transaction);
            }
        }

        if (stepsToDelete) {
            const stepIdsToDelete = JSON.parse(stepsToDelete);
            for (const s of stepIdsToDelete) {
                await stepRepository.delete(s, transaction);
            }
        }

        if (newIngredients) {
            const newIngredientsData = JSON.parse(newIngredients);
            for (const ingredient of newIngredientsData) {
                await ingredientRepository.create(
                    { ...ingredient, recipeId: id },
                    { transaction }
                );
            }
        }

        if (newSteps) {
            const newStepsData = JSON.parse(newSteps);
            for (const step of newStepsData) {
                await stepRepository.create(
                    { content: step.content, recipeId: id },
                    { transaction }
                );
            }
        }

        await transaction.commit();
        res.status(200).json({ message: "Recipe updated successfully" });
    } catch (error) {
        await transaction.rollback();
        console.error("Error updating recipe:", error);
        res.status(500).json({ error: error.message });
    }
};

export const getNewestRecipes = async (req: Request, res: Response) => {
    try {
        res.json(await recipeRepository.findNewest())
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const getRecipesWithIds = async (req: Request, res: Response) => {
    try {
        const ids = req.query.ids as string[];
        res.json(await Promise.all(ids.map(async id => await recipeRepository.findById(id))));
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const getAllRecipes = async (req: Request, res: Response) => {
    try {
        res.json(await recipeRepository.findAll());
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const getInspirations = async (req: Request, res: Response) => {
    try {
        const ingredients = req.query.ingredients as string[];
        res.json(await recipeRepository.findInspirations(ingredients));
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}