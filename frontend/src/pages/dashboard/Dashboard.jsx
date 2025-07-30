import { useState, useEffect } from "react";
import CaloriesDash from "../../components/caloriesDash/CaloriesDash";
import NewMeal from "../../components/meal/newMeal/NewMeal";
import Meal from "../../components/meal/Meal";
import styles from "./Dashboard.module.css";
import { useAuthenticate } from "../../contexts/AuthenticateContext";
import { useMeals } from "../../contexts/MealsContext";
import { useCalories } from "../../contexts/CaloriesContext";

export default function Dashboard() {
    const [openNewMeal, setOpenNewMeal] = useState(false);
    
    const { meals, isLoading, createMeal } = useMeals();
    const { calories, caloriesGoal } = useCalories();

    console.log(`Calories: ${calories} Calories Goal: ${caloriesGoal}`)
    return (
        <div className={styles.dashboard}>

            {/* Dash das calorias gastas / Meta! */}
            <CaloriesDash calories={calories} caloriesGoal={caloriesGoal} />  

            {/* Botão para abrir o formulário de nova refeição! */}
            <button onClick={() => setOpenNewMeal(!openNewMeal)}>New Meal</button> 
            {/* // Formulário de nova refeição! */}
            {openNewMeal && <NewMeal createMeal={createMeal} />} 

            {/* Renderização das refeições! */}
            {meals && !isLoading && meals.map((meal) => ( 
                <Meal key={meal.id} meal={meal}/> 
            ))}

        </div>
    );
}