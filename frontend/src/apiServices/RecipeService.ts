import apiClient from "../apiClient";

export const createRecipe = async (data: RecipeAddData, image: File) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("prepareTime", String(data.prepareTime));
    formData.append("categoryId", String(data.categoryId));
    formData.append("difficulty", String(data.difficulty));
    formData.append("userId", String(data.userId));
    formData.append("ingredients", JSON.stringify(data.ingredients));
    formData.append("steps", JSON.stringify(data.steps));
    formData.append("image", image);

    await apiClient.post("recipe", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
}

export const updateRecipe = async (data: RecipeEditData, ingredientsToDelete: number[], stepsToDelete: number[], image: File | null) => {
    const formData = new FormData();
    formData.append("id", String(data.id));
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("prepareTime", String(data.prepareTime));
    formData.append("categoryId", String(data.categoryId));
    formData.append("difficulty", String(data.difficulty));
    formData.append("userId", String(data.userId));
    formData.append("newIngredients", JSON.stringify(data.newIngredients));
    formData.append("newSteps", JSON.stringify(data.newSteps));
    formData.append("ingredientsToDelete", JSON.stringify(ingredientsToDelete));
    formData.append("stepsToDelete", JSON.stringify(stepsToDelete));
    formData.append("image", image??"");

    await apiClient.patch("recipe", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
}

export const getUserRecipes = async (userId: number) => {
    const response = await apiClient.get<Recipe[]>("recipe/user/" + userId);
    return response.data;
}

export const deleteRecipe = async (recipeId: number) => {
    const response = await apiClient.delete("recipe/" + recipeId);
    return response.data;
}

export const getRecipe = async (recipeId: number) => {
    const response = await apiClient.get<Recipe>("/recipe/" + recipeId);
    return response.data;
}

export const getNewestRecipes = async () => {
    const response = await apiClient.get<Recipe[]>("recipe/newest");
    return response.data;
}

export const getLastSeenRecipes = async (ids: string[] | number[]) => {
    const response = await apiClient.get<Recipe[]>("recipe/idList", { params: { ids: ids } });
    return response.data;
}

export const getAllRecipes = async () => {
    const response = await apiClient.get<Recipe[]>("recipe");
    return response.data;
}

export const getFavouriteRecipes = async (ids: string[] | number[]) => {
    const response = await apiClient.get<Recipe[]>("recipe/idList", { params: { ids: ids } });
    return response.data;
}