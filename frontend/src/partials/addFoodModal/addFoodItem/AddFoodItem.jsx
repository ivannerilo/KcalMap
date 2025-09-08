import Button from "../../../components/button/Button";
import Input from "../../../components/form/input/Input";
import styles from "./AddFoodItem.module.css";
import { AddFoodModalContext } from "../AddFoodModal";
import { useContext, useState } from "react";



export default function AddFoodItem({ item }){
    const {handleAddFood, handleRemoveFood} = useContext(AddFoodModalContext);
    const [quantity, setQuantity] = useState(item.default_quantity);

    return (
        <section className={styles.container}>
            <span className={styles.name}>{item.name}</span>
            <div className={styles.quantityDiv}>
                <Input
                    className={styles.quantityInput}
                    placeholder={"eg. 100"}
                    onChangee={(e) => setQuantity(e.target.value)}
                    defaultValue={item.default_quantity}
                />
                <span className={styles.unit}>{item.unit}</span>
                <Button 
                    className={styles.button}
                    onClick={(e) => handleAddFood(item, quantity)}
                >+</Button>
            </div>
        </section>
    )
}