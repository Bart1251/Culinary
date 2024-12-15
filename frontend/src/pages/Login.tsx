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
        <form onSubmit={submit} className="d-flex justify-content-center align-items-center w-100" style={{height: "calc(100vh - 160px)"}}>
            <div className="col-12 col-sm-9 col-md-6 col-xl-4 d-flex flex-column gap-3 align-items-center border bg-body-secondary p-3">
                <h3>Zaloguj się</h3>
                <div className="w-100">
                    <label htmlFor="email" className="ms-1">Email</label>
                    <input type="email" className="form-control" value={loginData.email} id="email" name="email" onChange={handleChange}/>
                </div>
                <div className="w-100">
                    <label htmlFor="password" className="ms-1">Hasło</label>
                    <input type="password" className="form-control" value={loginData.password} id="password" name="password" onChange={handleChange}/>
                </div>
                <button type="submit" className="btn btn-success w-75">Zaloguj się</button>
            </div>
        </form>
    )
}
