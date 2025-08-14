// seu componente MealContent.js

import { useState, useContext } from "react";
import styles from "./MealContent.module.css"; // Usaremos um novo CSS
import { MealContext } from "../Meal";
import AddFoodList from "../../addFoodList/AddFoodList";

// Ícone SVG para o botão
const PlusIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="5" x2="12" y2="19"></line>
        <line x1="5" y1="12" x2="19" y2="12"></line>
    </svg>
);

export default function MealContent() {
    // --- SUA LÓGICA (INTACTA) ---
    const { mealState } = useContext(MealContext);
    const [isAddFoodOpen, setIsAddFoodsOpen] = useState(false);
    // --- FIM DA SUA LÓGICA ---

    // --- NOVA ESTRUTURA JSX ---
    return (
        <div className={styles.contentContainer}>
            <div className={styles.logList}>
                {mealState?.logs && mealState.logs.length > 0 ? (
                    mealState.logs.map((item, index) => {
                        const calories = parseInt(item.quantity) * parseFloat(item.food.calories_per_unit);
                        return (
                            <div key={index} className={styles.logItem}>
                                <span className={styles.foodName}>
                                    {item.quantity}{item.food.unit} de {item.food.name}
                                </span>
                                <span className={styles.foodCalories}>
                                    {Math.round(calories)} kcal
                                </span>
                            </div>
                        );
                    })
                ) : (
                    <p className={styles.emptyMessage}>Nenhum item registrado nesta refeição ainda.</p>
                )}
            </div>

            <hr className={styles.separator} />

            <div className={styles.addFoodSection}>
                {isAddFoodOpen ? (
                    <AddFoodList />
                ) : (
                    <button className={styles.addButton} onClick={() => setIsAddFoodsOpen(true)}>
                        <PlusIcon />
                        Adicionar Alimento
                    </button>
                )}
            </div>
        </div>
    );
}
