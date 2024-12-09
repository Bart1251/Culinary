import { Router } from "express";
import { authenticateToken } from "./jwt";
import { checkAuthStatus, login, logout, register } from "./controllers/UserController";
import { getUnits } from "./controllers/UnitController";
import { getCategories } from "./controllers/CategoryController";

const router = Router()

//User routes
router.get("/user/auth-status", authenticateToken, checkAuthStatus);
router.post("/user/login", login);
router.post("/user/logout", logout);
router.post("/user/register", register);

//Unit routes
router.get("/unit", getUnits);

//Category routes
router.get("/category", getCategories)


export default router;