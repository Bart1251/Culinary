import { useQuery } from "react-query"
import { getUserRecipes } from "../../apiServices/RecipeService"
import { useAuth } from "../../contexts/AuthContext"
import { RecipeTile } from "../../components/RecipeTile";


export const MyRecipes = () => {
    const { user } = useAuth();

    const { data: recipes } = useQuery(
        "getUserRecipes",
        async () => await getUserRecipes(user!.id)
    )

    return (
        <div className="row">
            {recipes && recipes.map(r => <RecipeTile recipe={r} key={r.id}/>)}
        </div>
    )
}
