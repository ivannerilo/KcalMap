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
            return {
                ...prevState,
                logs: [
                    ...prevState.logs,
                    mealLog
                ]
            }
        })
    }

    const value = {
        mealState,
        setNewMealItem,
        setNewMealLog,
    }
    return(
        <MealContext value={value}>
            <MealComponent />
        </MealContext>
    )
}

export { MealContext }