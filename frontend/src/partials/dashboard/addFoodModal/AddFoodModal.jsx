import { createContext, useContext, useEffect, useRef, useState } from "react";
import { MealContext } from "partials/dashboard/meal/Meal";
import { useUser } from "contexts/UserContext";
import { useFood } from "contexts/FoodContext";
import AddFoodModalComponent from "partials/dashboard/addFoodModal/addFoodModalComponent/AddFoodModalComponent";

const AddFoodModalContext = createContext();

export default function AddFoodModal(props){
    const meal = useContext(MealContext)
    const meals = useUser()
    const { getGlobalFoods } = useFood()

    const [foodOptions, setFoodOptions] = useState([])
    const [isAddNewTemplateFoodOpen, setIsAddNewTemplateFoodOpen] = useState()
    const [newTemplateFoodId, setNewTemplateFoodId] = useState()


    // adição de novas template foods
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
    }

    return (
        <AddFoodModalContext.Provider value={value}>
            <AddFoodModalComponent {...props} />
        </AddFoodModalContext.Provider>
    )
}

export {AddFoodModalContext};
    
    
    
    
    
     