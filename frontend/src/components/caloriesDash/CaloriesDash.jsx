import styles from "./CaloriesDash.module.css";

export default function CaloriesDash({ calories, caloriesGoal }) {

    const caloriesPercentage = Math.round((calories / caloriesGoal) * 100);

    return (
        <div className={styles.caloriesDashDiv}>
            <h1>Calories Dash: {calories.toFixed(2)}Kcal</h1>
            <p>You have consumed {caloriesPercentage}% of your {caloriesGoal}Kcal calories goal today!</p>
        </div>
    );
}