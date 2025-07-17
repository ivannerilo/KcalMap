import { useState, useContext } from "react";
import styles from "./NewMealItem.module.css";
import { MealContext } from "../meal/Meal";
import AddFoodList from "../addFoodList/AddFoodList";

export default function MealContent({ style }) {
    const meal = useContext(MealContext)

    const [isAddFoodOpen, setIsAddFoodsOpen] = useState(false)

    return (
        <div className={styles.mealItems} style={style}>
            <div>
                <p>Consumed:</p>
                <ul>
                    {meal?.logs.map((item, index) => (
                        <li key={index}>Qtd:{item.quantity} Food:{item.food}</li>
                    ))}
                </ul>
                <button onClick={() => setIsAddFoodsOpen(!isAddFoodOpen)}>Add Item</button>
                {isAddFoodOpen && <AddFoodList />}
            </div>
        </div>
    );
}