import { useState, useEffect } from "react";
import CaloriesDash from "partials/dashboard/caloriesDash/CaloriesDash";
import Meal from "partials/dashboard/meal/Meal";
import { useAuthenticate } from "contexts/AuthenticateContext";
import { useUser } from "contexts/UserContext";
import { useWindow } from "contexts/WindowContext";
import MobileHeader from "partials/dashboard/mobileHeader/MobileHeader";

export default function Dashboard() {
    const { meals, isLoading} = useUser();
    const {isMobile} = useWindow();

    return (
        <>
            {isMobile && <MobileHeader />}

            <CaloriesDash /> 

            {meals && !isLoading && meals.map((meal) => ( 
                 <Meal key={meal.id} meal={meal}/> 
            ))} 
        </>
    );
}