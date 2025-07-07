import { useState, useEffect, useRef, useContext } from "react";
import styles from "./NewMealItem.module.css";

export default function NewMealItem({ style, mealItens }) {
    const foodNameRef = useRef(null);
    const foodCaloriesRef = useRef(null);

    return (
        <div className={styles.mealItems} style={style}>
            <div>
                <p>Meal Itens</p>
                <ul>
                    {mealItens.map((item, index) => (
                        <li key={index}>{item.name}{/*  - {item.calories}Kcal */}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}