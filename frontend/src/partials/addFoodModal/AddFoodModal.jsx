import { createContext, useContext, useEffect, useRef, useState } from "react";
import { MealContext } from "../meal/Meal";
import { useUser } from "../../contexts/UserContext";
import { useFood } from "../../contexts/FoodContext";
import AddFoodModalComponent from "./addFoodModalComponent/AddFoodModalComponent";

const AddFoodModalContext = createContext();

export default function AddFoodModal(props){
    const meal = useContext(MealContext)
    const meals = useUser()
    const { getGlobalFoods, addFoodLog, removeFoodLog } = useFood()

    const [foodOptions, setFoodOptions] = useState([])
    const [isAddNewTemplateFoodOpen, setIsAddNewTemplateFoodOpen] = useState()
    const [newTemplateFoodId, setNewTemplateFoodId] = useState()


    async function handleAddFood(item, quantity){
        try {
            let response = await addFoodLog(item.id, quantity, meal.mealState.id)
            meal.setNewMealLog(response.result)
        } catch(e) {
            console.log("Erro!", e.message)
        }
    }

    async function handleRemoveFood(item, quantity){
        try {
            let response = await removeFoodLog(item.id, quantity, meal.mealState.id)
            meal.removeMealLog(response.result)
        } catch(e) {
            console.log("Erro!", e.message)
        }
    }

    async function handleSubmit(e) {
        try {
            e.preventDefault()
            let response = await meals.addTemplateFood(newTemplateFoodId, meal.mealState.id)
            meal.setNewMealItem(response.result)
        } catch(e) {
            console.log("Erro!", e.message)
        }
    }

    useEffect(() => {
        async function setFoods() {
            let response = await getGlobalFoods()
            setFoodOptions(response.foods)
        }
        setFoods()
    }, [])

    const value = {
        handleSubmit,
        handleRemoveFood,
        handleAddFood, 
    }

    return (
        <AddFoodModalContext.Provider value={value}>
            <AddFoodModalComponent {...props} />
        </AddFoodModalContext.Provider>
    )
}

export {AddFoodModalContext};
    
    
    
    
    
     