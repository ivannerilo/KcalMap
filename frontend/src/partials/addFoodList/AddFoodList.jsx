import { useContext, useEffect, useRef, useState } from "react";
import { MealContext } from "../meal/Meal";
import { useUser } from "../../contexts/UserContext";
import { useFood } from "../../contexts/FoodContext";
import styles from "./AddFoodList.module.css";

const SearchIcon = () => (
    <svg className={styles.searchIcon} xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
);

export default function AddFoodList() {
    const meal = useContext(MealContext);
    const meals = useUser();
    const { getGlobalFoods, addFoodLog, removeFoodLog } = useFood();
    const inputRef = useRef(null);
    const [foodQuantity, setFoodQuantity] = useState();
    const [foodOptions, setFoodOptions] = useState([]);
    const [isAddNewTemplateFoodOpen, setIsAddNewTemplateFoodOpen] = useState();
    const [newTemplateFoodId, setNewTemplateFoodId] = useState();

    async function handleAddFood(item) {
        try {
            let response = await addFoodLog(item.id, foodQuantity, meal.mealState.id);
            inputRef.current.value = "";
            meal.setNewMealLog(response.result);
        } catch (e) {
            console.log("Erro!", e.message);
        }
    }

    async function handleRemoveFood(item) {
        try {
            let response = await removeFoodLog(item.id, foodQuantity, meal.mealState.id);
            inputRef.current.value = "";
            meal.removeMealLog(response.result);
        } catch (e) {
            console.log("Erro!", e.message);
        }
    }

    async function handleSubmit(e) {
        try {
            e.preventDefault();
            let response = await meals.addTemplateFood(newTemplateFoodId, meal.mealState.id);
            meal.setNewMealItem(response.result);
        } catch (e) {
            console.log("Erro!", e.message);
        }
    }

    useEffect(() => {
        async function setFoods() {
            let response = await getGlobalFoods();
            setFoodOptions(response.foods);
        }
        setFoods();
    }, []);

    return (
        <div className={styles.addFoodContainer}>
            <div className={styles.searchWrapper}>
                <SearchIcon />
                <input
                    type="text"
                    placeholder="Busque um alimento..."
                    className={styles.searchInput}
                />
            </div>

            <div className={styles.resultsList}>
                
                {foodOptions.map(food => (
                    <div key={food.id} className={styles.foodItem}>
                        <span className={styles.foodName}>{food.name}</span>
                        <div className={styles.actions}>
                            <input
                                type="number"
                                placeholder={food.default_quantity}
                                className={styles.quantityInput}
                                onChange={(e) => setFoodQuantity(e.target.value)}
                            />
                            <span className={styles.unitLabel}>{food.unit}</span>
                            <button 
                                className={styles.addButton} 
                                onClick={() => handleAddFood(food)}
                            >
                                +
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
