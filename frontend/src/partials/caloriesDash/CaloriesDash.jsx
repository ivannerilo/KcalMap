
import styles from "./CaloriesDash.module.css";

export default function CaloriesDash({ calories, caloriesGoal }) {
    // TODO: Adicionar o progresso da barra.
    const caloriesPercentage = Math.round((calories / caloriesGoal) * 100);
    return (
        <section className={styles.dashContainer}>
            <div className={styles.header}>
                <h2 className={styles.title}>Resumo do Dia</h2>
                <div className={styles.caloriesInfo}>
                    <span className={styles.caloriesConsumed}>{Math.round(calories)}</span>
                    <span className={styles.caloriesGoal}>/ {caloriesGoal} kcal</span>
                </div>
            </div>
            
            <div className={styles.progressBarContainer}>
                <div 
                    className={styles.progressBar} 
                    style={{ width: `${caloriesPercentage}%` }}
                >
                </div>
            </div>
        </section>
    );
}
