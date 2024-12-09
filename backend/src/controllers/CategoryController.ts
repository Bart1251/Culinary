import { CategoryRepository } from "../repositories/CategoryRepository";
import { Request, Response } from 'express';

const categoryRepository = new CategoryRepository();

export const getCategories = async (req: Request, res: Response) => {
    try {
        res.json(await categoryRepository.findAll());
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}