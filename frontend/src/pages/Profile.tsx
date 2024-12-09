import { Link, Route, Routes } from "react-router"
import { MyRecipes } from "./Profile/MyRecipes"
import { AddRecipe } from "./Profile/AddRecipe"
import defaultUser from "../assets/user.png";
import { CirclePlus, LogOut, ScrollText, Settings } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

export const Profile = () => {
    const { logoutUser, user } = useAuth();

    return (
        <div className="h-100 d-flex flex-row">
            <div className="col-3 bg-body-secondary profile-sidebar">
                <div className="d-flex flex-column align-items-center gap-3 p-3">
                    <h3>Mój profil</h3>
                    <img className="w-75 rounded-circle" src={defaultUser} />
                    <h5>{user?.username}</h5>

                    <hr className="w-100"/>

                    <div className="w-100 d-flex flex-column gap-3">
                        <Link to="/profile" className="fs-5 d-flex gap-2 btn">
                            <span><ScrollText /></span>
                            Moje przepisy
                        </Link>
                        <Link to="/profile/addRecipe" className="fs-5 d-flex gap-2 btn">
                            <span><CirclePlus /></span>
                            Dodaj przepis
                        </Link>
                        <Link to="/profile/settings" className="fs-5 d-flex gap-2 btn">
                            <span><Settings /></span>
                            Ustawienia
                        </Link>
                        <div onClick={logoutUser} className="fs-5 d-flex gap-2 btn">
                            <span><LogOut /></span>
                            Wyloguj
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-9 p-3">
                <Routes>
                    <Route index element={<MyRecipes />} />
                    <Route path="addRecipe" element={<AddRecipe />} />
                    <Route path="myRecipes" element={<AddRecipe />} />
                </Routes>
            </div>
        </div>
    )
}
