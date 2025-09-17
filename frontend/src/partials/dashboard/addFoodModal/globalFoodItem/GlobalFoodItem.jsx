import Button from "components/button/Button";
import Input from "components/form/input/Input";
import styles from "partials/dashboard/addFoodModal/globalFoodItem/GlobalFoodItem.module.css";
import { AddFoodModalContext } from "partials/dashboard/addFoodModal/AddFoodModal";
import { useContext, useState } from "react";
import { MealContext } from "partials/dashboard/meal/Meal";



export default function GlobalFoodItem({ item }){
    const meal = useContext(MealContext)
    const [quantity, setQuantity] = useState(item.default_quantity);

    return (
        <section className={styles.container}>
            <span className={styles.name}>{item.name} - {item.unit}</span>
            <div className={styles.quantityDiv}>
                <Button 
                    className={styles.button}
                    onClick={(e) => meal.handleAddLog(item, quantity)}
                >Add</Button>
            </div>
        </section>
    )
}