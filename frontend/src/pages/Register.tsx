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
        <form onSubmit={submit} className="d-flex justify-content-center align-items-center w-100" style={{height: "calc(100vh - 160px)"}}>
            <div className="col-12 col-sm-9 col-md-6 col-xl-4 d-flex flex-column gap-3 align-items-center border bg-body-secondary p-3">
                <h3>Zarejestruj się</h3>
                <div className="w-100">
                    <label htmlFor="username">Nazwa użytkownika</label>
                    <input type="text" className="form-control" value={registerData.username} id="username" name="username" onChange={handleChange} />
                </div>
                <div className="w-100">
                    <label htmlFor="email">Email</label>
                    <input type="email" className="form-control" value={registerData.email} id="email" name="email" onChange={handleChange} />
                </div>
                <div className="w-100">
                    <label htmlFor="password">Hasło</label>
                    <input type="password" className="form-control" value={registerData.password} id="password" name="password" onChange={handleChange} />
                </div>
                <button type="submit" className="btn btn-success w-75">Zarejestruj się</button>
            </div>
        </form>
    )
}
