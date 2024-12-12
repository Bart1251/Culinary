import apiClient from "../apiClient";

export const createOpinion = async (data: string, userId: number, recipeId: number) => {
    const response = await apiClient.post("opinion", {data, userId, recipeId});
    return response.data;
}