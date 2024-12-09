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

interface RecipeFormData {
    name: string;
    description: string;
    difficulty: number;
    prepareTime: number;
    userId?: number;
    categoryId: number;
    ingredients: IngredientFormData[];
    steps: string[];
}

interface Category {
    id: number;
    name: string;
}