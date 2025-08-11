import { MealContext } from "../../Meal"
import { useContext, useState, useRef } from "react"
import styles from "./Item.module.css"
import Input from "../../../../components/input/Input"
import BreakLine from "../../../../components/breakLine/BreakLine";
import { useFood } from "../../../../contexts/FoodContext";
import Button from "../../../../components/button/Button";

export default function Item({index, item}){
    const [isOpen, setIsOpen] = useState();
    const [foodQuantity, setFoodQuantity] = useState();
    const [errorMessage, setErrorMessage] = useState();
    const meal = useContext(MealContext)
    const {addFoodLog, removeFoodLog } = useFood()
    const inputRef = useRef();

    const log = meal.logMap[item.id]                       
    const calories = log ? parseInt(log.quantity) * parseFloat(log.food.calories_per_unit) : null
    const quantity = log ? log.quantity : null

    console.log(foodQuantity);


    async function handleAddFood(item){
        setErrorMessage("");
        try {
            if (foodQuantity <= 0) {
                setErrorMessage("Invalid quantity!");
                return
            }
            console.log(item.id, foodQuantity, meal.mealState.id)
            let response = await addFoodLog(item.id, parseInt(foodQuantity), meal.mealState.id)
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
            let response = await removeFoodLog(item.id, parseInt(foodQuantity), meal.mealState.id)
            inputRef.current.value = ""
            setFoodQuantity(0)
            meal.removeMealLog(response.result)
        } catch(e) {
            console.log("Erro!", e.message)
        }
    }

    return (
        <div>
            <div className={styles.container} key={index} onClick={() => setIsOpen(!isOpen)}>
                <span>{item.name}({item.unit}) {quantity ? ` - ${quantity}${item.unit}` : ""}</span>
            </div>

            {isOpen && 
            <>                
                <BreakLine
                    width={"440px"}
                    height={"4px"}
                    color={"black"}
                />
                <div className={styles.dropContainer} key={index}>
                    <Input
                        name={"quantity"}
                        type={"number"}
                        placeholder={"Quantity: "}
                        className={styles.input}
                        onChange={(e) => setFoodQuantity(e.target.value)}
                        ref={inputRef}
                    />
                    <Button 
                        className={styles.button}
                        onClick={() => handleAddFood(item)}
                        style={{ backgroundColor: "var(--main-theme-gold)"}}
                    >+</Button>
                    <Button
                        className={styles.button}
                        onClick={() => handleRemoveFood(item)}
                        style={{ backgroundColor: "var(--main-theme-red)"}}
                    >-</Button>
                </div>
            </>
            }

        </div>
    ) 
}