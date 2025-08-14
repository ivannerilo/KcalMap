import { useRef, useState } from "react";
import styles from "./NewMeal.module.css";
import { useUser } from "../../../contexts/UserContext";

export default function NewMeal({ onMealCreated }) { 
    const [mealName, setMealName] = useState("");
    const inputRef = useRef(null);
    const { createMeal } = useUser();
    
    async function handleCreateMeal(event) {
        try {
            event.preventDefault();
            let response = await createMeal(mealName);
            console.log(response.message);
            
            if (response.ok && onMealCreated) {
                onMealCreated();
            }
        } catch(e) {
            console.log(e.message);
        }
    }
    return (
        <div className={styles.newMealContainer}>
            <h3 className={styles.title}>Criar Nova Refeição</h3>
            <form className={styles.form} onSubmit={handleCreateMeal}>
                <input 
                    className={styles.input}
                    type="text" 
                    placeholder="Ex: Lanche da Tarde" 
                    value={mealName} 
                    onChange={(e) => setMealName(e.target.value)}
                    ref={inputRef}
                    required
                />
                <button 
                    type="submit"
                    className={styles.button}
                >
                    Criar
                </button>
            </form>
        </div>
    );
}
