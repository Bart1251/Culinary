import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";


export const Login = () => {
    const [loginData, setLoginData] = useState<UserLoginData>({ email: "", password: "" })
    const { loginUser } = useAuth();

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;
        setLoginData((prev) => ({
            ...prev,
            [name]: value,
        }));
    }

    function submit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        loginUser(loginData);
    }

    return (
        <form onSubmit={submit}>
            <div>
                <label htmlFor="email">Email</label>
                <input type="email" value={loginData.email} id="email" name="email" onChange={handleChange}/>
            </div>
            <div>
                <label htmlFor="password">Hasło</label>
                <input type="password" value={loginData.password} id="password" name="password" onChange={handleChange}/>
            </div>
            <button type="submit">Zaloguj się</button>
        </form>
    )
}
