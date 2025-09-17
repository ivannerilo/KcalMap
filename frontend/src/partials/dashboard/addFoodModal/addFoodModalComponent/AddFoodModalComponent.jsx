import { useContext, useEffect, useMemo, useRef, useState } from "react";
import styles from "partials/dashboard/addFoodModal/addFoodModalComponent/AddFoodModalComponent.module.css";
import { AddFoodModalContext } from "partials/dashboard/addFoodModal/AddFoodModal";
import { MealContext } from "partials/dashboard/meal/Meal";
import {createPortal} from "react-dom";
import Container from "components/basicContainer/Container";
import Input from "components/form/input/Input";
import AddFoodItem from "partials/dashboard/addFoodModal/addFoodItem/AddFoodItem";
import GlobalFoodItem from "partials/dashboard/addFoodModal/globalFoodItem/GlobalFoodItem";
import BreakLine from "components/breakLine/BreakLine";
import Button from "components/button/Button";
import { useFood } from "contexts/FoodContext";
import { useDebounce } from "hooks/useDebounceSearch";


export default function AddFoodModalComponent({ setModalOpen }) {
    const meal = useContext(MealContext);
    const { getGlobalFoods } = useFood()
    const [search, setSearch] = useState("")
    const [globalItens, setGlobalItens] = useState();
    
    const debounceSearch = useDebounce(search, 300)

    useEffect(() => {
        async function getFoodOptions() {
            const response = await getGlobalFoods();
            setGlobalItens(response.result);
        }
        getFoodOptions();
    }, [])

    const displayedItens = useMemo(() => {
        const favFoodIds = meal?.mealState?.template_food.flatMap(
            (item) => item.food.id
        )
        let favs = meal?.mealState?.template_food.map(
            (item) => item.food
        )
        favs = favs.filter(
            (item) => item.name.includes(debounceSearch)
        )
        const global = globalItens ? globalItens.filter(
            (item) => !favFoodIds.includes(item.id) && item.name.includes(debounceSearch)
        ) : []

        const config = [
            {
                id: 0,
                title: "Favoritos"
            },
            ...favs,
            {
                id: 0,
                title: "Global"
            },
            ...global
        ]

        return config.map((item, index) => {
            if (item) {
                if (item.id === 0) {
                    return <span>{item.title}</span>
                }
                return <AddFoodItem key={index} item={item}/>
            }
        })
    }, [debounceSearch, globalItens, meal.mealState.template_food])

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
                    {displayedItens}
                </section>

                <section className={styles.buttonSection}>
                    <Button
                        className={styles.button}
                        onClick={() => setModalOpen(false)}    
                    >Fechar</Button>
                </section>
            </Container>
        </div>
    ), document.body);
}