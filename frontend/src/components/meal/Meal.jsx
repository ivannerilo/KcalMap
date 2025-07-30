import { useCalories } from "../../contexts/CaloriesContext";
import MealComponent from "./mealComponent/MealComponent";
import { createContext, useState } from 'react'

const MealContext = createContext()

export default function Meal({ meal }) {
    const [mealState, setMealState] = useState({...meal})
    

    function setNewMealItem(mealItem) {
        setMealState((prevState) => {
            return {
                ...prevState,
                itens: [
                    ...prevState.itens,
                    mealItem
                ]
            }
        })
    }

    function setNewMealLog(mealLog) {
        setMealState((prevState) => {
            let newLogsArray = prevState.logs.filter((item) => {
                return item.food.id !== mealLog.food.id
            })

            return {
                ...prevState,
                logs: [
                    mealLog,
                    ...newLogsArray
                ]
            }
        })
    }

    function removeMealLog(mealLog) {
        setMealState((prevState) => {
            if (mealLog.deletedFoodId) {
                return {
                    ...prevState,
                    logs: prevState.logs.filter((item) => item.food.id !== mealLog.deletedFoodId)
                }
            }

            let newLogsArray = prevState.logs.filter((item) => {
                return item.food.id !== mealLog.food.id
            })
            
            console.log("Updated log", mealLog)
            const newState = {
                ...prevState,
                logs: [
                    ...newLogsArray,
                    mealLog
                ]
            }
            console.log("newstate", newState)
            return newState
        }) 

    }

    const value = {
        mealState,
        setNewMealItem,
        setNewMealLog,
        removeMealLog,
    }
    return(
        <MealContext value={value}>
            <MealComponent />
        </MealContext>
    )
}

export { MealContext }