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