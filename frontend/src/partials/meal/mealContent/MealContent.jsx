import { useState, useContext } from "react";
import styles from "./NewMealItem.module.css";
import { MealContext } from "../Meal";
import AddFoodList from "../../addFoodList/AddFoodList";

export default function MealContent({ style }) {
    const { mealState } = useContext(MealContext)

    const [isAddFoodOpen, setIsAddFoodsOpen] = useState(false)

    return (
        <div className={styles.mealItems} style={style}>
            <div>
                <p>Consumed:</p>
                <ul>
                    {mealState?.logs.map((item, index) => {
                        const calories = parseInt(item.quantity) * parseFloat(item.food.calories_per_unit)
                        return <li key={index}>{item.quantity}{item.food.unit} of {item.food.name} = {calories}Cal</li>
                    })}
                </ul>
                <button onClick={() => setIsAddFoodsOpen(!isAddFoodOpen)}>Add Item</button>
                {isAddFoodOpen && <AddFoodList />}
            </div>
        </div>
    );
}