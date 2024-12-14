import { useQuery } from "react-query"
import { getAllRecipes, getLastSeenRecipes, getNewestRecipes } from "../apiServices/RecipeService"
import { RecipeTile } from "../components/RecipeTile";
import { getCategories } from "../apiServices/categoryApiService";
import { useState } from "react";
import { Search } from "lucide-react";

export const Home = () => {
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [selectedDifficulties, setSelectedDifficulties] = useState<string[]>(["1", "2", "3"]);
    const [maxPrepareTime, setMaxPrepareTime] = useState<string>("0");
    const [filteredRecipes, setFilteredRecipies] = useState<Recipe[]>([]);
    const [nameFilter, setNameFilter] = useState<string>("");

    function filterRecipies() {
        setFilteredRecipies(
            recipes ? 
            recipes.filter(r => selectedCategories.includes(r.category.id.toString()) && 
                selectedDifficulties.includes(r.difficulty.toString()) &&
                Number(maxPrepareTime) >= r.prepareTime && 
                (r.name.toLowerCase().includes(nameFilter.toLowerCase()) || nameFilter.length == 0)) : []);
    }

    const { data: newestRecipes, refetch: refetchNewest } = useQuery(
        "getNewestRecipes",
        async () => await getNewestRecipes()
    );

    const { data: lastSeenRecipes, refetch: refetchLastSeen } = useQuery(
        "getLastSeenRecipes",
        async () => await getLastSeenRecipes(localStorage.getItem("last") ? localStorage.getItem("last")!.split(";") : [-1])
    );

    const { data: categories } = useQuery(
        "getCategories",
        async () => getCategories(),
        {
            onSuccess: (res) => {
                setSelectedCategories(res ? res.map(c => c.id.toString()) : [])
                filterRecipies();
            }
        }
    );

    function categoryChange(e: React.ChangeEvent<HTMLInputElement>) {
        if(e.target.checked) {
            setSelectedCategories([...selectedCategories, e.target.value]);
        } else {
            setSelectedCategories(selectedCategories.filter(sc => sc != e.target.value));
        }
    }

    function difficultyChange(e: React.ChangeEvent<HTMLInputElement>) {
        if(e.target.checked) {
            setSelectedDifficulties([...selectedDifficulties, e.target.value]);
        } else {
            setSelectedDifficulties(selectedDifficulties.filter(sd => sd != e.target.value));
        }
    }

    const { data: recipes, refetch: refetch } = useQuery(
        "getRecipes",
        async () => await getAllRecipes(),
        {
            onSuccess: (res) => {
                setMaxPrepareTime(res ? res?.sort((a, b) => b.prepareTime - a.prepareTime)[0].prepareTime.toString() : "0")
                filterRecipies();
            }
        }
    );

    return (
        <div className="d-flex flex-column gap-3 p-3 container recipe-main" style={{minHeight: "calc(100vh - 160px)"}}>
            <form className="d-flex flex-column gap-3" onSubmit={(e) => {e.preventDefault(); filterRecipies()}}>
                <h3 className="fs-2">Wyszukaj przepisy</h3>
                <div className="row">
                    <div className="dropdown col-4 d-flex">
                        <button className="btn btn-outline-secondary dropdown-toggle w-100 align-self-center" type="button" data-bs-toggle="dropdown" aria-expanded="false">Kategoria</button>
                        <ul className="dropdown-menu">
                            {categories && categories.map((c, n) => 
                                <li key={n}>
                                    <input type="checkbox" id={"category_" + n} className="m-2" value={c.id} checked={selectedCategories.includes(c.id.toString())} onChange={categoryChange}/>
                                    <label onClick={(e) => e.stopPropagation()} htmlFor={"category_" + n} className="fs-5">{c.name}</label>
                                </li>
                            )}
                        </ul>
                    </div>
                    <div className="dropdown col-4 d-flex">
                        <button className="btn btn-outline-secondary dropdown-toggle w-100 align-self-center" type="button" data-bs-toggle="dropdown" aria-expanded="false">Trudność</button>
                        <ul className="dropdown-menu">
                            <li>
                                <input type="checkbox" id="difficulty_1" className="m-2" value={1} checked={selectedDifficulties.includes("1")} onChange={difficultyChange}/>
                                <label onClick={(e) => e.stopPropagation()} htmlFor="difficulty_1" className="fs-5">Łatwy</label>
                            </li>
                            <li>
                                <input type="checkbox" id="difficulty_2" className="m-2" value={2} checked={selectedDifficulties.includes("2")} onChange={difficultyChange}/>
                                <label onClick={(e) => e.stopPropagation()} htmlFor="difficulty_2" className="fs-5">Średni</label>
                            </li>
                            <li>
                                <input type="checkbox" id="difficulty_3" className="m-2" value={3} checked={selectedDifficulties.includes("3")} onChange={difficultyChange}/>
                                <label onClick={(e) => e.stopPropagation()} htmlFor="difficulty_3" className="fs-5">Trudny</label>
                            </li>
                        </ul>
                    </div>
                    <div className="col-4">
                        <label htmlFor="maxTime">Maksymalny czas przygotowania</label>
                        <div className="d-flex flex-row align-items-center gap-3">
                            <input type="range" id="maxTime" className="form-range w-75" value={maxPrepareTime} onChange={(e) => setMaxPrepareTime(e.target.value)} step={1} min={1} max={recipes ? recipes?.sort((a, b) => b.prepareTime - a.prepareTime)[0].prepareTime : 0}/>
                            <label className="w-25 text-center">{maxPrepareTime} min</label>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-9">
                        <input type="text" className="form-control h-100" value={nameFilter} onChange={(e) => setNameFilter(e.target.value)} placeholder="Nazwa przepisu"/>
                    </div>
                    <div className="col-3">
                        <button type="submit" className="btn btn-success fs-4 pt-0 w-100">Szukaj <Search /></button>
                    </div>
                </div>
                {filteredRecipes.length > 0 && <div className="d-flex flex-row gap-3 overflow-x-auto border rounded">
                    {filteredRecipes.map((r, n) => 
                        <RecipeTile key={n} recipe={r} refetch={refetch}/>
                    )}
                </div>}
                {filterRecipies.length == 0 && 
                <div className="d-flex align-items-center justify-content-center border rounded" style={{height: "100px"}}>
                    <p>Brak wyników</p>
                </div>
                }
            </form>
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
