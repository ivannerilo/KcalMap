import { useRef, useState } from "react";
import styles from "partials/dashboard/meal/newMeal/NewMeal.module.css";
import { useUser } from "contexts/UserContext";
import Button from "components/button/Button";
import Input from "components/form/input/Input";
import Container from "components/basicContainer/Container";

export default function NewMeal({ setIsFormOpen }) {
    const [mealName, setMealName] = useState("");
    const inputRef = useRef(null);
    const { createMeal } = useUser();
    

    async function handleCreateMeal(event) {
        try {
            event.preventDefault();
            let response = await createMeal(mealName)
    
            setIsFormOpen(false);
        } catch(e) {
            console.log(e.message)
        }
    }

    return (
        <Container className={styles.div}>
            <h2>Criar nova Refeição</h2>
            <form 
                className={styles.form}
                onSubmit={handleCreateMeal}
            >
                <Input 
                    className={styles.input}
                    type="text" 
                    placeholder="Meal Name" 
                    value={mealName} 
                    onChange={(e) => setMealName(e.target.value)}
                    ref={inputRef}
                />
                <Button 
                    className={styles.button}
                    type="submit"
                >+</Button>
            </form>
        </Container>
    );
}