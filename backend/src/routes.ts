import { Router } from "express";
import { authenticateToken } from "./jwt";
import { checkAuthStatus, login, logout, register } from "./controllers/UserController";
import { getUnits } from "./controllers/UnitController";
import { getCategories } from "./controllers/CategoryController";
import { createRecipe, deleteRecipe, getAllRecipes, getInspirations, getNewestRecipes, getRecipe, getRecipesWithIds, getUserRecipes, updateRecipe } from "./controllers/RecipeController";
import multer from "multer";
import { createOpinion } from "./controllers/OpinionController";

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
router.get("/recipe/inspirations", getInspirations);
router.get("/recipe/newest", getNewestRecipes);
router.get("/recipe/idList", getRecipesWithIds);
router.get("/recipe/:recipeId", getRecipe);
router.get("/recipe", getAllRecipes);
router.patch("/recipe", upload.single("image"), updateRecipe);

//Opinion paths
router.post("/opinion", createOpinion);


export default router;