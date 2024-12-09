import { useQuery } from "react-query";
import { getUnits } from "../../apiServices/UnitService";
import { useState } from "react";
import { getCategories } from "../../apiServices/categoryApiService";


export const AddRecipe = () => {
    const [recipe, setRecipe] = useState<RecipeFormData>({
        name: "",
        description: "",
        difficulty: -1,
        prepareTime: 0,
        ingredients: [],
        steps: [],
        categoryId: -1
    });
    const [ingredients, setIngredients] = useState<IngredientFormData[]>([])
    const [ingredient, setIngredient] = useState<IngredientFormData>({
        name: "",
        amount: 0,
        unitId: -1
    });
    const [steps, setSteps] = useState<string[]>([]);
    const [step, setStep] = useState<string>("");

    
    function handleRecipeChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
        const { name, value } = e.target;
        setRecipe((prev) => ({
            ...prev,
            [name]: value,
        }));
    }

    function handleIngredientChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
        const { name, value } = e.target;
        setIngredient((prev) => ({
            ...prev,
            [name.replace("ingredient", "")]: value,
        }));
    }

    function handleStepChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
        setStep(e.target.value);
    }

    const { data: units } = useQuery(
        "getUnits",
        async () => getUnits()
    )

    const { data: categories } = useQuery(
        "getCategories",
        async () => getCategories()
    )

    function addIngredient() {
        if(ingredient.name.length > 0 &&
           ingredient.amount > 0 &&
           ingredient.unitId != -1) {
            setIngredients([...ingredients, ingredient]);
            setIngredient({
                name: "",
                amount: 0,
                unitId: -1
            });
        }
    }

    function addStep() {
        if(step.length > 0) {
            setSteps([...steps, step]);
            setStep("");
        }
    }

    function removeIngredient(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        setIngredients(ingredients.filter(i => ingredients.indexOf(i) != Number((e.target as HTMLButtonElement).id)))
    }

    function removeStep(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        setSteps(steps.filter(i => steps.indexOf(i) != Number((e.target as HTMLButtonElement).id)))
    }

    function submit(e: React.FormEvent) {
        e.preventDefault();
    }

    return (
        <form onSubmit={submit} className="d-flex flex-column gap-3">
            <div className="d-flex flex-column gap-2">
                <div className="row">
                    <div className="col-6">
                        <label htmlFor="name" className="ps-2">Nazwa przepisu</label>
                        <input type="text" name="name" id="name" className="form-control" value={recipe.name} onChange={handleRecipeChange}/>
                    </div>
                    <div className="col-6">
                        <label htmlFor="prepareTime" className="ps-2">Czas przygotowania (min)</label>
                        <input type="number" name="prepareTime" id="prepareTime" className="form-control" value={recipe.prepareTime} onChange={handleRecipeChange}/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-4">
                        <label htmlFor="difficulty" className="ps-2">Trudność</label>
                        <select name="difficulty" id="difficulty" className="form-control" value={recipe.difficulty} onChange={handleRecipeChange}>
                            <option value={-1}>Trudność</option>
                            <option value={1}>Łatwy</option>
                            <option value={2}>Średni</option>
                            <option value={3}>Trudny</option>
                        </select>
                    </div>
                    <div className="col-4">
                        <label htmlFor="categoryId" className="ps-2">Kategoria</label>
                        <select className="form-control" name="categoryId" value={recipe.categoryId} onChange={handleRecipeChange}>
                            <option key={-1} value={-1}>Kategoria</option>
                            {categories && categories?.map(c => 
                                <option key={c.id} value={c.id}>{c.name}</option>
                            )}
                        </select>
                    </div>
                    <div className="col-4 d-flex align-items-end">
                        <label htmlFor="image" className="btn btn-outline-success">Wybierz zdjęcie</label>
                        <input type="file" id="image" className="d-none"/>
                    </div>
                </div>
            </div>
            <div>
                <label htmlFor="description" className="ps-2">Opis</label>
                <textarea rows={5} name="description" id="description" className="form-control" value={recipe.description} onChange={handleRecipeChange}/>
            </div>
            <div>
                <label className="ps-2">Nowy składnik</label>
                <div className="d-flex flex-row gap-2">
                    <div className="input-group">
                        <input type="text" className="form-control w-50" name="ingredientname" placeholder="Nazwa" value={ingredient.name} onChange={handleIngredientChange}/>
                        <input type="number" className="form-control w-25" name="ingredientamount" value={ingredient.amount} onChange={handleIngredientChange}/>
                        <select className="form-control w-25" name="ingredientunitId" value={ingredient.unitId} onChange={handleIngredientChange}>
                            <option key={-1} value={-1}>Jednostka</option>
                            {units && units?.map(u => 
                                <option key={u.id} value={u.id}>{u.name}</option>
                            )}
                        </select>
                    </div>
                    <button type="button" className="btn btn-success" onClick={addIngredient}>Dodaj</button>
                </div>
            </div>
            {ingredients.length > 0 &&
            <div>
                <label className="ps-2">Składniki</label>
                <div style={{maxHeight: "300px"}} className="border rounded pe-3 pt-3 overflow-y-auto col-6">
                    <ul>
                        {ingredients && ingredients?.map((i, n) => 
                            <li key={n}>
                                <div className="d-flex flex-row align-items-center ingredient-list mb-2">
                                    <label>{i.name}</label>
                                    <div className="dots flex-grow-1"></div>
                                    <label>{i.amount + " " + units?.find(u => u.id == i.unitId)?.name}</label>
                                    <button type="button" id={String(n)} className="btn btn-outline-danger ms-3" onClick={(e) => removeIngredient(e)}>Usuń</button>
                                </div>
                            </li>
                        )}
                    </ul>
                </div>
            </div>}
            <div>
                <label className="ps-2">Nowy krok</label>
                <div className="d-flex flex-row gap-2">
                    <textarea rows={5} name="step" id="step" className="form-control" value={step} onChange={handleStepChange}/>
                    <button type="button" className="btn btn-success align-self-start" onClick={addStep}>Dodaj</button>
                </div>
            </div>
            {steps.length > 0 &&
            <div>
                <label className="ps-2">Kroki</label>
                <div style={{maxHeight: "300px"}} className="border rounded pe-3 pt-3 overflow-y-auto col-6">
                    <ul>
                        {steps && steps?.map((i, n) => 
                            <li key={n}>
                                <div className="d-flex flex-row align-items-center mb-2">
                                    <label>{i}</label>
                                    <button type="button" id={String(n)} className="btn btn-outline-danger ms-3" onClick={(e) => removeStep(e)}>Usuń</button>
                                </div>
                            </li>
                        )}
                    </ul>
                </div>
            </div>}
        </form>
    )
}
