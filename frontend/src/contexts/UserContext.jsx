import { useEffect, useState, createContext, useContext, useMemo } from "react";
import { useAuthenticate } from "contexts/AuthenticateContext";
import { useFetch } from "hooks/useFetch"

const InternalContext = createContext()

export function UserContext({ children }){

    //Meals States
    const [meals, setMeals] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { isAuthenticated } = useAuthenticate();
    const { authFetch } = useFetch()

    // Calories States: 
    const [caloriesGoal, setCaloriesGoal] = useState(0);

    // Calories Functions
    async function getCaloriesGoal() {
        try {
            let response = await authFetch("http://localhost:8000/api/profile", {
                method: "GET"
            })
            if (!response.ok) {
                throw Error(response.message)
            }

            let data = await response.json()

            setCaloriesGoal(data.result.profile.calories_goal)
        } catch(e) {
            console.log(e.message)
        }
    }

    async function getProfile() {
        try {
            let response = await authFetch("http://localhost:8000/api/profile", {
                method: "GET"
            })
            if (!response.ok) {
                throw Error(response.message)
            }

            let data = await response.json()
            console.log("resposta", data)

            return data.result;
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

            setCaloriesGoal(data.result.calories_goal);
            return {ok: true, result: data.result}
        } catch(e) {
            return {ok: false, message: e.message}
        }
    }

    async function updateProfile(values) {
        try {
            let response = await authFetch("http://localhost:8000/api/profile", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    values
                }) 
            })

            if (!response.ok) {
                throw Error(response.message)
            }

            let data = await response.json()

            setCaloriesGoal(data.result.calories_goal);
            return {ok: true, result: data.result}
        } catch(e) {
            return {ok: false, message: e.message}
        }
    }

    async function updateProfilePicture(formData) {
        try {
            let response = await authFetch("http://localhost:8000/api/profile", {
                method: "PUT",
                body: formData
            })

            if (!response.ok) {
                throw Error(response.message)
            }

            let data = await response.json()

            return {ok: true, result: data.result}
        } catch(e) {
            return {ok: false, message: e.message}
        }
    }
    
    
    const calories = useMemo(() => {
        if (meals) {
            let cals = meals.reduce((acc, meal) => {
                meal.food_log.forEach((log) => {
                    acc += parseFloat(log.quantity) * parseFloat(log.food.calories_per_unit)
                })
                return acc
            }, 0)
            return cals
        }
    }, [meals])

    useEffect(() => {
        if (isAuthenticated){
            getCaloriesGoal();
        }
    }, [isAuthenticated])



    // Meals Functions:
    async function getMeals() {
        setIsLoading(true);
        try {
            let response = await authFetch("http://localhost:8000/api/meal")
            
            if (!response.ok) { 
                throw Error(response.message);
            }
            
            let data = await response.json()
    
            setMeals(data.result);
            setIsLoading(false);
        } catch(error) {
            console.log("error", error)
        }
    }

    async function createMeal(name) {
        try {
            let response = await authFetch("http://localhost:8000/api/meal", {
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
            let response = await authFetch("http://localhost:8000/api/meal", {
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
            let response = await authFetch("http://localhost:8000/api/template-food", {
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

        //Profile
        getProfile,
        updateProfilePicture,
        updateProfile,
        createProfile,

        //Calories 
        calories,
        caloriesGoal,
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