import { useQuery } from "react-query"
import { RecipeTile } from "../../components/RecipeTile";
import { getFavouriteRecipes } from "../../apiServices/RecipeService";


export const Favourites = () => {

    const { data: recipes, refetch } = useQuery(
        "getUserRecipes",
        async () => await getFavouriteRecipes(localStorage.getItem("fav") ? localStorage.getItem("fav")!.split(";") : [-1])
    )

    return (
        <div className="d-flex flex-wrap">
            {recipes && recipes[0] && recipes.map(r => <RecipeTile recipe={r} key={r.id} refetch={refetch}/>)}
        </div>
    )
}
