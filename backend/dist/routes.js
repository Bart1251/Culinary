"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const jwt_1 = require("./jwt");
const UserController_1 = require("./controllers/UserController");
const UnitController_1 = require("./controllers/UnitController");
const CategoryController_1 = require("./controllers/CategoryController");
const RecipeController_1 = require("./controllers/RecipeController");
const multer_1 = __importDefault(require("multer"));
const OpinionController_1 = require("./controllers/OpinionController");
const router = (0, express_1.Router)();
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        const uniqueName = `${Date.now()}-${file.originalname}`;
        cb(null, uniqueName);
    },
});
const upload = (0, multer_1.default)({ storage: storage });
router.get("/user/auth-status", jwt_1.authenticateToken, UserController_1.checkAuthStatus);
router.post("/user/login", UserController_1.login);
router.post("/user/logout", UserController_1.logout);
router.post("/user/register", UserController_1.register);
router.get("/unit", UnitController_1.getUnits);
router.get("/category", CategoryController_1.getCategories);
router.post("/recipe", upload.single("image"), RecipeController_1.createRecipe);
router.get("/recipe/user/:userId", RecipeController_1.getUserRecipes);
router.delete("/recipe/:recipeId", RecipeController_1.deleteRecipe);
router.get("/recipe/newest", RecipeController_1.getNewestRecipes);
router.get("/recipe/lastSeen", RecipeController_1.getLastSeenRecipes);
router.get("/recipe/:recipeId", RecipeController_1.getRecipe);
router.patch("/recipe", upload.single("image"), RecipeController_1.updateRecipe);
router.post("/opinion", OpinionController_1.createOpinion);
exports.default = router;
//# sourceMappingURL=routes.js.map