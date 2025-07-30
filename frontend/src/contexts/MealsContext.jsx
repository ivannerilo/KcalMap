import { useEffect, useState, createContext, useContext } from "react";
import { useAuthenticate } from "./AuthenticateContext";
import { useFetch } from "../hooks/useFetch"
import { useCalories } from "./CaloriesContext";

const InternalContext = createContext()

export function MealsContext({ children }){
    const [meals, setMeals] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { isAuthenticated } = useAuthenticate();
    const { authFetch } = useFetch()
    const { calculateCalories } = useCalories()
    
    async function getMeals() {
        setIsLoading(true);
        try {
            let response = await authFetch("http://localhost:8000/api/meals")
            
            if (!response.ok) { 
                throw Error(response.message);
            }
            
            let data = await response.json()
            
            if (!data.success){
                throw Error(data.message);
            }
    
            setMeals(data.result);
            calculateCalories(data.result);
            console.log("Meals", data.result)
            setIsLoading(false);
        } catch(error) {
            console.log("error", error)
        }
    }

    async function createMeal(name) {
        try {
            let response = await authFetch("http://localhost:8000/api/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: name
                })
            })
            
            if (!response.ok){
                throw Error(response.message)
            }

            let data = await response.json()

            await getMeals()

            return data
        } catch (e) {
            console.log("error", e.message)
            return e.message
        }
    }

    async function deleteMeal(mealId) {
        try {
            let response = await authFetch("http://localhost:8000/api/delete", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id: mealId 
                })
            })
            
            if (!response.ok){
                throw Error(response.message)
            }

            let data = await response.json()

            await getMeals()

            return data
        } catch (e) {
            console.log("error", e.message)
            return e.message
        }
    }

    async function addTemplateFood(foodId, mealId) {
        try {
            let response = await authFetch("http://localhost:8000/api/template", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    mealId: mealId,
                    foodId: foodId
                })
            })
            
            if (!response.ok){
                throw Error(response.message)
            }

            let data = await response.json()

            return data
        } catch (e) {
            console.log("error", e.message)
            return e.message
        }
    }
    

    useEffect(() => {
        async function startMeals() {
            if (isAuthenticated) {
                await getMeals();  
                setIsLoading(false);
            }
        }
        startMeals();
    }, [isAuthenticated])

    const contextValue = {meals, isLoading, createMeal, deleteMeal, addTemplateFood}
    return(
        <InternalContext.Provider value={contextValue}>
            {children}
        </InternalContext.Provider>
    )
}

export function useMeals(){
    return useContext(InternalContext)
}