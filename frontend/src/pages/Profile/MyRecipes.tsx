import { useQuery } from "react-query"
import { getUserRecipes } from "../../apiServices/RecipeService"
import { useAuth } from "../../contexts/AuthContext"
import { RecipeTile } from "../../components/RecipeTile";


export const MyRecipes = () => {
    const { user } = useAuth();

    const { data: recipes, refetch } = useQuery(
        "getUserRecipes",
        async () => await getUserRecipes(user!.id)
    )

    return (
        <div className="d-flex flex-wrap">
            {recipes && recipes.map(r => <RecipeTile recipe={r} key={r.id} refetch={refetch}/>)}
        </div>
    )
}
