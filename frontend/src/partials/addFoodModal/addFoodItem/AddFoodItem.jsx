import Button from "../../../components/button/Button";
import Input from "../../../components/form/input/Input";
import styles from "./AddFoodItem.module.css";
import { AddFoodModalContext } from "../AddFoodModal";
import { useContext, useState } from "react";
import { MealContext } from "../../meal/Meal";



export default function AddFoodItem({ item }){
    const meal = useContext(MealContext)
    const [quantity, setQuantity] = useState(item.default_quantity);

    return (
        <section className={styles.container}>
            <span className={styles.name}>{item.food.name}</span>
            <div className={styles.quantityDiv}>
                <Input
                    className={styles.quantityInput}
                    placeholder={"eg. 100"}
                    onChange={(e) => setQuantity(e.target.value)}
                    defaultValue={item.food.default_quantity}
                />
                <span className={styles.unit}>{item.food.unit}</span>
                <Button 
                    className={styles.button}
                    onClick={(e) => meal.handleAddFood(item, quantity)}
                >+</Button>
            </div>
        </section>
    )
}