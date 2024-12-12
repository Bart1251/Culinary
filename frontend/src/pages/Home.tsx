import { useQuery } from "react-query"
import { getLastSeenRecipes, getNewestRecipes } from "../apiServices/RecipeService"
import { RecipeTile } from "../components/RecipeTile";

export const Home = () => {

    const { data: newestRecipes, refetch: refetchNewest } = useQuery(
        "getNewestRecipes",
        async () => await getNewestRecipes()
    );

    const { data: lastSeenRecipes, refetch: refetchLastSeen } = useQuery(
        "getLastSeenRecipes",
        async () => await getLastSeenRecipes(localStorage.getItem("last") ? localStorage.getItem("last")!.split(";") : [-1])
    );

    return (
        <div className="d-flex flex-column gap-3 p-3 container recipe-main" style={{minHeight: "calc(100vh - 160px)"}}>
            {newestRecipes && <div>
                <h3 className="fs-2">Sprawdź nowości</h3>
                <div className="d-flex flex-row gap-3 overflow-x-auto border rounded">
                {newestRecipes.map((nr, n) => 
                    <RecipeTile key={n} recipe={nr} refetch={refetchNewest}/>
                )}
                </div>
            </div>}
            {localStorage.getItem("last") && lastSeenRecipes && <div>
                <h3 className="fs-2">Wróć do ostatnio przeglądanych</h3>
                <div className="d-flex flex-row gap-3 overflow-x-auto border rounded">
                {lastSeenRecipes.map((lr, n) => 
                    <RecipeTile key={n} recipe={lr} refetch={refetchLastSeen}/>
                )}
                </div>
            </div>}
        </div>
    )
}
