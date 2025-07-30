import { createContext, useContext, useEffect, useState } from "react";
import { useFetch } from "../hooks/useFetch";

const InternalContext = createContext()

export default function CaloriesContext({ children }) {
    const [calories, setCalories] = useState(0);
    const [caloriesGoal, setCaloriesGoal] = useState(0);

    const { authFetch } = useFetch()

    async function getCaloriesGoal() {
        try {
            let response = await authFetch("http://localhost:8000/api/calories")
            if (!response.ok) {
                throw Error(response.message)
            }

            let data = await response.json()

            setCaloriesGoal(data.result)
        } catch(e) {
            console.log(e.message)
        }
    }

    async function createProfile(height, weight, sex, age, goal) {
        try {
            let response = await authFetch("http://localhost:8000/api/profile", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    height: height,
                    weight: weight,
                    sex: sex,
                    age: age,
                    goal: goal,
                }) 
            })

            if (!response.ok) {
                throw Error(response.message)
            }

            let data = await response.json()

            setCaloriesGoal(goal);
            return {ok: true, result: data.result}
        } catch(e) {
            return {ok: false, message: e.message}
        }
    }
    

    
    function calculateCalories(meals){
        if (meals) {
            let cals = 0;
            meals.forEach(meal => {
                meal.logs.forEach(log => {
                    cals += parseFloat(log.quantity) * parseFloat(log.food.calories_per_unit)
                })
            });
            setCalories(cals)
        }
    }
    
    const value = {
        calories,
        calculateCalories,
        caloriesGoal,
        createProfile,
    }

    useEffect(() => {
        getCaloriesGoal();
    }, [])

    return (
        <InternalContext.Provider value={value}>
            {children}
        </InternalContext.Provider>
    )
}

export function useCalories() {
    return useContext(InternalContext)
}