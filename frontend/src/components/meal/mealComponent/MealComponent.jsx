import styles from "../../meal/Meal.module.css";

import { useContext, useState } from "react";
import { useMeals } from "../../../contexts/MealsContext";
import MealContent from "../../mealContent/MealContent";
import { MealContext } from "../../meal/Meal";

export default function MealComponent() {
    const meal = useContext(MealContext)
    const { deleteMeal } = useMeals()
    const [isMealOpen, setIsMealOpen] = useState(false);


    function hanldeDeleteMeal(id) {
        deleteMeal(id)
    }
   
    return (
        <div className={styles.mealContainer}>
            <div className={styles.mealDiv}>
                <h1>{meal.name}</h1>    
                <button onClick={() => setIsMealOpen(!isMealOpen)}>Open Meal</button>
                <button onClick={() => hanldeDeleteMeal(meal.id)}>Delete Meal</button>
            </div>
            <MealContent style={{ display: isMealOpen ? "block" : "none" }} />
        </div>
    );
}