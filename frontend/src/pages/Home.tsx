import { Link } from "react-router"
import { useAuth } from "../contexts/AuthContext"


export const Home = () => {

    const { isAuthenticated, logoutUser } = useAuth();

    return (
        <div>
            {isAuthenticated && <><p><Link to="profile">Profil</Link></p>
            <button type="button" onClick={logoutUser}>Wyloguj się</button></>}
            {!isAuthenticated && <><p><Link to="login">Logowanie</Link></p>
            <p><Link to="register">Rejestracja</Link></p></>}
        </div>
    )
}
