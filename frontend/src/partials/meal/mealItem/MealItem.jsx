import TimelineBullet from "../../../components/timelineBullet/TimelineBullet"
import styles from "./MealItem.module.css"

export default function MealItem({ item }){
    const calories = parseInt(item.quantity) * parseFloat(item.food.calories_per_unit);

    return (
        <main className={styles.container}>
            <TimelineBullet />
            <section className={styles.item}>
                <span className={styles.food}>
                    {item.quantity} {item.food.unit} of {item.food.name}
                </span>
                <span className={styles.calories}>
                    {calories} Kcal
                </span>
            </section>
        </main>
    )
}
