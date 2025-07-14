import { useState, useEffect } from "react";
import CaloriesDash from "../../components/caloriesDash/CaloriesDash";
import NewMeal from "../../components/newMeal/NewMeal";
import Meal from "../../components/meal/Meal";
import styles from "./Dashboard.module.css";
import { useAuthenticate } from "../../contexts/AuthenticateContext";
import { useMeals } from "../../contexts/MealsContext";

export default function Dashboard() {
    const [caloriesGoal, setCaloriesGoal] = useState(1000);
    const [openNewMeal, setOpenNewMeal] = useState(false);
    
    const { meals, isLoading, createMeal } = useMeals();

    const calories = 1000;

/*     const calories = useMemo(() => {
        let caloriesConsumed = 0
        meals.forEach(meal => {
            caloriesConsumed = meal.itens.reduce((cals, mealItem) => {
                console.log(`Cals acc ${cals}, mealCalIte ${mealItem.calories}`)
                return Number(cals) + Number(mealItem.calories)
            }, caloriesConsumed)
        })
        console.log(`caloriesConsumed`, caloriesConsumed)
        return caloriesConsumed
    }, [meals]) */

    useEffect(() => {
        fetch("http://localhost:8000/api/calories")
        .then((response) => response.json())
        .then((data) => {
            /* setCalories(data.calories_consumed); */
            setCaloriesGoal(data.calories_goal);
        });
    }, []);


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