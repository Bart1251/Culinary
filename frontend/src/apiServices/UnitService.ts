import apiClient from "../apiClient";

export const getUnits = async () => {
    const response = await apiClient.get<Unit[]>("unit");
    return response.data;
};