import { Link, Route, Routes } from "react-router"
import { MyRecipes } from "./Profile/MyRecipes"
import { AddRecipe } from "./Profile/AddRecipe"
import defaultUser from "../assets/user.png";
import { CirclePlus, LogOut, ScrollText, Settings, Star } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { EditRecipe } from "./Profile/EditRecipe";
import { Favourites } from "./Profile/Favourites";

export const Profile = () => {
    const { logoutUser, user } = useAuth();

    return (
        <div className="h-100 d-flex flex-row">
            <div className="col-3 col-xl-2 bg-body-secondary profile-sidebar">
                <div className="d-flex flex-column align-items-center gap-3 p-3">
                    <h3 className="text-center">Mój profil</h3>
                    <img className="col-12 rounded-circle" src={defaultUser} />
                    <h5 className="text-center">{user?.username}</h5>

                    <hr className="w-100"/>

                    <div className="w-100 d-flex flex-column gap-3 align-items-center align-items-md-start">
                        <Link to="/profile" className="fs-5 d-flex gap-2 btn">
                            <span><ScrollText /></span>
                            <span className="d-none d-md-block">Moje przepisy</span>
                        </Link>
                        <Link to="/profile/favourites" className="fs-5 d-flex gap-2 btn">
                            <span><Star /></span>
                            <span className="d-none d-md-block">Ulubione</span>
                        </Link>
                        <Link to="/profile/addRecipe" className="fs-5 d-flex gap-2 btn">
                            <span><CirclePlus /></span>
                            <span className="d-none d-md-block">Dodaj przepis</span>
                        </Link>
                        <Link to="/profile/settings" className="fs-5 d-flex gap-2 btn">
                            <span><Settings /></span>
                            <span className="d-none d-md-block">Ustawienia</span>
                        </Link>
                        <div onClick={logoutUser} className="fs-5 d-flex gap-2 btn">
                            <span><LogOut /></span>
                            <span className="d-none d-md-block">Wyloguj</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-9 col-xl-10 p-3">
                <Routes>
                    <Route index element={<MyRecipes />} />
                    <Route path="favourites" element={<Favourites />} />
                    <Route path="addRecipe" element={<AddRecipe />} />
                    <Route path="editRecipe/:recipeId" element={<EditRecipe />} />
                </Routes>
            </div>
        </div>
    )
}
