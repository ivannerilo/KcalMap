import { useContext, useEffect, useState } from "react";
import styles from "./AddFoodModalComponent.module.css";
import { AddFoodModalContext } from "../AddFoodModal";
import { MealContext } from "../../meal/Meal";
import {createPortal} from "react-dom";
import Container from "../../../components/basicContainer/Container";
import Input from "../../../components/form/input/Input";
import AddFoodItem from "../addFoodItem/AddFoodItem";
import BreakLine from "../../../components/breakLine/BreakLine";
import Button from "../../../components/button/Button";


export default function AddFoodModalComponent({ setModalOpen }) {
    const meal = useContext(MealContext);
    const [filteredItems, setFilteredItems] = useState([]);
    const [search, setSearch] = useState("")

    const [openNewTemplateFood, setOpenNewTemplateFood] = useState()


    useEffect(() => {
        setFilteredItems(meal?.mealState?.template_food?.filter((item) => {
            const itemName = item.food.name.toLowerCase();
            return itemName.includes(search.toLowerCase());
        }))
    }, [search, meal.mealState?.itens])

    return createPortal((
        <div className={styles.overlay}>
            <Container className={styles.container}>
                <Input
                    className={styles.searchInput}
                    placeholder={"Busque por um alimento: "}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <BreakLine />
                <section className={styles.foodItems}>
                    {filteredItems.map((item, index) => (
                        <AddFoodItem key={index} item={item}/>
                    ))}
                </section>

                <section className={styles.buttonSection}>
                    <Button
                        className={styles.button}
                        onClick={() => setModalOpen(false)}    
                    >Fechar</Button>
                    <Button 
                        className={styles.button}
                        onClick={() => setOpenNewTemplateFood(!openNewTemplateFood)}
                    >Add new template foods.</Button>
                </section>
            </Container>
        </div>
    ), document.body);
}



// Talvez tenha que ser uma laizy list, e separar por categorias também, possibilidade do usuário criar novos alimentos

{/* <button onClick={() => setIsAddNewTemplateFoodOpen(!isAddNewTemplateFoodOpen)}>Add new template foods.</button>
{isAddNewTemplateFoodOpen && (
    <div>
        <form onSubmit={(e) => handleSubmit(e)}> 
            <select name={"foodOptions"} onChange={(e) => setNewTemplateFoodId(e.target.value)}>
                <option disabled={true} selected={true}>Selecione uma opção: </option>
                {foodOptions.map((option, index) => {
                    return <option key={index} value={option.id}>{option.name}</option>
                })}
            </select>
            <button type="sumbit">Add</button>
        </form>
    </div>
)} */}