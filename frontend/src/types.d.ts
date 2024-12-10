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
    userId: number;
    categoryId: number;
    ingredients: IngredientFormData[];
    steps: string[];
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
}

interface Recipe {
    id: number;
    name: string;
    description: string;
    difficulty: number;
    prepareTime: number;
    category: Category;
    user: User;
    ingredients: Ingredient[];
    steps: Step[];
    opinions: Opinion[];
    imagePath: string;
}