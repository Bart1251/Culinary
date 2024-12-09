import { UnitRepository } from "../repositories/UnitRepository";
import { Request, Response } from 'express';

const unitRepository = new UnitRepository();

export const getUnits = async (req: Request, res: Response) => {
    try {
        res.json(await unitRepository.findAll());
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}