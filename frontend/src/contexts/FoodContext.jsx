import { createContext, useContext, useState } from "react";
import { useFetch } from "../hooks/useFetch";

const InternalContext = createContext()

export function FoodContext({ children }) {
    const { authFetch } = useFetch()

    async function getUserFoods() {
        try {
            let response = await authFetch("http://localhost:8000/api/food")
            
            if (!response.ok) { //melhorar esse error handling aqui.
                throw Error("Fail to fetch meals." + response.message);
            }
    
            let data = await response.json()
            return data
        } catch(e) {
            throw Error(e.message)
        }
    }

    async function getGlobalFoods() {
        try {
            let response = await authFetch("http://localhost:8000/api/global-food")
            
            if (!response.ok) { //melhorar esse error handling aqui.
                throw Error("Fail to fetch meals." + response.message);
            }
    
            let data = await response.json()
            return data
        } catch(e) {
            throw Error(e.message)
        }
    }

    async function addFoodLog(foodId, quantity, mealId = null) {
        try {
            let response = await authFetch("http://localhost:8000/api/log", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
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

            return data
        } catch (e) {
            throw Error(e.message)
        }
    }

    async function removeFoodLog(foodId, quantity, mealId = null) {
        try {
            let response = await authFetch("http://localhost:8000/api/log/delete", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
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

            return data
        } catch (e) {
            throw Error(e.message)
        }
    }
    


    const value = {
        getGlobalFoods, 
        getUserFoods, 
        addFoodLog, 
        removeFoodLog
    }

    return (
        <InternalContext.Provider value={value}>
            {children}
        </InternalContext.Provider>
    )
}

export function useFood() {
    return useContext(InternalContext)
}