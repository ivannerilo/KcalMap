import { createContext, useContext, useEffect, useRef, useState } from "react";
import { MealContext } from "partials/dashboard/meal/Meal";
import { useFood } from "contexts/FoodContext";
import AddFoodModalComponent from "partials/dashboard/addFoodModal/addFoodModalComponent/AddFoodModalComponent";

const AddFoodModalContext = createContext();

export default function AddFoodModal(props){
    const meal = useContext(MealContext)
    const { getTemplateFoods } = useFood()
    const [foods, setFoods] = useState([])
    const [page, setPage] = useState(1)
    const [hasNextPage, setHasNextPage] = useState(true);
    const [isLoading, setIsLoading] = useState(true)

    
    async function loadSearchedFoods(debounceSearch) {
        let response = await getTemplateFoods(meal.mealState.id, debounceSearch)
        setFoods(prev => ({
            template_foods: prev.template_foods.filter((item) => item.name.toLowerCase().includes(debounceSearch.toLowerCase())),
            global_foods: response.result.global_foods
        }))
    }
    
    async function loadNextPage() {
        setIsLoading(true)
        let response = await getTemplateFoods(meal.mealState.id, null, page)
        setPage((prev) => prev + 1)
        setHasNextPage(response.result.has_next_page)
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

    async function resetSearch() {
        setIsLoading(true)
        let response = await getTemplateFoods(meal.mealState.id, null, 1)
        setPage(2)
        setHasNextPage(response.result.has_next_page)
        setFoods(prev => {
            return {
                template_foods: response.result.template_foods,
                global_foods: [
                    ...response.result.global_foods
                ]
            }
        })
    }
    
    const value = {
        isLoading,
        setIsLoading,
        foods,
        page,
        hasNextPage,
        loadSearchedFoods,
        loadNextPage,
        resetSearch,
    }

    return (
        <AddFoodModalContext.Provider value={value}>
            <AddFoodModalComponent {...props} />
        </AddFoodModalContext.Provider>
    )
}

export {AddFoodModalContext};
    
    
    
    
    
     