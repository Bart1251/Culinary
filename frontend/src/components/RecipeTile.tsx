import { ChefHat } from "lucide-react";
import { Link } from "react-router-dom";

interface props {
    recipe: Recipe;
}

export const RecipeTile: React.FC<props> = ({recipe}) => {
    return (
        <div className="col-12 col-sm-6 col-xl-3">
            <Link to={"/recipe/" + recipe.id} className="card text-decoration-none">
                <div className="card-img-top ratio ratio-1x1 overflow-hidden">
                    <img src={"http:\\\\localhost:3000\\" + recipe.imagePath} className="border-bottom"/>
                </div>
                <div className="card-body">
                    <p className="card-text fs-5 fw-medium">{recipe.name}</p>
                    <div className="d-flex flex-row justify-content-between">
                        <div>
                            <label>Trudność</label>
                            <div>
                                {[...Array(recipe.difficulty)].map(i => <ChefHat fill="#9adb76"/>)}
                                {[...Array(3 - recipe.difficulty)].map(i => <ChefHat/>)}
                            </div>
                        </div>
                        <div>
                            <label>Kategoria</label>
                            <p className="fw-light m-0">{recipe.category.name}</p>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    )
}
