interface User {
    id: number;
    email: string;
    username: string;
}

interface UserLoginData {
    email: string;
    password: string;
}

interface UserRegisterData {
    username: string;
    email: string;
    password: string;
}

interface Unit {
    id: number;
    name: string;
}

interface IngredientFormData {
    name: string;
    amount: number;
    unitId: number;
}

interface RecipeAddData {
    name: string;
    description: string;
    difficulty: number;
    prepareTime: number;
    userId: number;
    categoryId: number;
    ingredients: IngredientFormData[];
    steps: string[];
}

interface RecipeEditData {
    id: number;
    name: string;
    description: string;
    difficulty: number;
    prepareTime: number;
    userId: number;
    categoryId: number; 
    ingredients: Ingredient[];
    steps: Step[];
    newIngredients: IngredientFormData[];
    newSteps: string[];
}

interface Category {
    id: number;
    name: string;
}

interface Ingredient {
    id: number;
    name: string;
    amount: number;
    unit: Unit;
}

interface Step {
    id: number;
    content: string;
}

interface Opinion {
    id: number;
    content: string;
    user: User;
    createdAt: string;
}

interface Recipe {
    id: number;
    name: string;
    description: string;
    difficulty: number;
    prepareTime: number;
    category: Category;
    userId: number;
    ingredients: Ingredient[];
    steps: Step[];
    opinions: Opinion[];
    imagePath: string;
}