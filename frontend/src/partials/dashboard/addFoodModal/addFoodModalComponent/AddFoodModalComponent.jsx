import { useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import styles from "partials/dashboard/addFoodModal/addFoodModalComponent/AddFoodModalComponent.module.css";
import { AddFoodModalContext } from "partials/dashboard/addFoodModal/AddFoodModal";
import { MealContext } from "partials/dashboard/meal/Meal";
import {createPortal} from "react-dom";
import Container from "components/basicContainer/Container";
import Input from "components/form/input/Input";
import AddFoodItem from "partials/dashboard/addFoodModal/addFoodItem/AddFoodItem";
import BreakLine from "components/breakLine/BreakLine";
import Button from "components/button/Button";
import { useFood } from "contexts/FoodContext";
import { useDebounce } from "hooks/useDebounceSearch";
import ItemLoader from "partials/dashboard/addFoodModal/itemLoader/ItemLoader";


export default function AddFoodModalComponent({ setModalOpen }) {
    const [search, setSearch] = useState("")
    const infiniteScrollRef = useRef(null)
    const isComponentMount = useRef(true);
    const debounceSearch = useDebounce(search, 300)
    const meal = useContext(MealContext)
    const { getTemplateFoods } = useFood()
    const [foods, setFoods] = useState({})
    const [page, setPage] = useState(1)

    const searchFoods = useCallback(async (debounceSearch) => {
        let response = await getTemplateFoods(meal.mealState.id, debounceSearch)
        setFoods(prev => ({
            template_foods: prev.template_foods.filter((item) => item.name.includes(debounceSearch)),
            global_foods: response.result.searched_foods
        }))
    }, [])

    const loadPage = useCallback(async (pageNum) => {
        let response = await getTemplateFoods(meal.mealState.id, null, pageNum)
        console.log(`Rendering page ${pageNum}, response =>`, response)
        setFoods(prev => {
            const prevGlobalFoods = (prev && prev?.global_foods?.length > 0) ? prev.global_foods : []
            return {
                template_foods: response.result.template_foods,
                global_foods: [
                    ...prevGlobalFoods,
                    ...response.result.global_foods
                ]
            }
        
        })
    }, [])

    async function loadNextPage() {
        loadPage(page)
        setPage((prev) => prev + 1)
    }
                
    useEffect(() => {
        if (debounceSearch){
            searchFoods(debounceSearch)
        } 

    }, [debounceSearch])

    useEffect(() => {
        loadNextPage()
    }, [])

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting && !isComponentMount.current){
                loadNextPage()
            }

            isComponentMount.current = false
        }, {
            root: null,
            rootMargin: '0px',
            threshold: 0.50
        })

        observer.observe(infiniteScrollRef.current)

        return () => observer.disconnect()
    }, [page])

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
                    <ItemLoader 
                        foods={foods} 
                    />
                    <div ref={infiniteScrollRef}></div>
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