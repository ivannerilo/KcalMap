import MealComponent from "./mealComponent/MealComponent";
import { createContext } from 'react'

const MealContext = createContext()

export default function Meal({ meal }) {
    return(
        <MealContext value={meal}>
            <MealComponent />
        </MealContext>
    )
}

export { MealContext }