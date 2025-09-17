import { createContext, useContext, useEffect, useRef, useState } from "react";
import { MealContext } from "partials/dashboard/meal/Meal";
import { useUser } from "contexts/UserContext";
import { useFood } from "contexts/FoodContext";
import AddFoodModalComponent from "partials/dashboard/addFoodModal/addFoodModalComponent/AddFoodModalComponent";

const AddFoodModalContext = createContext();

export default function AddFoodModal(props){
    const meal = useContext(MealContext)
    const { getTemplateFoods } = useFood()
    const [foods, setFoods] = useState([])

    async function getFoods() {
        let response = await getTemplateFoods(meal.mealState.id)
        setFoods(response.result)
    }

    async function searchFoods(debounceSearch) {
        let response = await getTemplateFoods(meal.mealState.id, debounceSearch)
        setFoods(prev => ({
            ...prev,
            global_foods: response.result.searched_foods
        }))
    }

    async function loadPage(pageNum){
        let response = await getTemplateFoods(meal.mealState.id, null, pageNum)
        setFoods(prev => ({
            ...prev,
            global_foods: [
                ...prev.global_foods,
                response.result.searched_foods
            ]
        }))
    }


    useEffect(() => {
        getFoods()
    }, [])

    const value = {
        foods,
        searchFoods,
        getFoods,
        loadPage,
    }

    return (
        <AddFoodModalContext.Provider value={value}>
            <AddFoodModalComponent {...props} />
        </AddFoodModalContext.Provider>
    )
}

export {AddFoodModalContext};
    
    
    
    
    
     