import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

export const generateToken = (userId: number): string => {
    const secretKey = process.env.JWT_SECRET || "your-secret-key";
    return jwt.sign({ id: userId }, secretKey, { expiresIn: "1h" });
};

export const authenticateToken = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.access_token;
    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET || "your-secret-key") as JwtPayload;
            req.user = decoded.id;
            next();
        } catch (error) {
            res.status(403).json({ message: "Forbidden" });
        }
    } else {
        res.status(401).json({ message: "Unauthorized" });
    }

};