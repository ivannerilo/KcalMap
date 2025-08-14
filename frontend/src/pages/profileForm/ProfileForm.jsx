import { useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
import styles from "./ProfileForm.module.css";
import { useAuthenticate } from "../../contexts/AuthenticateContext";
import { useUser } from "../../contexts/UserContext";

export default function ProfileForm() {
    // --- SUA LÓGICA (INTACTA) ---
    const [weight, setWeight] = useState(0);
    const [height, setHeight] = useState(0);
    const [age, setAge] = useState(0);
    const [sex, setSex] = useState("");
    const [caloriesGoal, setCaloriesGoal] = useState(0);
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

    const navigate = useNavigate();

    async function handleregister(event) {
        event.preventDefault();
        console.log(`wheight: ${weight} height: ${height} age: ${age} sex: ${sex}, secaloriesGoal: ${caloriesGoal}`);
        let response = await createProfile(height, weight, sex, age, caloriesGoal);
        if (!response.ok) {
            console.log("deu ruim");
        } else {
            clearForm();
            setIsNewUser(false);
            navigate("/");
        }
    }
    // --- FIM DA SUA LÓGICA ---

    // --- NOVA ESTRUTURA JSX ---
    return (
        <main className={styles.external}>
            <div className={styles.container}>
                <h1 className={styles.header}>Quase lá!</h1>
                <p className={styles.subHeader}>
                    Nos conte um pouco sobre você para personalizarmos sua experiência.
                </p>

                <form className={styles.form} onSubmit={handleregister}>
                    <div className={styles.formGroup}>
                        <label htmlFor="weight">Peso (kg)</label>
                        <input
                            id="weight"
                            className={styles.input}
                            type="number"
                            placeholder="Ex: 75.5"
                            onChange={(e) => setWeight(e.target.value)}
                            ref={wheightInputRef}
                            required
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="height">Altura (cm)</label>
                        <input
                            id="height"
                            className={styles.input}
                            type="number"
                            placeholder="Ex: 180"
                            onChange={(e) => setHeight(e.target.value)}
                            ref={heightInputRef}
                            required
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="age">Idade</label>
                        <input
                            id="age"
                            className={styles.input}
                            type="number"
                            placeholder="Ex: 30"
                            onChange={(e) => setAge(e.target.value)}
                            ref={ageInputRef}
                            required
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="sex">Sexo Biológico</label>
                        <select
                            id="sex"
                            className={styles.input}
                            onChange={(e) => setSex(e.target.value)}
                            ref={sexInputRef}
                            defaultValue=""
                            required
                        >
                            <option value="" disabled>Selecione...</option>
                            <option value="M">Masculino</option>
                            <option value="F">Feminino</option>
                        </select>
                    </div>
                    
                    <div className={styles.formGroup}>
                        <label htmlFor="caloriesGoal">Meta de Calorias (kcal)</label>
                        <input
                            id="caloriesGoal"
                            className={styles.input}
                            type="number"
                            placeholder="Ex: 2000"
                            onChange={(e) => setCaloriesGoal(e.target.value)}
                            ref={caloriesGoalRef}
                            required
                        />
                    </div>

                    <button type="submit" className={styles.button}>
                        Concluir Cadastro
                    </button>
                </form>
            </div>
        </main>
    );
}
