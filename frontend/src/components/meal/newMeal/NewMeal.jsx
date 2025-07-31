import { useRef, useState } from "react";
import styles from "./NewMeal.module.css";
import { useUser } from "../../../contexts/UserContext";

export default function NewMeal() {
    const [mealName, setMealName] = useState("");
    const inputRef = useRef(null);
    const { createMeal } = useUser();
    

    async function handleCreateMeal(event) {
        try {
            event.preventDefault();
            let response = await createMeal(mealName)
    
            console.log(response.message)
        } catch(e) {
            console.log(e.message)
        }
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