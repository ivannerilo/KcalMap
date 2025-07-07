import { useState } from "react";
import styles from "./NewMeal.module.css";

export default function NewMeal({ setMeals }) {
    const [mealName, setMealName] = useState("");
    

    function handleCreateMeal(event) {
        event.preventDefault();
        setMeals((prevMeals) => [...prevMeals, { id: prevMeals.length + 1, name: mealName, itens: [] }]);
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