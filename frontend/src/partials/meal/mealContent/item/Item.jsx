import { MealContext } from "../../Meal"
import { useContext, useState } from "react"
import styles from "./Item.module.css"
import Input from "../../../../components/input/Input"
import BreakLine from "../../../../components/breakLine/BreakLine";

export default function Item({index, item, handleAddFood, handleRemoveFood }){
    const [isOpen, setIsOpen] = useState();
    const [foodQuantity, setFoodQuantity] = useState();
    const meal = useContext(MealContext)

    const log = meal.logMap[item.id]
    console.log("log", log)
                       
    const calories = log ? parseInt(log.quantity) * parseFloat(log.food.calories_per_unit) : null
    const quantity = log ? log.quantity : null

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
                        placeholder={"Quantity: "}
                        className={styles.input}
                        onChange={(e) => setFoodQuantity(e.target.values)}
                    />
                    <button 
                        className={styles.button}
                        onClick={() => handleAddFood(item)}
                        style={{ backgroundColor: "var(--main-green-medium)"}}
                    >+</button>
                    <button
                        className={styles.button}
                        onClick={() => handleRemoveFood(item)}
                        style={{ backgroundColor: "var(--main-red-medium)"}}
                    >-</button>
                </div>
            </>
            }

        </div>
    ) 
}