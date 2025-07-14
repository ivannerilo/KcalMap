import { useEffect, useState, createContext, useContext } from "react";
import { useAuthenticate } from "./AuthenticateContext";
import { useFetch } from "../hooks/useFetch"

const InternalContext = createContext()

export function MealsContext({ children }){
    const [meals, setMeals] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { accessToken, isAuthenticated, refreshAccessToken } = useAuthenticate();
    const { authFetch } = useFetch()
    console.log(meals)
    console.log("Componente renderizado")
    
    async function getMeals() {
        setIsLoading(true);
        try {
            let response = await authFetch("http://localhost:8000/api/meals", {
                headers: {
                    "Authorization": "Bearer " + accessToken,
                }
            })
            
            if (!response.ok) { //melhorar esse error handling aqui.
                throw Error("Fail to fetch meals." + response.message);
            }
    
            let data = await response.json()
            if (!data){
                throw Error("Fail jsonfy data." + response.message);
            }
    
            setMeals(data.meals);
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
                    "Authorization": "Bearer " + accessToken,
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
        } catch (error) {
            console.log("error", error.message)
            return {success: false, message: error.message}
        }
    }

    async function deleteMeal(mealId) {
        try {
            let response = await authFetch("http://localhost:8000/api/delete", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + accessToken,
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
        } catch (error) {
            console.log("error", error.message)
            return {success: false, message: error.message}
        }
    }

    async function addTemplateFood(mealId, foodId) {
        try {
            let response = await authFetch("http://localhost:8000/api/template", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + accessToken,
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

            await getMeals()

            return data
        } catch (error) {
            console.log("error", error.message)
            return {success: false, message: error.message}
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