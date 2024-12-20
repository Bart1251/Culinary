import { ChefHat, Pencil, Star, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { QueryObserverResult, RefetchOptions, RefetchQueryFilters, UseMutateAsyncFunction, useMutation } from "react-query";
import { deleteRecipe } from "../apiServices/RecipeService";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

interface props {
    recipe: Recipe;
    refetch?: <TPageData>(options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined) => Promise<QueryObserverResult<Recipe[], unknown>>;
    mutate?: UseMutateAsyncFunction<Recipe[], unknown, void, unknown>;
}

export const RecipeTile: React.FC<props> = ({recipe, refetch, mutate}) => {
    const { user } = useAuth();
    const [isFav, setIsFav] = useState<boolean>(false);

    useEffect(() => {
        if(localStorage.getItem("fav") && localStorage.getItem("fav")?.split(";").includes(recipe.id.toString())) {
            setIsFav(true);
        } else {
            setIsFav(false);
        }
    }, [recipe.id])

    const { mutateAsync } = useMutation(
        "deleteRecipe",
        async () => await toast.promise(deleteRecipe(recipe.id), {
            pending: "W trakcie usuwania przepisu",
            error: "Nie udało się usunąć przepisu",
            success: "Przepis usunięty"
        },),
        {
            onSuccess: async () => {
                if(refetch) 
                    await refetch!();
                else 
                    await mutate!();
            }
        }
    );

    function changeFavourite() {
        const fav = localStorage.getItem("fav") ? localStorage.getItem("fav")!.split(";") : [];
        if(fav.includes(recipe.id.toString())) {
            fav.splice(fav.findIndex(e => e == recipe.id.toString()), 1);
            localStorage.setItem("fav", fav.join(";"));
            setIsFav(false);
            toast.warning("Usunięto z ulubionych");
        } else {
            localStorage.setItem("fav", [...fav, recipe.id.toString()].join(";"));
            setIsFav(true);
            toast.success("Dodano do ulubionych");
        }
    }

    return (
        <div className="col-12 col-sm-6 col-xl-3 p-2">
            <Link to={"/recipe/" + recipe.id} className="card text-decoration-none position-relative">
                <div className="card-img-top ratio ratio-1x1 overflow-hidden">
                    <img src={"http:\\\\localhost:3000\\" + recipe.imagePath} className="border-bottom"/>
                </div>
                <div className="card-body">
                    <p className="card-text fs-5 fw-medium">{recipe.name}</p>
                    <div className="d-flex flex-row justify-content-between">
                        <div>
                            <label>Trudność</label>
                            <div>
                                {[...Array(recipe.difficulty)].map((_, index) => (
                                    <ChefHat key={index} fill="#9adb76" />
                                ))}
                                {[...Array(3 - (recipe.difficulty??0))].map((_, index) => (
                                    <ChefHat key={index + recipe.difficulty} />
                                ))}
                            </div>
                        </div>
                        <div>
                            <label>Kategoria</label>
                            <p className="fw-light m-0">{recipe.category?.name}</p>
                        </div>
                    </div>
                </div>
                {user?.id && recipe.userId == user.id && <div className="position-absolute end-0 top-0 d-flex gap-2 p-2">
                    <Link to={"/profile/editRecipe/" + recipe.id} type="button" className="btn btn-outline-success p-2"><Pencil fill="#fff"/></Link>
                    <button type="button" onClick={(e) => {e.preventDefault(); e.stopPropagation(); changeFavourite(); if(refetch) refetch!(); else mutate!()}} className="btn btn-outline-warning p-2"><Star fill={isFav ? "#ffc107" : "#fff"} /></button>
                    <button type="button" onClick={async (e) => {e.preventDefault(); e.stopPropagation(); await mutateAsync();}} className="btn btn-outline-danger p-2"><Trash2 fill="#fff"/></button>
                </div>}
            </Link>
        </div>
    )
}
