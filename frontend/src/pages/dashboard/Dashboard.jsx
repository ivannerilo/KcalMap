import { useState, useEffect, createContext, useMemo } from "react";
import CaloriesDash from "../../components/caloriesDash/CaloriesDash";
import NewMeal from "../../components/newMeal/NewMeal";
import Meal from "../../components/meal/Meal";
import styles from "./Dashboard.module.css";
const MealsContext = createContext();

export default function Dashboard() {
    const [meals, setMeals] = useState([]);
    const [caloriesGoal, setCaloriesGoal] = useState(1000);
    const [openNewMeal, setOpenNewMeal] = useState(false);

    const calories = useMemo(() => {
        let caloriesConsumed = 0
        meals.forEach(meal => {
            caloriesConsumed = meal.itens.reduce((cals, mealItem) => {
                console.log(`Cals acc ${cals}, mealCalIte ${mealItem.calories}`)
                return Number(cals) + Number(mealItem.calories)
            }, caloriesConsumed)
        })
        console.log(`caloriesConsumed`, caloriesConsumed)
        return caloriesConsumed
    }, [meals])

    useEffect(() => {
        fetch("http://localhost:8000/api/calories/")
        .then((response) => response.json())
        .then((data) => {
            /* setCalories(data.calories_consumed); */
            setCaloriesGoal(data.calories_goal);
        });
    }, []);

    useEffect(() => {
        fetch("http://localhost:8000/api/meals/")
        .then((response) => response.json())
        .then((data) => {
            setMeals(data.meals);
        }); 
    }, []);



    return (
        <div className={styles.dashboard}>

            {/* Dash das calorias gastas / Meta! */}
            <CaloriesDash calories={calories} caloriesGoal={caloriesGoal} />  

            {/* Botão para abrir o formulário de nova refeição! */}
            <button onClick={() => setOpenNewMeal(!openNewMeal)}>New Meal</button> 
            {/* // Formulário de nova refeição! */}
            {openNewMeal && <NewMeal setMeals={setMeals} />} 

            {/* Renderização das refeições! */}
            {meals.map((meal) => ( 
                <MealsContext.Provider value={{meal: meal, setMeals: setMeals}}>
                    <Meal key={meal.id} /> 
                </MealsContext.Provider>
            ))}

        </div>
    );
}

export { MealsContext };