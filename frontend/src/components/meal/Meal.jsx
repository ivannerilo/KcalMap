import styles from "./Meal.module.css";

import { useState } from "react";
import NewMealItem from "../newMealItem/NewMealItem";

export default function Meal({ meal }) {
    const [isMealOpen, setIsMealOpen] = useState(false);
   
    return (
        <div className={styles.mealContainer}>
            <div className={styles.mealDiv}>
                <h1>{meal.name}</h1>    
                <button onClick={() => setIsMealOpen(!isMealOpen)}>Open Meal</button>
            </div>
            <NewMealItem style={{ display: isMealOpen ? "block" : "none" }} mealItens={meal.itens} />
        </div>
    );
}