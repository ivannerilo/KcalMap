import styles from "../../meal/mealComponent/MealComponent.module.css";

import { useContext, useEffect, useState } from "react";
import { useUser } from "../../../contexts/UserContext";
import { MealContext } from "../../meal/Meal";
import Container from "../../../components/basicContainer/Container";
import AddFoodList from "../../addFoodList/AddFoodList";

import { FiTrash2, FiChevronDown  } from "react-icons/fi";
import BreakLine from "../../../components/breakLine/BreakLine";
import Button from "../../../components/button/Button";
import TimelineBullet from "../../../components/timelineBullet/TimelineBullet";
import MealItem from "../mealItem/MealItem";

export default function MealComponent() {
    const { mealState } = useContext(MealContext)
    const { deleteMeal } = useUser()
    const [isMealOpen, setIsMealOpen] = useState(false);
    const [isAddFoodOpen, setIsAddFoodsOpen] = useState(false)


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

            {isMealOpen && <BreakLine />}

            <TimelineBullet />

            <section className={styles.mealContent} style={{ display: isMealOpen ? "block" : "none" }}>
                <div className={styles.mealItens}>
                        {mealState?.logs.map((item, index) => {
                            <MealItem key={index} item={item} />
                        })}
                </div>

                <Button
                    className={styles.contentButton}
                    onClick={() => setIsAddFoodsOpen(!isAddFoodOpen)}
                >Add Item</Button>

                {isAddFoodOpen && <AddFoodList />}
            </section>
        </Container>
    );
}
