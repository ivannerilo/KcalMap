// src/partials/caloriesDash/CaloriesDash.js

import styles from "./CaloriesDash.module.css";

export default function CaloriesDash({ calories, caloriesGoal }) {
    // --- SUA LÓGICA (INTACTA) ---
    const caloriesPercentage = Math.round((calories / caloriesGoal) * 100);
    // --- FIM DA SUA LÓGICA ---

    // --- NOVA ESTRUTURA JSX ---
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
                {/* DESAFIO DE LÓGICA PARA VOCÊ:
                    A largura da barra abaixo é controlada pela variável 'caloriesPercentage'.
                    Atualmente, ela muda instantaneamente. Um desafio seria criar um custom hook
                    (ex: useAnimatedValue) que fizesse o número e a barra crescerem suavemente
                    de 0 até o valor final quando o componente carrega.
                */}
                <div 
                    className={styles.progressBar} 
                    style={{ width: `${caloriesPercentage}%` }}
                >
                </div>
            </div>
        </section>
    );
}
