import styles from "./MealComponent.module.css";

import { useContext, useState } from "react";
import { useUser } from "../../../contexts/UserContext";
import MealContent from "../mealContent/MealContent";
import { MealContext } from "../Meal";

export default function MealComponent() {
    const { mealState } = useContext(MealContext)
    const { deleteMeal } = useUser()
    const [isMealOpen, setIsMealOpen] = useState(false);


    function hanldeDeleteMeal(id) {
        deleteMeal(id)
    }
   
    return (
        <div className={styles.mealContainer}>

            <div className={styles.mealDiv} onClick={() => setIsMealOpen(!isMealOpen)}>
                <h1>{mealState.name}</h1>    
                {/* <button onClick={() => hanldeDeleteMeal(mealState.id)}>Delete Meal</button> */}
            </div>

            {isMealOpen && <div className={styles.dummyDiv}></div>}

            <MealContent 
                style={{ display: isMealOpen ? "block" : "none" }} 
            />
        </div>
    );
}