import { useNavigate } from "react-router-dom"
import { useState, useRef } from "react"
import styles from "./ProfileForm.module.css"
import { useAuthenticate } from "../../contexts/AuthenticateContext";
import { useUser } from "../../contexts/UserContext";
import Input from "../../components/form/input/Input";
import FormContainer from "../../components/form/formContainer/FormContainer";
import Button from "../../components/button/Button";
import Select from "../../components/form/select/Select";

export default function ProfileForm() {
    const [weight, setWeight] = useState(0);
    const [height, setHeight] = useState(0);
    const [age, setAge] = useState(0);
    const [sex, setSex] = useState("");
    const [caloriesGoal, setCaloriesGoal] = useState(0)

    const { setIsNewUser } = useAuthenticate();
    const { createProfile } = useUser();

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

    function seeOnchange(value) {
        console.log("Value", value);
    }

    return(

    <div className={styles.external}>
            <FormContainer className={styles.container}>            
                <h1 className={styles.header}>Almost There</h1>
                <p className={styles.infoText}>
                    Tell us a little bit more about you.
                </p>
                <form className={styles.form}>
                    <Input
                        type="number" 
                        placeholder="Your Weight" 
                        onChange={(e) => setWeight(e.target.value)} 
                        ref={wheightInputRef}
                        className={styles.input}
                    />
                    <Input
                        type="number" 
                        placeholder="Your Height" 
                        onChange={(e) => setHeight(e.target.value)} 
                        ref={heightInputRef}
                        className={styles.input}
                    />
                    <Input
                        type="number" 
                        placeholder="Your Age" 
                        onChange={(e) => setAge(e.target.value)} 
                        ref={ageInputRef}
                        className={styles.input}
                    />
                    <Select 
                        onChange={(e) => seeOnchange(e.target.value)} 
                        ref={sexInputRef} 
                        className={styles.input}
                        options={[
                            {
                                name: "Select a option.",
                                disabled: true
                            },
                            {
                                name: "Male",
                                value: "M",
                            },
                            {
                                name: "Female",
                                value: "F",
                            }
                        ]}
                    />
                    <Input 
                        type="number" 
                        placeholder="Calories Goal" 
                        onChange={(e) => setCaloriesGoal(e.target.value)} 
                        ref={caloriesGoalRef}
                        className={styles.input}
                    />
                    <Button 
                        className={styles.button}
                        onClick={handleregister}
                    >
                        Finish Register
                    </Button>
                </form>
            </FormContainer>
        </div>
       
    )
}

