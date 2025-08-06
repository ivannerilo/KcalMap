import { useUser } from "../../contexts/UserContext";
import MealComponent from "./mealComponent/MealComponent";
import { createContext, useEffect, useMemo, useState } from 'react'

const MealContext = createContext()

export default function Meal({ meal }) {
    const [mealState, setMealState] = useState({...meal})
    const { updateMeals } = useUser()

    const logMap = useMemo(() => {
        let map = {};

        mealState.logs.map((log) => (
            map[log.food.id] = log
        ))

        return map
    }, [mealState.logs])

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

    useEffect(() => {
        updateMeals(mealState)
    }, [mealState])
    
    const value = {
        mealState,
        logMap,
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