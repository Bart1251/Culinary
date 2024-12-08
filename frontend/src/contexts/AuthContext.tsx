import React, { createContext, useContext, ReactNode, useState } from "react";
import { checkAuthStatus, login, register, logout } from "../apiServices/AuthService";
import { useMutation, useQuery } from "react-query";
import { Navigate, useNavigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: React.ReactElement;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return children;
};

interface AuthContextProps {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    registerUser: (data: UserRegisterData) => Promise<void>;
    loginUser: (data: UserLoginData) => Promise<void>;
    logoutUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const navigate = useNavigate();
    const [user, setUser] = useState<User | null>(null);

    const { isLoading, refetch } = useQuery(
        "checkAuthStatus",
        async () => await checkAuthStatus(),
        {
            retry: false,
            staleTime: 0,
            cacheTime: 0,
            onSuccess: (data: User) => {
                setUser(data);
            },
            onError: () => {
                setUser(null)
            }
        }
    );

    const { mutateAsync: registerUser } = useMutation(
        "register",
        async (data: UserRegisterData) => await register(data),
        {
            onSuccess: () => {
                navigate("");
                refetch();
            }
        }
    );

    const { mutateAsync: loginUser } = useMutation(
        "login",
        async (data: UserLoginData) => await login(data),
        {
            onSuccess: () => {
                navigate("");
                refetch();
            }
        }
    );

    const { mutateAsync: logoutUser } = useMutation(
        "logout",
        async () => await logout(),
        {
            onSuccess: () => {
                navigate("");
                refetch();
            }
        }
    );

    return (
        <AuthContext.Provider
            value={
                {
                    user,
                    isAuthenticated: !!user,
                    isLoading,
                    registerUser,
                    loginUser,
                    logoutUser,
                }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextProps => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};