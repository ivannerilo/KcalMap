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
            template_foods: prev.template_foods.filter((item) => item.name.toLowerCase().includes(debounceSearch.toLowerCase())),
            global_foods: response.result.searched_foods
        }))
    }

    async function getFoodsPage(pageNum = 1){
        let response = await getTemplateFoods(meal.mealState.id, null, pageNum)
        setFoods(prev => {
            const prevGlobalFoods = (prev && prev?.global_foods?.length > 0) ? prev.global_foods : []
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
        getFoodsPage,
    }

    return (
        <AddFoodModalContext.Provider value={value}>
            <AddFoodModalComponent {...props} />
        </AddFoodModalContext.Provider>
    )
}

export {AddFoodModalContext};
    
    
    
    
    
     