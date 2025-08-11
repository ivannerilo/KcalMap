import { useState, useEffect } from "react";
import CaloriesDash from "../../partials/caloriesDash/CaloriesDash";
import NewMeal from "../../partials/meal/newMeal/NewMeal";
import Meal from "../../partials/meal/Meal";
import styles from "./Dashboard.module.css";
import { useAuthenticate } from "../../contexts/AuthenticateContext";
import { useUser } from "../../contexts/UserContext";

export default function Dashboard() {
    const [openNewMeal, setOpenNewMeal] = useState(false);
    
    const { meals, isLoading, calories, caloriesGoal } = useUser();

    console.log(`Calories: ${calories} Calories Goal: ${caloriesGoal}`)
    return (
        <>
            <div className={styles.sidebar}>

            </div>
            <div className={styles.dashboard}>
                <div className={styles.dashContainer}>
                    {/* Dash das calorias gastas / Meta! */}
                    <CaloriesDash calories={calories} caloriesGoal={caloriesGoal} />  
                </div>

                <div className={styles.mealsContainer}>
                    {/* Renderização das refeições! */}
                    {meals && !isLoading && meals.map((meal) => ( 
                        <Meal key={meal.id} meal={meal}/> 
                    ))}
                </div>
            </div>
        </>
    );
}