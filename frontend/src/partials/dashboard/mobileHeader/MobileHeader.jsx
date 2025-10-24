import { useState } from "react";
import Button from "components/button/Button";
import styles from "partials/dashboard/mobileHeader/MobileHeader.module.css"
import NewMeal from "partials/dashboard/newMeal/NewMeal";

export default function() {
    const [isFormOpen, setIsFormOpen] = useState(false);

    return(
        <main className={styles.container}>
            <header className={styles.header}>
                <h2 className={styles.title}>KcalMap</h2>
                <Button 
                    className={styles.button}
                    onClick={() => setIsFormOpen(prev => !prev)}
                >{isFormOpen ? "Cancelar" : "Criar nova refeição"}</Button>
            </header>
            {isFormOpen && <section className={styles.formContainer}>
                    <NewMeal setIsFormOpen={setIsFormOpen} />
                </section>
            }
        </main>
    )
}