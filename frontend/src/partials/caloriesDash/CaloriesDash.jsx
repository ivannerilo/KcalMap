import { useEffect, useState } from "react";
import styles from "./CaloriesDash.module.css";

export default function CaloriesDash({ calories, caloriesGoal }) {
    const caloriesPercentage = Math.round((calories / caloriesGoal) * 100);
    const [insideBarSize, setInsideBarSize] = useState(0);
    const barSize = 696

    useEffect(() => {
        setInsideBarSize((prev) => {
            const size = Math.round((caloriesPercentage / 100) * barSize)
            return size > barSize ? 696 : size
        })
    }, [caloriesPercentage])
    
    return (
        <div className={styles.caloriesDashDiv}>
            <div className={styles.textDiv}>
                <h1>Calories Dash: {calories.toFixed(2)}Kcal</h1>
                <p>You have consumed {caloriesPercentage}% of your {caloriesGoal}Kcal calories goal today!</p> 
            </div>
            <div className={styles.barDiv}>
                <div className={styles.bar}>
                <div className={styles.insideBar}
                    style={{ width: `${insideBarSize}px`}}
                >
                </div>
                </div>
            </div>
        </div>
    );
}