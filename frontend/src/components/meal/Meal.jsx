import { useState, useContext } from "react";
import NewMealItem from "../newMealItem/NewMealItem";
import styles from "./Meal.module.css";
import { MealsContext } from "../../pages/dashboard/Dashboard";

export default function Meal() {
    const [isMealOpen, setIsMealOpen] = useState(false);
    const {meal} = useContext(MealsContext);

    return (
        <div className={styles.mealContainer}>
            <div className={styles.mealDiv}>
                <h1>{meal.name}</h1>    
                <button onClick={() => setIsMealOpen(!isMealOpen)}>Open Meal</button>
            </div>
            <NewMealItem style={{ display: isMealOpen ? "block" : "none" }} />
        </div>
    );
}