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


    const value = {getGlobalFoods, getUserFoods}
    return (
        <InternalContext.Provider value={value}>
            {children}
        </InternalContext.Provider>
    )
}

export function useFood() {
    return useContext(InternalContext)
}