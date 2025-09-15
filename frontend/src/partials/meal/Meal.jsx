import { useFood } from "../../contexts/FoodContext";
import { useUser } from "../../contexts/UserContext";
import MealComponent from "./mealComponent/MealComponent";
import { createContext, useEffect, useState } from 'react'

const MealContext = createContext()

export default function Meal({ meal }) {
    const [mealState, setMealState] = useState({...meal});
    const { updateFoodLog, createFoodLog, deleteFoodLog } = useFood();
    const { updateMeals } = useUser();

    // Toda vez que o estado de uma meal mudar, elas todas serão atualizadas,
    // recalculando as calorias, etc...
    useEffect(() => {
        updateMeals(mealState)
    }, [mealState])

    // Manipuladores de estado

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
        console.log("mealLog", mealLog)
        setMealState((prevState) => {
            let newLogsArray = prevState.food_log.filter((item) => {
                return item.food.id !== mealLog
            })

            return {
                ...prevState,
                food_log: [
                    mealLog,
                    ...newLogsArray
                ]
            }
        })
    }

    function updateOrRemoveLog(mealLog) {
        setMealState((prevState) => {
            if (typeof mealLog === "number") {
                return {
                    ...prevState,
                    food_log: prevState.food_log.filter((item) => item.food.id !== mealLog)
                }
            }

            let newLogsArray = prevState.food_log.filter((item) => {
                return item.food.id !== mealLog.food.id
            })
            
            const newState = {
                ...prevState,
                food_log: [
                    ...newLogsArray,
                    mealLog
                ]
            }
            return newState
        }) 

    }

    // Handlers

    async function handleAddFood(item, quantity){
        console.log(item, quantity)
        try {
            let response = await createFoodLog(item.food.id, quantity, mealState.id)
            setNewMealLog(response.result)
        } catch(e) {
            console.log("Erro!", e.message)
        }
    }

    async function handleUpdateFood(item, quantity) {
        try {
            let response = await updateFoodLog(item.food.id, quantity, mealState.id)
            updateOrRemoveLog(response.result)
        } catch(e) {
            console.log("Erro!", e.message)
        }
    }

    async function handleRemoveFood(item, quantity){
        try {
            let response = await deleteFoodLog(item.food.id, quantity, mealState.id)
            updateOrRemoveLog(response.result)
        } catch(e) {
            console.log("Erro!", e.message)
        }
    }

    const value = {
        mealState,
        setNewMealItem,
        setNewMealLog,
        updateOrRemoveLog,
        handleAddFood,
        handleRemoveFood,
        handleUpdateFood,
    }
    return(
        <MealContext value={value}>
            <MealComponent />
        </MealContext>
    )
}

export { MealContext }