import { createContext, useContext, useState } from "react";

const InternalContext = createContext()

export default function CaloriesContext({ children }) {
    const [calories, setCalories] = useState(0);

    
    function calculateCalories(meals){
        if (meals) {
            let cals = 0;
            meals.forEach(meal => {
                meal.logs.forEach(log => {
                    cals += parseFloat(log.quantity) * parseFloat(log.food.calories_per_unit)
                })
            });
            console.log("Calories", cals)
            setCalories(cals)
        }
    }
    
    const value = {calories, calculateCalories}

    return (
        <InternalContext.Provider value={value}>
            {children}
        </InternalContext.Provider>
    )
}

export function useCalories() {
    return useContext(InternalContext)
}