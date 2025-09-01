import { use, useEffect, useRef, useState } from "react";
import { useUser } from "../../contexts/UserContext";
import styles from "./CaloriesDash.module.css";

export default function CaloriesDash() {
    const {calories, caloriesGoal} = useUser();
    const [insideBarWidth, setInsideBarWidth] = useState(0);
    const [externalBarWidth, setExternalBarWidth] = useState(0);
    
    const barRef = useRef(null);
    
    useEffect(() => {
        const {width} = barRef.current.getBoundingClientRect();
        const caloriesPercentage = calories / caloriesGoal;
        setInsideBarWidth(Math.round(width * caloriesPercentage));
        setExternalBarWidth(width);
    }, [calories, caloriesGoal])

    return (
        <main className={styles.container}>
            <section className={styles.header}>
                <span className={styles.headerTitle}>
                    Resumo do dia:
                </span>
                <div className={styles.calories}>
                    <p>{calories}</p>
                    <span>/ {caloriesGoal} kcal</span>
                </div>
            </section>
            
            <div ref={barRef} className={styles.externalBar}>
                <div 
                    className={styles.insideBar}
                    style={{
                        width: `${insideBarWidth}px`,
                        maxWidth: `${externalBarWidth}px`
                    }}
                ></div>
            </div>
        </main>
    );
}