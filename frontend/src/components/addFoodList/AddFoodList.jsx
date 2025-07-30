import { useContext, useEffect, useRef, useState } from "react";
import { MealContext } from "../meal/Meal";
import { useMeals } from "../../contexts/MealsContext";
import { useFood } from "../../contexts/FoodContext";

export default function AddFoodList(){
    const meal = useContext(MealContext)
    const meals = useMeals()
    const { getGlobalFoods, addFoodLog, removeFoodLog } = useFood()

    const inputRef = useRef(null)

    const [foodQuantity, setFoodQuantity] = useState()
    const [foodOptions, setFoodOptions] = useState([])
    const [isAddNewTemplateFoodOpen, setIsAddNewTemplateFoodOpen] = useState()
    const [newTemplateFoodId, setNewTemplateFoodId] = useState()


    async function handleAddFood(item){
        let response = await addFoodLog(item.id, foodQuantity, meal.mealState.id)
        inputRef.current.value = ""
    }

    async function handleRemoveFood(item){
        let response = await removeFoodLog(item.id, foodQuantity, meal.mealState.id)
        inputRef.current.value = ""
    }

    async function handleSubmit(e) {
        e.preventDefault()
        let response = await meals.addTemplateFood(newTemplateFoodId, meal.mealState.id)
        if (response.success) {
            meal.setNewMealItem(response.result)
        } 

    }

    useEffect(() => {
        async function setFoods() {
            let response = await getGlobalFoods()
            setFoodOptions(response.foods)
        }
        setFoods()
    }, [])

    return (
        <div>
            <span>Template Foods:</span>
            <input place={"Quantity: "} type="number" onChange={(e) => setFoodQuantity(e.target.value)} ref={inputRef}/>
            <ul>
                {meal.mealState?.itens && meal.mealState?.itens.map((item, index) => (
                    <div key={index}>
                        <span>{item.name} - {item.unit}</span>
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
                            {/* Adiconar uma forma de opção disabled. */}
                            <option disabled={true} selected={true}>Selecione uma opção: </option>
                            {foodOptions.map((option, index) => {
                                return <option key={index} value={option.id}>{option.name}</option>
                            })}
                        </select>
                        <button type="sumbit">Add</button>
                    </form>
                </div>
            )}
        </div>

    )
}