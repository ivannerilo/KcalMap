
import { useState, useEffect } from "react";
import styles from "./Dashboard.module.css";
import { useUser } from "../../contexts/UserContext";

import Sidebar from "../../components/sidebar/Sidebar";
import CaloriesDash from "../../partials/caloriesDash/CaloriesDash";
import NewMeal from "../../partials/meal/newMeal/NewMeal";
import Meal from "../../partials/meal/Meal";

export default function Dashboard() {
    const [openNewMeal, setOpenNewMeal] = useState(false);
    const { meals, isLoading, calories, caloriesGoal } = useUser();
    console.log(`Calories: ${calories} Calories Goal: ${caloriesGoal}`);

    return (
        <div className={styles.dashboardLayout}>
            <Sidebar />

            <main className={styles.mainContent}>
                <CaloriesDash calories={calories} caloriesGoal={caloriesGoal} />  

                <button className={styles.newMealButton} onClick={() => setOpenNewMeal(!openNewMeal)}>
                    {openNewMeal ? 'Cancelar' : 'Adicionar Refeição'}
                </button> 
                
                {openNewMeal && <NewMeal onMealCreated={() => setOpenNewMeal(false)} />} 

                <div className={styles.mealsContainer}>
                    {meals && !isLoading && meals.map((meal) => ( 
                        <Meal key={meal.id} meal={meal}/> 
                    ))}
                </div>
            </main>
        </div>
    );
}
