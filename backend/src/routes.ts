import { Router } from "express";
import { authenticateToken } from "./jwt";
import { checkAuthStatus, login, logout, register } from "./controllers/UserController";

const router = Router()

//User routes
router.get("/user/auth-status", authenticateToken, checkAuthStatus);
router.post("/user/login", login);
router.post("/user/logout", logout);
router.post("/user/register", register);


export default router;