import { useNavigate } from "react-router-dom"
import { useState, useRef } from "react"

export default function ProfileForm() {
    const [wheight, setWheight] = useState(0);
    const [height, setHeight] = useState(0);
    const [age, setAge] = useState(0);
    const [sex, setSex] = useState("");
    const [caloriesGoal, setCaloriesGoal] = useState(0)


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

    function handleregister(event) {
        event.preventDefault();
        console.log(`wheight: ${wheight} height: ${height} age: ${age} sex: ${sex}, secaloriesGoalx: ${caloriesGoal}`);
        clearForm()
        navigate("/")
    }

    return(
        <div>
            <h1>register!!!</h1>
            <form>
                <input type="number" placeholder="Your Wheight" onChange={(e) => setWheight(e.target.value)} ref={wheightInputRef}/>
                <input type="number" placeholder="Your Height" onChange={(e) => setHeight(e.target.value)} ref={heightInputRef}/>
                <input type="number" placeholder="Your Age" onChange={(e) => setAge(e.target.value)} ref={ageInputRef}/>
                <select onChange={(e) => setSex(e.target.value)} ref={sexInputRef}>
                    <option value="M">Male</option>
                    <option value="F">Female</option>
                </select>
                <input type="number" placeholder="Calories Goal" onChange={(e) => setCaloriesGoal(e.target.value)} ref={caloriesGoalRef}/>
                <button onClick={handleregister}>Register</button>
            </form>
        </div>
    )
}