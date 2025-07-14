import { useContext, useEffect, useState } from "react";
import { MealContext } from "../meal/Meal";
import { useMeals } from "../../contexts/MealsContext";
import { useFood } from "../../contexts/FoodContext";

export default function AddFoodList(){
    const meal = useContext(MealContext)
    const meals = useMeals()
    const { getGlobalFoods } = useFood()

    const [foodOptions, setFoodOptions] = useState([])
    const [isAddNewTemplateFoodOpen, setIsAddNewTemplateFoodOpen] = useState()
    const [newTemplateFoodId, setNewTemplateFoodId] = useState()

    console.log(newTemplateFoodId)

    function handleAddFood(item){
        console.log("AddFood", item.name)
    }

    function handleRemoveFood(item){
        console.log("RemoveFood", item.name)
    }

    async function handleSubmit(e, formData) {
        e.preventDefault()
        console.log(newTemplateFoodId, meal.id)
        let response = await meals.addTemplateFood(newTemplateFoodId, meal.id)
        console.log(response.data)
    }

    useEffect(() => {
        async function setFoods() {
            let response = await getGlobalFoods()
            console.log(response)
            setFoodOptions(response.foods)
        }
        setFoods()
    }, [])

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
                    <form onSubmit={(e) => handleSubmit(e)}> { /* TODO: Add a select that shows the name of the UserFoods */}
                        <select name={"foodOptions"} onChange={(e) => setNewTemplateFoodId(e.target.value)}>
                            <option disabled={true}>Select one food: </option>
                            {foodOptions.map((option, index) => {
                                return <option value={option.id}>{option.name}</option>
                            })}
                        </select>
                        <button type="sumbit">Add</button>
                    </form>
                </div>
            )}
        </div>

    )
}