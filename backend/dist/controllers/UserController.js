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
exports.register = exports.logout = exports.checkAuthStatus = exports.login = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jwt_1 = require("../jwt");
const UserRepository_1 = require("../repositories/UserRepository");
const userRepository = new UserRepository_1.UserRepository();
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const user = yield userRepository.findByEmail(email);
        if (user) {
            const isValidPassword = yield bcrypt_1.default.compare(password, user.password);
            if (isValidPassword) {
                const token = (0, jwt_1.generateToken)(user.id);
                res.cookie("access_token", token, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === "production",
                    sameSite: "strict",
                    maxAge: 60 * 60 * 1000,
                });
                res.status(200).json({ message: "Logged in successfully" });
            }
            else {
                res.status(401).json({ message: "Invalid credentials" });
            }
        }
        else {
            res.status(404).json({ message: "User not found" });
        }
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.login = login;
const checkAuthStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield userRepository.findById(Number(req.user));
        if (!user) {
            res.status(404).json({ message: "User not found" });
        }
        res.json(user);
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
});
exports.checkAuthStatus = checkAuthStatus;
const logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.clearCookie("access_token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
    });
    res.status(200).json({ message: "Logged out successfully" });
});
exports.logout = logout;
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password, username } = req.body;
        if (!(yield userRepository.findByEmail(email))) {
            const created = userRepository.create({ email: email, username: username, password: yield bcrypt_1.default.hash(password, 10) });
            const token = (0, jwt_1.generateToken)((yield created).id);
            res.cookie("access_token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
                maxAge: 60 * 60 * 1000,
            });
            res.status(201).json({ message: "User registered successfully" });
        }
        else {
            res.status(400).json({ message: "User with this email already exists" });
        }
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
});
exports.register = register;
//# sourceMappingURL=UserController.js.map