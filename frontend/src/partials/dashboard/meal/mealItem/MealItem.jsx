import TimelineBullet from "components/timelineBullet/TimelineBullet"
import styles from "partials/dashboard/meal/mealItem/MealItem.module.css"
import { FiEdit2, FiCheck , FiX, FiTrash2  } from "react-icons/fi";
import { useContext, useState } from "react";
import Input from "components/form/input/Input";
import { MealContext } from "partials/dashboard/meal/Meal";


export default function MealItem({ item }){
    const meal = useContext(MealContext)
    const calories = parseInt(item.quantity) * parseFloat(item.food.calories_per_unit);
    const [openEditMode, setOpenEditMode] = useState(false);
    const [quantity, setQuantity] = useState(item.quantity);

    function handleEditLog() {
        if (quantity === item.quantity) {
            setOpenEditMode(false);
        } else {
            try{
                meal.handleUpdateLog(item, quantity);
                setOpenEditMode(false);
            } catch(e){
                console.log(e.message);
            }
        }
    }

    return (
        <main className={styles.container}>
            <TimelineBullet />
            <section className={styles.item}>

                {openEditMode && <Input 
                    className={styles.editInput}
                    defaultValue={item.quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                />}

                <span className={styles.food}>
                    {!openEditMode && item.quantity} {item.food.unit} of {item.food.name}
                </span>

                {!openEditMode ? 
                    <>
                        <span className={styles.calories}>
                            {calories.toFixed(1)} Kcal
                        </span> 
                        <FiEdit2 
                            onClick={() => setOpenEditMode((prev) => !prev)}
                            className={styles.editIcon}
                        /> 
                    </>
                    :
                    <>
                        <FiCheck 
                            className={styles.editIcon}
                            onClick={() => handleEditLog()}
                        />
                        <FiX
                            className={styles.editIcon}
                            onClick={() => setOpenEditMode(false)}
                        />
                        <FiTrash2
                            className={styles.editIcon}
                            onClick={() => meal.handleDeleteLog(item)}
                        />
                    </>
                }

            </section>
        </main>
    )
}
