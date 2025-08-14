
import styles from "./MealComponent.module.css"; 
import { useContext, useState } from "react";
import { useUser } from "../../../contexts/UserContext";
import MealContent from "../mealContent/MealContent";
import { MealContext } from "../../meal/Meal";

const ChevronIcon = ({ isOpen }) => (
    <svg 
        className={`${styles.chevron} ${isOpen ? styles.open : ''}`}
        xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" 
        fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
    >
        <polyline points="6 9 12 15 18 9"></polyline>
    </svg>
);

const TrashIcon = () => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" 
        fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
    >
        <polyline points="3 6 5 6 21 6"></polyline>
        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
        <line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line>
    </svg>
);

export default function MealComponent() {
    const { mealState } = useContext(MealContext);
    const { deleteMeal } = useUser();
    const [isMealOpen, setIsMealOpen] = useState(false);

    function hanldeDeleteMeal(id) {
        deleteMeal(id);
    }
    
    return (
        <article className={styles.mealContainer}>
            <header className={styles.mealHeader} onClick={() => setIsMealOpen(!isMealOpen)}>
                <h2 className={styles.mealTitle}>{mealState.name}</h2>
                <div className={styles.mealActions}>
                    <button 
                        className={`${styles.actionButton} ${styles.deleteButton}`} 
                        onClick={(e) => {
                            e.stopPropagation(); 
                            hanldeDeleteMeal(mealState.id);
                        }}
                        aria-label="Deletar refeição"
                    >
                        <TrashIcon />
                    </button>
                    <button 
                        className={styles.actionButton} 
                        aria-label="Expandir refeição"
                    >
                        <ChevronIcon isOpen={isMealOpen} />
                    </button>
                </div>
            </header>
            
            {isMealOpen && <MealContent />}
        </article>
    );
}
