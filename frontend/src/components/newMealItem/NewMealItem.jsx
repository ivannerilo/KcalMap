import { useState, useEffect, useRef, useContext } from "react";
import { MealsContext } from "../../pages/dashboard/Dashboard";
import styles from "./NewMealItem.module.css";

export default function NewMealItem({ style }) {
    const {meal, setMeals} = useContext(MealsContext);
    const [foodName, setFoodName] = useState("");
    const [foodCalories, setFoodCalories] = useState(0);
    const [mealItens, setMealItens] = useState(meal.itens);

    const foodNameRef = useRef(null);
    const foodCaloriesRef = useRef(null);

    const addItem = () => {
        setMeals((prevMeals) => {
            const newMeals = [...prevMeals]

            console.log(prevMeals)
            let index = newMeals.findIndex((m) => {
                return m.id === meal.id
            })
            newMeals[index].itens.push({name: foodName, calories: foodCalories})
            setMealItens(newMeals[index].itens)
            return newMeals
        })
    }
    
    function handleSubmit(event) {
        event.preventDefault();
        console.log("submit");
        foodNameRef.current.value = "";
        foodCaloriesRef.current.value = "";
    }

    return (
        <div className={styles.mealItems} style={style}>
            <form id="new-meal-form" onSubmit={handleSubmit} className={styles.NewMealItem}>
                <input type="text" ref={foodNameRef} placeholder="Add Item" onChange={(e) => setFoodName(e.target.value)} />
                <input type="number" ref={foodCaloriesRef} placeholder="Add Calories" onChange={(e) => setFoodCalories(e.target.value)} />
                <button onClick={addItem}>Add Item</button>
            </form>
            <div>
                <p>Meal Itens</p>
                <ul>
                    {mealItens.map((item, index) => (
                        <li key={index}>{item.name} - {item.calories}Kcal</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}