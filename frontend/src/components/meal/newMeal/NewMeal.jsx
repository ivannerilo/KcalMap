import { useRef, useState } from "react";
import styles from "./NewMeal.module.css";

export default function NewMeal({ createMeal }) {
    const [mealName, setMealName] = useState("");
    const inputRef = useRef(null);
    

    async function handleCreateMeal(event) {
        event.preventDefault();
        let response = await createMeal(mealName)
        
        if (!response.ok) {
            console.log(response.message);
        }

        let data = await response.json()
        console.log(data.message)
    }

    return (
        <div className={styles.newMealDiv}>
            <form onSubmit={handleCreateMeal}>
                <input 
                    type="text" 
                    placeholder="Meal Name" 
                    value={mealName} 
                    onChange={(e) => setMealName(e.target.value)}
                    ref={inputRef}
                />
                <button 
                    type="submit"
                >Create Meal</button>
            </form>
        </div>
    );
}