import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import { generateToken } from '../jwt';
import { UserRepository } from '../repositories/UserRepository';

const userRepository = new UserRepository();

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
        const user = await userRepository.findByEmail(email);
        if (user) {
            const isValidPassword = await bcrypt.compare(password, user.password);
            if (isValidPassword) {
                const token = generateToken(user.id);

                res.cookie("access_token", token, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === "production",
                    sameSite: "strict",
                    maxAge: 60 * 60 * 1000,
                });
        
                res.status(200).json({ message: "Logged in successfully" });
            } else {
                res.status(401).json({ message: "Invalid credentials" });
            }
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const checkAuthStatus = async (req: Request, res: Response) => {
    try {
        const user = await userRepository.findById(Number(req.user));
        if (!user) {
            res.status(404).json({ message: "User not found" });
        }

        res.json(user);
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
}

export const logout = async (req: Request, res: Response) => {
    res.clearCookie("access_token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
    });
    res.status(200).json({ message: "Logged out successfully" });
};

export const register = async (req: Request, res: Response) => {
    try {
        const { email, password, username } = req.body;

        if(!await userRepository.findByEmail(email)) {
            const created = userRepository.create({email: email, username: username, password: await bcrypt.hash(password, 10)});

            const token = generateToken((await created).id);
            res.cookie("access_token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
                maxAge: 60 * 60 * 1000,
            });
            
            res.status(201).json({ message: "User registered successfully"});
        } else {
            res.status(400).json({ message: "User with this email already exists" });
        }
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
}