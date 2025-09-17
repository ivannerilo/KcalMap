import { useState, useEffect } from "react";
import CaloriesDash from "partials/dashboard/caloriesDash/CaloriesDash";
import Meal from "partials/dashboard/meal/Meal";
import styles from "./Dashboard.module.css";
import { useAuthenticate } from "contexts/AuthenticateContext";
import { useUser } from "contexts/UserContext";
import { useWindow } from "contexts/WindowContext";
import MobileHeader from "partials/dashboard/mobileHeader/MobileHeader";

export default function Dashboard() {
    const [openNewMeal, setOpenNewMeal] = useState(false);
    
    const { meals, isLoading} = useUser();
    const {isMobile} = useWindow();

    return (
        <div className={styles.dashboard}>
            {isMobile && <MobileHeader />}

            <CaloriesDash /> 

            {/* <button onClick={() => setOpenNewMeal(!openNewMeal)}>New Meal</button> 
            {openNewMeal && <NewMeal />} */}

            {meals && !isLoading && meals.map((meal) => ( 
                 <Meal key={meal.id} meal={meal}/> 
            ))} 
        </div>
    );
}