import {forwardRef, useContext, useState} from "react";
import styles from "./FoodItem.module.css";


const FoodItem = forwardRef(({ item }, ref) => {
    console.log("item", item)
    return (
        <section className={styles.container} ref={ref}>
            <span className={styles.name}>{item.name}</span>
            <div className={styles.quantityDiv}>
                <span className={styles.unit}>
                    <strong style={{ color: "var(--accent)"}}>{item?.calories_per_unit.toFixed(1)} </strong>
                    Kcal - {item.unit}
                </span>
            </div>
        </section>
    )
});

export default FoodItem