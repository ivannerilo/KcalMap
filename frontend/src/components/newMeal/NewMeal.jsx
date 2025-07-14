import { useState } from "react";
import styles from "./NewMeal.module.css";

export default function NewMeal({ createMeal }) {
    const [mealName, setMealName] = useState("");
    

    async function handleCreateMeal(event) {
        event.preventDefault();
        createMeal(mealName)
        .then(response => console.log(response));
    }

    return (
        <div className={styles.newMealDiv}>
            <form onSubmit={handleCreateMeal}>
                <input type="text" placeholder="Meal Name" value={mealName} onChange={(e) => setMealName(e.target.value)} />
                <button type="submit">Create Meal</button>
            </form>
        </div>
    );
}