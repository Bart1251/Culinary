import { OpinionRepository } from "../repositories/OpinionRepository"
import { Request, Response } from 'express';

const opinionRepository = new OpinionRepository();

export const createOpinion = async (req: Request, res: Response) => {
    try {
        const { data: content, userId, recipeId } = req.body;

        await opinionRepository.create({ content: content, userId: userId, recipeId: recipeId});

        res.status(200).json({ message: "Opinion created successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}