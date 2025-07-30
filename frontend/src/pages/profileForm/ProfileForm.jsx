import { useNavigate } from "react-router-dom"
import { useState, useRef } from "react"
import styles from "./ProfileForm.module.css"
import { useAuthenticate } from "../../contexts/AuthenticateContext";
import { useMeals } from "../../contexts/MealsContext";

export default function ProfileForm() {
    const [weight, setWeight] = useState(0);
    const [height, setHeight] = useState(0);
    const [age, setAge] = useState(0);
    const [sex, setSex] = useState("");
    const [caloriesGoal, setCaloriesGoal] = useState(0)

    const { setIsNewUser } = useAuthenticate();
    const { createProfile } = useMeals();

    const wheightInputRef = useRef(null);
    const heightInputRef = useRef(null);
    const ageInputRef = useRef(null);
    const sexInputRef = useRef(null);
    const caloriesGoalRef = useRef(null);

    function clearForm() {
        wheightInputRef.current.value = "";
        heightInputRef.current.value = ""; 
        ageInputRef.current.value = "";
        sexInputRef.current.value = "";
        caloriesGoalRef.current.value = "";
    }

    const navigate = useNavigate()

    async function handleregister(event) {
        event.preventDefault();
        console.log(`wheight: ${weight} height: ${height} age: ${age} sex: ${sex}, secaloriesGoal: ${caloriesGoal}`);
        
        let response = await createProfile(height, weight, sex, age, caloriesGoal);
        if (!response.ok){
            console.log("deu ruim")
        } else {
            clearForm();
            setIsNewUser(false);
            navigate("/");
        }
    }

    return(
        <div className={styles.external}>
            <div className={styles.container}>
                <h1 className={styles.header}>register!!!</h1>
                <form className={styles.form}>
                    <input 
                        type="number" 
                        placeholder="Your Weight" 
                        onChange={(e) => setWeight(e.target.value)} 
                        ref={wheightInputRef}
                        className={styles.input}
                    />
                    <input  
                        type="number" 
                        placeholder="Your Height" 
                        onChange={(e) => setHeight(e.target.value)} 
                        ref={heightInputRef}
                        className={styles.input}
                    />
                    <input 
                        type="number" 
                        placeholder="Your Age" 
                        onChange={(e) => setAge(e.target.value)} 
                        ref={ageInputRef}
                        className={styles.input}
                    />
                    <select 
                        onChange={(e) => setSex(e.target.value)} 
                        ref={sexInputRef} 
                        className={styles.input}
                    >
                        <option value="M">Male</option>
                        <option value="F">Female</option>
                    </select>
                    <input 
                        type="number" 
                        placeholder="Calories Goal" 
                        onChange={(e) => setCaloriesGoal(e.target.value)} 
                        ref={caloriesGoalRef}
                        className={styles.input}
                    />
                    <button onClick={handleregister} className={styles.button}>Register</button>
                </form>
            </div>
        </div>
    )
}
