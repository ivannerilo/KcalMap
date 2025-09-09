import { useEffect, useState, createContext, useContext } from "react";
import { useAuthenticate } from "./AuthenticateContext";
import { useFetch } from "../hooks/useFetch"

const InternalContext = createContext()

export function UserContext({ children }){

    //Meals States
    const [meals, setMeals] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { isAuthenticated } = useAuthenticate();
    const { authFetch } = useFetch()

    // Calories States: 
    const [calories, setCalories] = useState(300);
    const [caloriesGoal, setCaloriesGoal] = useState(0);
    const [logHistory, setLogHistory] = useState([])

    // Calories Functions
    async function getCaloriesGoal() {
        try {
            let response = await authFetch("http://localhost:8000/api/calories", {
                method: "GET"
            })
            if (!response.ok) {
                throw Error(response.message)
            }

            let data = await response.json()

            setCaloriesGoal(data.result)
        } catch(e) {
            console.log(e.message)
        }
    }

    async function createProfile(height, weight, sex, age, goal) {
        try {
            let response = await authFetch("http://localhost:8000/api/profile", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    height: height,
                    weight: weight,
                    sex: sex,
                    age: age,
                    goal: goal,
                }) 
            })

            if (!response.ok) {
                throw Error(response.message)
            }

            let data = await response.json()

            setCaloriesGoal(goal);
            return {ok: true, result: data.result}
        } catch(e) {
            return {ok: false, message: e.message}
        }
    }
    
    
    function calculateCalories(meals){
        if (meals) {
            let cals = 0;
            meals.forEach(meal => {
                meal.logs.forEach(log => {
                    cals += parseFloat(log.quantity) * parseFloat(log.food.calories_per_unit)
                })
            });
            setCalories(cals)
        }
    }

    useEffect(() => {
        getCaloriesGoal();
    }, [])



    // Meals Functions:
    async function getMeals() {
        setIsLoading(true);
        try {
            let response = await authFetch("http://localhost:8000/api/meals")
            
            if (!response.ok) { 
                throw Error(response.message);
            }
            
            let data = await response.json()
    
            setMeals(data.result);
            calculateCalories(data.result);
            setIsLoading(false);
        } catch(error) {
            console.log("error", error)
        }
    }

    async function createMeal(name) {
        try {
            let response = await authFetch("http://localhost:8000/api/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: name
                })
            })
            
            if (!response.ok){
                throw Error(response.message)
            }

            let data = await response.json()

            await getMeals()

            return data
        } catch (e) {
            console.log("error", e.message)
            throw Error(e.message)
        }
    }

    async function deleteMeal(mealId) {
        try {
            let response = await authFetch("http://localhost:8000/api/delete", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id: mealId 
                })
            })
            
            if (!response.ok){
                throw Error(response.message)
            }

            let data = await response.json()

            await getMeals()

            return data
        } catch (e) {
            console.log("error", e.message)
            return e.message
        }
    }

    async function addTemplateFood(foodId, mealId) {
        try {
            let response = await authFetch("http://localhost:8000/api/template", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    mealId: mealId,
                    foodId: foodId
                })
            })
            
            if (!response.ok){
                throw Error(response.message)
            }

            let data = await response.json()

            return data
        } catch (e) {
            console.log("error", e.message)
            return e.message
        }
    }

    function updateMeals(meal) {
        setMeals((prevMeals) => {
            return prevMeals.map((mealItem) => {
                if (mealItem.id === meal.id) {
                    return meal
                }
                return mealItem
            })
        })
    }

    useEffect(() => {
        calculateCalories(meals)
    }, [meals])


    useEffect(() => {
        async function startMeals() {
            if (isAuthenticated) {
                await getMeals();  
                setIsLoading(false);
            }
        }
        startMeals();
    }, [isAuthenticated])

    const contextValue = {
        // Meals
        meals,
        updateMeals, 
        isLoading, 
        createMeal, 
        deleteMeal, 
        addTemplateFood,

        //Calories 
        calories,
        calculateCalories,
        caloriesGoal,
        createProfile,
    }
    return(
        <InternalContext.Provider value={contextValue}>
            {children}
        </InternalContext.Provider>
    )
}

export function useUser(){
    return useContext(InternalContext)
}