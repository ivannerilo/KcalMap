import { useNavigate } from "react-router-dom"
import { useState, useRef, Children } from "react"
import styles from "./ProfileForm.module.css"
import { useAuthenticate } from "contexts/AuthenticateContext";
import { useUser } from "contexts/UserContext";
import Input from "components/input/Input";
import FormContainer from "components/formContainer/FormContainer";
import Button from "components/button/Button";
import Select from "components/select/Select";

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
                        label={"Your Wheight"}
                        type="number" 
                        placeholder={"e.g 80(kg)"}
                        onChange={(e) => setWeight(e.target.value)} 
                        ref={wheightInputRef}
                        className={styles.input}
                    />
                    <Input
                        label={"Your Height"}
                        type="number" 
                        placeholder={"e.g 180(cm)"}
                        onChange={(e) => setHeight(e.target.value)} 
                        ref={heightInputRef}
                        className={styles.input}
                    />
                    <Input
                        label={"Your Age"}
                        type="number" 
                        placeholder={"e.g 18(y)"}
                        onChange={(e) => setAge(e.target.value)} 
                        ref={ageInputRef}
                        className={styles.input}
                    />
                    <Select 
                        label={"Your Biological Sex"}
                        onChange={(e) => seeOnchange(e.target.value)} 
                        ref={sexInputRef} 
                        className={styles.input}
                        options={[
                            {
                                children: "Select a option.",
                                disabled: true,
                                selected: true,
                            },
                            {
                                children: "Male",
                                value: "M",
                            },
                            {
                                children: "Female",
                                value: "F",
                            }
                        ]}
                    />
                    <Input
                        label={"Your Calories Goal"}
                        type="number" 
                        placeholder={"e.g 2000(kcal)"}
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

