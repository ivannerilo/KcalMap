import styles from "partials/dashboard/meal/mealComponent/MealComponent.module.css";

import { useContext, useEffect, useState } from "react";
import { useUser } from "contexts/UserContext";
import { MealContext } from "partials/dashboard/meal/Meal";
import Container from "components/basicContainer/Container";
import AddFoodModal from "partials/dashboard/addFoodModal/AddFoodModal";

import { FiTrash2, FiChevronDown  } from "react-icons/fi";
import BreakLine from "components/breakLine/BreakLine";
import Button from "components/button/Button";
import TimelineBullet from "components/timelineBullet/TimelineBullet";
import MealItem from "partials/dashboard/mealItem/MealItem";
import {usePopup} from "../../../../contexts/PopupContext";

export default function MealComponent() {
    const { mealState } = useContext(MealContext);
    const { deleteMeal } = useUser();
    const {openPopup} = usePopup();
    const [isMealOpen, setIsMealOpen] = useState(false);
    const [isAddFoodOpen, setIsAddFoodsOpen] = useState(false);

    async function hanldeDeleteMeal(id) {
        const response = await deleteMeal(id);
        if (!response.ok) {
            openPopup(response.message, "error");
        } else {
            openPopup("Meal deleted successfully!", "success");
        }
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


            <section className={styles.mealContent} style={{ display: isMealOpen ? "flex" : "none" }}>
                <div className={styles.mealItens}>
                        {mealState?.food_log.map((item, index) => {
                            return <MealItem key={index} item={item} />
                        })}
                </div>

                <Button
                    className={styles.contentButton}
                    onClick={() => setIsAddFoodsOpen(true)}
                >Add Item</Button>

                {isAddFoodOpen && <AddFoodModal setModalOpen={setIsAddFoodsOpen} isAddFoodOpen={isAddFoodOpen}/>}
            </section>
        </Container>
    );
}
