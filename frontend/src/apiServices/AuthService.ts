import apiClient from "../apiClient";

export const checkAuthStatus = async () => {
    const response = await apiClient.get("user/auth-status");
    return response.data;
};

export const register = async (data: UserRegisterData) => {
    console.log(data);
    
    await apiClient.post("user/register", data);
}

export const login = async (data: UserLoginData) => {
    await apiClient.post("user/login", data);
};

export const logout = async () => {
    await apiClient.post("user/logout");
};

