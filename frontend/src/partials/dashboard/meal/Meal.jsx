import { useFood } from "contexts/FoodContext";
import { useUser } from "contexts/UserContext";
import MealComponent from "partials/dashboard/meal/mealComponent/MealComponent";
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
        setMealState((prevState) => {
            console.log("prevState",prevState)
            console.log("mealLog", mealLog)
            let newLogsArray = prevState.food_log.filter((item) => {
                return item.food.id !== mealLog.food.id
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
                const deletedLogId = mealLog
                return {
                    ...prevState,
                    food_log: prevState.food_log.filter((item) => item.food.id !== deletedLogId)
                }
            }



            let newLogsArray = prevState.food_log.map((item) => {
                if (item.food.id === mealLog.food.id){
                    return mealLog
                }
                return item
            })
            
            const newState = {
                ...prevState,
                food_log: [
                    ...newLogsArray,
                ]
            }
            return newState
        }) 

    }

    // Handlers

    async function handleAddLog(item, quantity){
        try {
            let response = await createFoodLog(item.id, quantity, mealState.id)
            setNewMealLog(response.result)
        } catch(e) {
            console.log("Erro!", e.message)
        }
    }

    async function handleUpdateLog(item, quantity) {
        try {
            let response = await updateFoodLog(item.id, quantity, mealState.id)
            updateOrRemoveLog(response.result)
        } catch(e) {
            console.log("Erro!", e.message)
        }
    }

    async function handleDeleteLog(item){
        try {
            let response = await deleteFoodLog(item.id, mealState.id)
            console.log("Eu sou a poha de um int", response.result, typeof response.result)
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
        handleAddLog,
        handleDeleteLog,
        handleUpdateLog,
    }
    return(
        <MealContext value={value}>
            <MealComponent />
        </MealContext>
    )
}

export { MealContext }