import { useMutation, useQuery } from "react-query";
import { getUnits } from "../../apiServices/UnitService";
import { useState } from "react";
import { getCategories } from "../../apiServices/categoryApiService";
import { createRecipe } from "../../apiServices/RecipeService";
import { useNavigate } from "react-router";
import { useAuth } from "../../contexts/AuthContext";
import { toast } from "react-toastify";


export const AddRecipe = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [recipe, setRecipe] = useState<RecipeAddData>({
        name: "",
        description: "",
        difficulty: -1,
        prepareTime: 0,
        ingredients: [],
        steps: [],
        categoryId: -1,
        userId: -1
    });
    const [ingredient, setIngredient] = useState<IngredientFormData>({
        name: "",
        amount: 0,
        unitId: -1
    });
    const [step, setStep] = useState<string>("");
    const [image, setImage] = useState<File | null>(null);


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

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };

    const { data: units } = useQuery(
        "getUnits",
        async () => getUnits()
    )

    const { data: categories } = useQuery(
        "getCategories",
        async () => getCategories()
    )

    function addIngredient() {
        if (recipe.ingredients.filter(i => i.name == ingredient.name).length == 0 &&
            ingredient.name.length > 0 &&
            ingredient.amount > 0 &&
            ingredient.unitId != -1) {
            setRecipe({ ...recipe, ingredients: [...recipe.ingredients, ingredient] });
            setIngredient({
                name: "",
                amount: 0,
                unitId: -1
            });
        }
    }

    function addStep() {
        if (step.length > 0 &&
            recipe.steps.filter(s => s == step).length == 0) {
            setRecipe({ ...recipe, steps: [...recipe.steps, step] });
            setStep("");
        }
    }

    function removeIngredient(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        setRecipe({
            ...recipe, ingredients: recipe.ingredients.filter(
                i => i.name != Array.from((e.target as HTMLButtonElement).parentElement!.children).find(e => e.classList.contains("ingredient"))?.textContent
            )
        });
    }

    function removeStep(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        setRecipe({
            ...recipe, steps: recipe.steps.filter(
                i => i != Array.from((e.target as HTMLButtonElement).parentElement!.children).find(e => e.classList.contains("step"))?.textContent
            )
        });
    }

    async function submit(e: React.FormEvent) {
        e.preventDefault();
        if (recipe.name.length > 0 &&
            recipe.description.length > 0 &&
            recipe.prepareTime > 0 &&
            recipe.categoryId != -1 &&
            recipe.difficulty != -1 &&
            recipe.ingredients.length > 0 &&
            image != null &&
            recipe.steps.length > 0) 
        {
            await mutateAsync();
        }
    }

    const { mutateAsync } = useMutation(
        "createRecipe",
        async () => await toast.promise(createRecipe({ ...recipe, userId: user!.id }, image!), {
            pending: "W trakcie tworzenia przepisu",
            error: "Nie udało się stworzyć przepisu",
            success: "Przepis utworzony"
        }),
        {
            onSuccess: () => {
                navigate("/profile");
            }
        }
    )

    return (
        <form onSubmit={submit} className="d-flex flex-column gap-3">
            <div className="d-flex flex-column gap-3">
                <div className="row gap-3 gap-xl-0">
                    <div className="col-12 col-xl-6">
                        <label htmlFor="name" className="ps-2">Nazwa przepisu</label>
                        <input type="text" name="name" id="name" className="form-control" value={recipe.name} onChange={handleRecipeChange} />
                    </div>
                    <div className="col-12 col-xl-6">
                        <label htmlFor="prepareTime" className="ps-2">Czas przygotowania (min)</label>
                        <input type="number" name="prepareTime" id="prepareTime" className="form-control" value={recipe.prepareTime} onChange={handleRecipeChange} />
                    </div>
                </div>
                <div className="row gap-3 gap-xl-0">
                    <div className="col-12 col-xl-4">
                        <label htmlFor="difficulty" className="ps-2">Trudność</label>
                        <select name="difficulty" id="difficulty" className="form-control" value={recipe.difficulty} onChange={handleRecipeChange}>
                            <option value={-1}>Trudność</option>
                            <option value={1}>Łatwy</option>
                            <option value={2}>Średni</option>
                            <option value={3}>Trudny</option>
                        </select>
                    </div>
                    <div className="col-12 col-xl-4">
                        <label htmlFor="categoryId" className="ps-2">Kategoria</label>
                        <select className="form-control" name="categoryId" value={recipe.categoryId} onChange={handleRecipeChange}>
                            <option key={-1} value={-1}>Kategoria</option>
                            {categories && categories?.map(c =>
                                <option key={c.id} value={c.id}>{c.name}</option>
                            )}
                        </select>
                    </div>
                    <div className="col-12 col-xl-4 d-flex align-items-end">
                        <label htmlFor="image" className="btn btn-outline-success me-2">Wybierz zdjęcie</label>
                        <input type="file" accept="image/*" id="image" name="image" className="d-none" onChange={handleFileChange}/>
                        <img src={image ? URL.createObjectURL(image) : ""} style={{height: "50px"}} className={"rounded border " + (image ? "d-block" : "d-none")}/>
                    </div>
                </div>
            </div>
            <div>
                <label htmlFor="description" className="ps-2">Opis</label>
                <textarea rows={5} name="description" id="description" className="form-control" value={recipe.description} onChange={handleRecipeChange} />
            </div>
            <div>
                <label className="ps-2">Nowy składnik</label>
                <div className="d-flex flex-row gap-2">
                    <div className="input-group">
                        <input type="text" className="form-control w-50" name="ingredientname" placeholder="Nazwa" value={ingredient.name} onChange={handleIngredientChange} />
                        <input type="number" className="form-control w-25" name="ingredientamount" value={ingredient.amount} onChange={handleIngredientChange} />
                        <select className="form-control w-25" name="ingredientunitId" value={ingredient.unitId} onChange={handleIngredientChange}>
                            <option key={-1} value={-1}>Jednostka</option>
                            {units && units?.map(u =>
                                <option key={u.id} value={u.id}>{u.name}</option>
                            )}
                        </select>
                    </div>
                    <button type="button" className="btn btn-outline-success" onClick={addIngredient}>Dodaj</button>
                </div>
            </div>
            <div>
                <label className="ps-2">Nowy krok</label>
                <div className="d-flex flex-row gap-2">
                    <textarea rows={5} name="step" id="step" className="form-control" value={step} onChange={handleStepChange} />
                    <button type="button" className="btn btn-outline-success align-self-start" onClick={addStep}>Dodaj</button>
                </div>
            </div>
            <div className="row">
                {recipe.ingredients.length > 0 &&
                    <div className="col-12 col-xl-6">
                        <label className="ps-2">Składniki</label>
                        <div style={{ maxHeight: "300px" }} className="border rounded pe-3 pt-3 overflow-y-auto">
                            <ul>
                                {recipe.ingredients && recipe.ingredients?.map((i, n) =>
                                    <li key={n}>
                                        <div className="d-flex flex-row align-items-center ingredient-list mb-2">
                                            <label className="ingredient">{i.name}</label>
                                            <div className="dots flex-grow-1"></div>
                                            <label>{i.amount + " " + units?.find(u => u.id == i.unitId)?.name}</label>
                                            <button type="button" className="btn btn-outline-danger ms-3" onClick={(e) => removeIngredient(e)}>Usuń</button>
                                        </div>
                                    </li>
                                )}
                            </ul>
                        </div>
                    </div>}
                {recipe.steps.length > 0 &&
                    <div className="col-12 col-xl-6">
                        <label className="ps-2">Kroki</label>
                        <div style={{ maxHeight: "300px" }} className="border rounded pe-3 pt-3 overflow-y-auto">
                            <ul>
                                {recipe.steps && recipe.steps?.map((i, n) =>
                                    <li key={n}>
                                        <div className="d-flex flex-row align-items-center mb-2 ingredient-list">
                                            <label className="flex-grow-1 step">{i}</label>
                                            <button type="button" className="btn btn-outline-danger ms-3 justify-self-end" onClick={(e) => removeStep(e)}>Usuń</button>
                                        </div>
                                    </li>
                                )}
                            </ul>
                        </div>
                    </div>}
            </div>
            <button type="submit" className="btn btn-success fs-5">Dodaj przepis</button>
        </form>
    )
}
