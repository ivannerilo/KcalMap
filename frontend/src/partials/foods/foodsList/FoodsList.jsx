import { createContext, useContext, useEffect, useRef, useState } from "react";
import { MealContext } from "partials/dashboard/meal/Meal";
import { useFood } from "contexts/FoodContext";
import FoodsListComponent from "partials/foods/foodsList/foodsListComponent/FoodsListComponent";

const FoodsListContext = createContext();

export default function FoodsList(props){
    const meal = useContext(MealContext)
    const { getGlobalFoods } = useFood()
    const [foods, setFoods] = useState([])
    const [page, setPage] = useState(1)
    const [hasNextPage, setHasNextPage] = useState(true);
    const [isLoading, setIsLoading] = useState(true)


    async function loadSearchedFoods(debounceSearch) { // Lista
        let response = await getGlobalFoods(debounceSearch)
        setFoods(prev => ({
            global_foods: response.result.global_foods
        }))
    }

    async function loadNextPage() { //Lista
        setIsLoading(true)
        let response = await getGlobalFoods(null, page)
        setPage((prev) => prev + 1)
        setHasNextPage(response.result.has_next_page)
        setFoods(prev => {
            const prevGlobalFoods = (prev && prev?.global_foods?.length > 0) ? prev.global_foods : []
            return {
                global_foods: [
                    ...prevGlobalFoods,
                    ...response.result.global_foods
                ]
            }
        })
    }

    async function resetSearch() { //Lista
        setIsLoading(true)
        let response = await getGlobalFoods(null, 1)
        setPage(2)
        setHasNextPage(response.result.has_next_page)
        setFoods(prev => {
            return {
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
        <FoodsListContext.Provider value={value}>
            <FoodsListComponent {...props} />
        </FoodsListContext.Provider>
    )
}

export {FoodsListContext};
    
    
    
    
    
     