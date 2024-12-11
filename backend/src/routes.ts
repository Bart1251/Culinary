import { Router } from "express";
import { authenticateToken } from "./jwt";
import { checkAuthStatus, login, logout, register } from "./controllers/UserController";
import { getUnits } from "./controllers/UnitController";
import { getCategories } from "./controllers/CategoryController";
import { createRecipe, deleteRecipe, getRecipe, getUserRecipes, updateRecipe } from "./controllers/RecipeController";
import multer from "multer";

const router = Router()

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        const uniqueName = `${Date.now()}-${file.originalname}`;
        cb(null, uniqueName);
    },
});
const upload = multer({ storage: storage });

//User routes
router.get("/user/auth-status", authenticateToken, checkAuthStatus);
router.post("/user/login", login);
router.post("/user/logout", logout);
router.post("/user/register", register);

//Unit routes
router.get("/unit", getUnits);

//Category routes
router.get("/category", getCategories);

//Recipe routes
router.post("/recipe", upload.single("image"), createRecipe);
router.get("/recipe/user/:userId", getUserRecipes);
router.delete("/recipe/:recipeId", deleteRecipe);
router.get("/recipe/:recipeId", getRecipe);
router.patch("/recipe", upload.single("image"), updateRecipe);


export default router;