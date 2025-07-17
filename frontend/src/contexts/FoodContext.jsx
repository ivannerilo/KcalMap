import { createContext, useContext, useState } from "react";
import { useFetch } from "../hooks/useFetch";
import { useAuthenticate } from "./AuthenticateContext";

const InternalContext = createContext()

export function FoodContext({ children }) {
    const { authFetch } = useFetch()
    const { accessToken } = useAuthenticate()

    async function getUserFoods() {
        try {
            let response = await authFetch("http://localhost:8000/api/food", {
                headers: {
                    "Authorization": "Bearer " + accessToken,
                }
            })
            
            if (!response.ok) { //melhorar esse error handling aqui.
                throw Error("Fail to fetch meals." + response.message);
            }
    
            let data = await response.json()
            return data
        } catch(e) {
            return e.message
        }
    }

    async function getGlobalFoods() {
        try {
            let response = await authFetch("http://localhost:8000/api/global-food", {
                headers: {
                    "Authorization": "Bearer " + accessToken,
                }
            })
            
            if (!response.ok) { //melhorar esse error handling aqui.
                throw Error("Fail to fetch meals." + response.message);
            }
    
            let data = await response.json()
            return data
        } catch(e) {
            return e.message
        }
    }

    async function addFoodLog(foodId, quantity, mealId = null) {
        try {
            let response = await authFetch("http://localhost:8000/api/log", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + accessToken,
                },
                body: JSON.stringify({
                    foodId: foodId,
                    mealId: mealId,
                    quantity: quantity,
                })
            })
            
            if (!response.ok){
                throw Error(response.message)
            }

            let data = await response.json()

            // await getMeals()

            return data
        } catch (e) {
            console.log("error", e.message)
            return e.message
        }
    }

    async function removeFoodLog(foodId, quantity, mealId = null) {
        try {
            let response = await authFetch("http://localhost:8000/api/log", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + accessToken,
                },
                body: JSON.stringify({
                    foodId: foodId,
                    mealId: mealId,
                    quantity: quantity,
                })
            })
            
            if (!response.ok){
                throw Error(response.message)
            }

            let data = await response.json()

            // Adicionar essa função que atualiza o estado, sempre que um novo componente com essas infos é aberto
            // Assim não precisamos fazer um request de getMeal toda vez que há uma atualização
            //await getMeals()

            return data
        } catch (e) {
            console.log("error", e.message)
            return e.message
        }
    }
    


    const value = {getGlobalFoods, getUserFoods, addFoodLog, removeFoodLog}
    return (
        <InternalContext.Provider value={value}>
            {children}
        </InternalContext.Provider>
    )
}

export function useFood() {
    return useContext(InternalContext)
}