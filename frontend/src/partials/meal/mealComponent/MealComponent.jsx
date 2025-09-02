import styles from "../../meal/mealComponent/MealComponent.module.css";

import { useContext, useState } from "react";
import { useUser } from "../../../contexts/UserContext";
import MealContent from "../mealContent/MealContent";
import { MealContext } from "../../meal/Meal";
import Container from "../../../components/basicContainer/Container";

import { FiTrash2, FiChevronDown  } from "react-icons/fi";

export default function MealComponent() {
    const { mealState } = useContext(MealContext)
    const { deleteMeal } = useUser()
    const [isMealOpen, setIsMealOpen] = useState(false);


    function hanldeDeleteMeal(id) {
        deleteMeal(id)
    }
   
    return (
        <Container className={styles.mealContainer}>
            <section  className={styles.titleContainer}>
                <span className={styles.name}>{mealState.name}</span>
                <FiTrash2
                    className={styles.icon}
                    onClick={() => hanldeDeleteMeal(mealState.id)}
                />
                <FiChevronDown
                    className={`${isMealOpen ? styles.chevronIconUp : ""} ${styles.icon}`}
                    onClick={() => setIsMealOpen(!isMealOpen)} 
                />
            </section>
            <MealContent style={{ display: isMealOpen ? "block" : "none" }} />
        </Container>
    );
}