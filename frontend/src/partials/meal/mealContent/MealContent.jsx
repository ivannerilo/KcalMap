import { useState, useContext, useEffect, useRef } from "react";
import styles from "./NewMealItem.module.css";
import { MealContext } from "../Meal";
import { useUser } from "../../../contexts/UserContext";
import { useFood } from "../../../contexts/FoodContext";

export default function MealContent({ style }) {
    const meal = useContext(MealContext)
    const meals = useUser()
    const { getGlobalFoods, addFoodLog, removeFoodLog } = useFood()

    console.log("MealStateBRUXO", meal.mealState);

    const inputRef = useRef(null)

    const [errorMessage, setErrorMessage] = useState()
    const [foodQuantity, setFoodQuantity] = useState()
    const [foodOptions, setFoodOptions] = useState([])
    const [isAddNewTemplateFoodOpen, setIsAddNewTemplateFoodOpen] = useState()
    const [newTemplateFoodId, setNewTemplateFoodId] = useState()


    async function handleAddFood(item){
        setErrorMessage("");
        try {
            if (foodQuantity <= 0) {
                setErrorMessage("Invalid quantity!");
                return
            }
            let response = await addFoodLog(item.id, foodQuantity, meal.mealState.id)
            inputRef.current.value = ""
            setFoodQuantity(0)
            meal.setNewMealLog(response.result)
        } catch(e) {
            console.log("Erro!", e.message)
        }
    }

    async function handleRemoveFood(item){
        setErrorMessage("");
        try {
            if (foodQuantity <= 0) {
                setErrorMessage("Invalid quantity!");
                return 
            }
            let response = await removeFoodLog(item.id, foodQuantity, meal.mealState.id)
            inputRef.current.value = ""
            setFoodQuantity(0)
            meal.removeMealLog(response.result)
        } catch(e) {
            console.log("Erro!", e.message)
        }
    }

    async function handleSubmit(e) {
        try {
            e.preventDefault()
            let response = await meals.addTemplateFood(newTemplateFoodId, meal.mealState.id)
            meal.setNewMealItem(response.result)
        } catch(e) {
            console.log("Erro!", e.message)
        }
    }

    useEffect(() => {
        async function setFoods() {
            let response = await getGlobalFoods()
            setFoodOptions(response.foods)
        }
        setFoods()
    }, [])

    return (
        <div className={styles.mealItems} style={style}>
            <div>
                <input place={"Quantity: "} type="number" onChange={(e) => setFoodQuantity(e.target.value)} ref={inputRef}/>

                {errorMessage && (
                    <h1 style={{color: "red"}}>{errorMessage}</h1>
                )}

                <p>Consumed:</p>
                <ul>
                    {meal.mealState?.itens && meal.mealState?.itens.map((item, index) => {

                        const log = meal.logMap[item.id]
                       
                        const calories = log ? parseInt(log.quantity) * parseFloat(log.food.calories_per_unit) : null
                        const quantity = log ? log.quantity : null

                        return (
                            <div key={index}>
                                    <span>{quantity} {item.unit} - {item.name}</span>
                                    <button onClick={() => handleAddFood(item)}>+</button>
                                    <button onClick={() => handleRemoveFood(item)}>-</button>
                                    {calories && <span> = {calories.toFixed(2)}Cal</span>}
                            </div>
                        ) 
                        
                    })}
                </ul>

                <div>
                    <button onClick={() => setIsAddNewTemplateFoodOpen(!isAddNewTemplateFoodOpen)}>Add new template foods.</button>

                    {isAddNewTemplateFoodOpen && (
                        <div>
                            <form onSubmit={(e) => handleSubmit(e)}> { /* TODO: Add a select that shows the name of the UserFoods */}
                                <select name={"foodOptions"} onChange={(e) => setNewTemplateFoodId(e.target.value)}>
                                    {/* Adiconar uma forma de opção disabled. */}
                                    <option disabled={true} selected={true}>Selecione uma opção: </option>
                                    {foodOptions.map((option, index) => {
                                        return <option key={index} value={option.id}>{option.name}</option>
                                    })}
                                </select>
                                <button type="sumbit">Add</button>
                            </form>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}