import { useQuery } from "react-query";
import { useParams } from "react-router"
import { getRecipe } from "../apiServices/RecipeService";
import { ChefHat, Clock, MessagesSquare } from "lucide-react";
import user from "../assets/user.png";


export const Recipe = () => {
    const { recipeId } = useParams();

    const { data: recipe, refetch } = useQuery(
        "getRecipe",
        async () => getRecipe(Number(recipeId))
    )

    return (
        <div className="d-flex flex-column gap-3 p-3 container recipe-main">
            <div className="row">
                <div className="col-6 d-flex flex-column p-3 gap-5">
                    <h3 className="fs-2">{recipe?.name}</h3>
                    <div className="d-flex flex-row gap-5">
                        <div className="d-flex flex-column">
                            <h5 className="fs-5 fw-medium">Trudność</h5>
                            {recipe &&
                                <div>
                                {[...Array(recipe!.difficulty)].map((_, index) => (
                                    <ChefHat key={index} fill="#9adb76" />
                                ))}
                                {[...Array(3 - recipe!.difficulty)].map((_, index) => (
                                    <ChefHat key={index + recipe!.difficulty} />
                                ))}
                            </div>}
                        </div>
                        <div className="d-flex flex-column">
                            <h5 className="fs-5 fw-medium">Kategoria</h5>
                            <label className="fs-6">{recipe?.category.name}</label>
                        </div>
                        <div className="d-flex flex-column">
                            <h5 className="fs-5 fw-medium">Czas przygotowania</h5>
                            <label className="fs-6 d-flex align-items-center gap-2"><Clock /><span>{recipe?.prepareTime + " min"}</span></label>
                        </div>
                    </div>
                    <div>
                        <h5 className="fs-5 fw-medium">Opis</h5>
                        <p>{recipe?.description}</p>
                    </div>
                </div>
                <div className="col-6">
                    <div className="ratio ratio-1x1 overflow-hidden rounded-5 border border-dark-subtle">
                        <img src={"http:\\\\localhost:3000\\" + recipe?.imagePath}/>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-6 p-4 pe-5">
                    <h3 className="fs-2">Składniki</h3>
                    <hr/>
                    <ul>
                    {recipe?.ingredients && recipe.ingredients?.map((i, n) =>
                        <li key={n}>
                            <div className="d-flex flex-row align-items-center ingredient-list mb-2">
                                <label className="ingredient">{i.name}</label>
                                <div className="dots flex-grow-1"></div>
                                <label>{i.amount + " " + i.unit.name}</label>
                            </div>
                        </li>
                    )}
                    </ul>
                </div>
                <div className="col-6 p-4 ps-5">
                    <h3 className="fs-2">Przygotowanie krok po kroku</h3>
                    <hr/>
                    <div className="d-flex flex-column gap-3">
                    {recipe?.steps && recipe.steps?.map((s, n) =>
                        <div key={n} className="">
                            <h5 className="fs-4">Krok {n + 1}</h5>
                            <label className="ingredient fs-5">{s.content}</label>
                        </div>
                    )}
                    </div>
                </div>
            </div>
            <div className="col-12">
                <div className="d-flex flex-row gap-3 align-items-center m-3">
                    <MessagesSquare  size={40}/><span className="fs-5">{recipe?.opinions.length}</span><span className="fw-medium fs-4">Opinie o przepisie</span>
                </div>
                <div style={{maxHeight: "300px"}} className="overflow-x-auto border rounded p-3 gap-3 d-flex flex-column">
                    {recipe?.opinions && recipe.opinions.map((o, n) => 
                        <div key={n} className="d-flex flex-row align-items-top gap-4">
                            <img style={{width: "50px", height: "50px"}} src={user} className="rounded-circle overflow-hidden"/>
                            <div className="d-flex flex-column">
                                <label><span className="fw-medium">{o.user.username}</span>, <span>{new Date(o.createdAt).toLocaleDateString()}</span></label>
                                <p className="m-0">{o.content}</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
