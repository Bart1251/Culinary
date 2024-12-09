import { Link } from "react-router-dom"
import logo from "../assets/logo.png"
import { useAuth } from "../contexts/AuthContext";


export const Navbar = () => {
    const { isAuthenticated } = useAuth();

    return (
        <nav className="navbar bg-dark-subtle main-navbar">
            <div className="container-fluid h-100 d-flex flex-row">
                <Link className="d-flex flex-row gap-3 align-items-center text-decoration-none text-dark h-100" to="/">
                    <img src={logo} alt="Logo" width="60" height="70" className="d-inline-block" />
                    <h2 className="m-0">Culinary</h2>
                </Link>
                <div className="d-flex flex-row align-items-center gap-3">
                    {isAuthenticated && 
                    <>
                        <Link to="profile" className="btn btn-outline-dark">Profil</Link>
                    </>}
                    {!isAuthenticated && 
                    <>
                        <Link to="login" className="btn btn-outline-dark">Logowanie</Link>
                        <Link to="register" className="btn btn-outline-dark">Rejestracja</Link>
                    </>}
                </div>
            </div>
        </nav>
    )
}
