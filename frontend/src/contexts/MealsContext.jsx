import { useEffect, useState, createContext, useContext } from "react";
import { useAuthenticate } from "./AuthenticateContext";

const InternalContext = createContext()

export function MealsContext({ children }){
    const [meals, setMeals] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { accessToken, isAuthenticated } = useAuthenticate();
    console.log(meals)
    console.log("Componente renderizado")

    async function getMeals() {
        setIsLoading(true);
        let response = await fetch("http://localhost:8000/api/meals/", {
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
    }

    // Add new meals function!

    useEffect(() => {
        async function startMeals() {
            if (isAuthenticated) {
                await getMeals();  
                setIsLoading(false);
            }
        }
        startMeals();
    }, [isAuthenticated])

    const contextValue = {meals, isLoading}
    return(
        <InternalContext.Provider value={contextValue}>
            {children}
        </InternalContext.Provider>
    )
}

export function useMeals(){
    return useContext(InternalContext)
}