import apiClient from "../apiClient";

export const createRecipe = async (data: RecipeFormData, image: File) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("prepareTime", String(data.prepareTime));
    formData.append("categoryId", String(data.categoryId));
    formData.append("difficulty", String(data.difficulty));
    formData.append("userId", String(data.userId));
    formData.append("ingredients", JSON.stringify(data.ingredients))
    formData.append("steps", JSON.stringify(data.steps))
    formData.append("image", image);

    await apiClient.post("recipe", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
}

export const getUserRecipes = async (userId: number) => {
    const response = await apiClient.get<Recipe[]>("recipe/user/" + userId);
    return response.data;
}