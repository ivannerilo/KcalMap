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

    async function searchFoods(debounceSearch) {
        let response = await getTemplateFoods(meal.mealState.id, debounceSearch)
        setFoods(prev => ({
            ...prev,
            global_foods: response.result.searched_foods
        }))
    }

    async function loadPage(pageNum = 1){
        let response = await getTemplateFoods(meal.mealState.id, null, pageNum)
        setFoods(prev => {
            const prevGlobalFoods = (prev && prev.length > 0) ? prev.global_foods : []
            console.log("prevGlobalFoods", prevGlobalFoods)
            console.log("prev", prev)
            return {
                template_foods: response.result.template_foods,
                global_foods: [
                    ...prevGlobalFoods,
                    ...response.result.global_foods
                ]
            }
        })
    }

    const value = {
        foods,
        searchFoods,
        loadPage,
    }

    return (
        <AddFoodModalContext.Provider value={value}>
            <AddFoodModalComponent {...props} />
        </AddFoodModalContext.Provider>
    )
}

export {AddFoodModalContext};
    
    
    
    
    
     