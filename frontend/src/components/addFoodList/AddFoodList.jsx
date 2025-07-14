import { useContext, useState } from "react";
import { MealContext } from "../meal/Meal";
import { useMeals } from "../../contexts/MealsContext";

export default function AddFoodList(){
    const meal = useContext(MealContext)
    const meals = useMeals()

    const [isAddNewTemplateFoodOpen, setIsAddNewTemplateFoodOpen] = useState()
    const [newTemplateFoodId, setNewTemplateFoodId] = useState()

    function handleAddFood(item){
        console.log("AddFood", item.name)
    }

    function handleRemoveFood(item){
        console.log("RemoveFood", item.name)
    }

    async function handleSubmit(e) {
        e.preventDefault()
        console.log(newTemplateFoodId, meal.id)
        let response = await meals.addTemplateFood(newTemplateFoodId, meal.id)
        console.log(response)
    }

    return (
        <div>
            <span>Template Foods:</span>
            <ul>
                {meal?.itens.map((item, index) => (
                    <div key={index}>
                        <span>{item.name}</span>
                        <button onClick={() => handleAddFood(item)}>+</button>
                        <button onClick={() => handleRemoveFood(item)}>-</button>
                    </div>
                ))}
            </ul>
            <button onClick={() => setIsAddNewTemplateFoodOpen(!isAddNewTemplateFoodOpen)}>Add new template foods.</button>
            {isAddNewTemplateFoodOpen && (
                <div>
                    <form onSubmit={(e) => handleSubmit(e)}>
                        <input type="numerical" onChange={(e) => setNewTemplateFoodId(e.target.value)} />
                        <button type="submit">Enviar</button>
                    </form>
                </div>
            )}
        </div>

    )
}