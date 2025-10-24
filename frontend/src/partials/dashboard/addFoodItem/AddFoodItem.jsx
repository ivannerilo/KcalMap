import Button from "components/button/Button";
import Input from "components/input/Input";
import styles from "./AddFoodItem.module.css";
import { AddFoodModalContext } from "partials/dashboard/addFoodModal/AddFoodModal";
import { forwardRef, useContext, useState } from "react";
import { MealContext } from "partials/dashboard/meal/Meal";



const AddFoodItem = forwardRef(({ item }, ref) => {
    const meal = useContext(MealContext)
    const [quantity, setQuantity] = useState(item.default_quantity);

    return (
        <section className={styles.container} ref={ref}>
            <span className={styles.name}>{item.name}</span>
            <div className={styles.quantityDiv}>
                <Input
                    className={styles.quantityInput}
                    placeholder={"eg. 100"}
                    onChange={(e) => setQuantity(e.target.value)}
                    defaultValue={item.default_quantity}
                />
                <span className={styles.unit}>{item.unit}</span>
                <Button 
                    className={styles.button}
                    onClick={(e) => meal.handleAddLog(item, quantity)}
                >+</Button>
            </div>
        </section>
    )
});

export default AddFoodItem