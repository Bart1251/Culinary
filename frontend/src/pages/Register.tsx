import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";


export const Register = () => {
    const [registerData, setRegisterData] = useState<UserRegisterData>({ username: "", email: "", password: "" });
    const { registerUser } = useAuth();

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;
        setRegisterData((prev) => ({
            ...prev,
            [name]: value,
        }));
    }

    function submit(e: React.FormEvent){
        e.preventDefault();
        registerUser(registerData);
    }

    return (
        <form onSubmit={submit}>
            <div>
                <label htmlFor="username">Nazwa użytkownika</label>
                <input type="text" value={registerData.username} id="username" name="username" onChange={handleChange} />
            </div>
            <div>
                <label htmlFor="email">Email</label>
                <input type="email" value={registerData.email} id="email" name="email" onChange={handleChange} />
            </div>
            <div>
                <label htmlFor="password">Hasło</label>
                <input type="password" value={registerData.password} id="password" name="password" onChange={handleChange} />
            </div>
            <button type="submit">Zarejestruj się</button>
        </form>
    )
}
