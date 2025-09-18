import { useContext, useEffect, useMemo, useRef, useState } from "react";
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


export default function AddFoodModalComponent({ setModalOpen }) {
    const [search, setSearch] = useState("")
    const { foods, searchFoods, loadPage } = useContext(AddFoodModalContext)
    const [isInfiniteScroll, setIsInfiniteScroll] = useState(false)
    const [nextPage, setNextPage] = useState(2) //  gambia
    const infiniteScrollRef = useRef(null)
    const debounceSearch = useDebounce(search, 300)

    console.log("infiniteScrollRef", infiniteScrollRef.current)

    
    const displayedItens = useMemo(() => {        
        if (foods && foods.template_foods && foods.global_foods){
            let config = [];
            
            const templateFoods = foods.template_foods.filter(food => food.name.toLowerCase().includes(debounceSearch.toLowerCase()))
            
            if (templateFoods.length > 0){
                config = [
                    {
                        title: "Favoritos"
                    },
                    ...templateFoods,
                ]
            } 
            
            if (foods.global_foods.length > 0){
                config = [
                    ...config,
                    {
                        title: "Global"
                    }, 
                    ...foods.global_foods
                ]
            }
            
            return config.map((item, index) => {
                if (item) {
                    if (item.title) {
                        return <span>{item.title}</span>
                    }
                    return <AddFoodItem key={index} item={item}/>
                }
            })
        }
        return []
    }, [foods])

    function handleClick() {
        loadPage(nextPage)
        setNextPage((prev) => prev + 1)
    }
    
    useEffect(() => {
        if (debounceSearch){
            searchFoods(debounceSearch)
        } else {
            loadPage()
        }
    }, [debounceSearch])

    // useEffect(() => {
    //     if (displayedItens) {
    //         const observer = new IntersectionObserver(([ entry ]) => {
    //             console.log(entry)
    //             if (entry.isIntersecting ){
    //                 console.log("isIntersecting")
    //                 setIsInfiniteScroll(true)
    //                 loadPage(nextPage)
    //                 setNextPage((prev) => prev + 1)
    //             }
    //         }, {
    //             root: null,
    //             rootMargin: '0px',
    //             threshold: 0.10
    //         })
    
    //         observer.observe(infiniteScrollRef.current)
    
    //         return () => {
    //             observer.disconnect()
    //         }
    //     }
    // }, [])


    return createPortal((
        <div className={styles.overlay}>
            <Container className={styles.container}>
                <Input
                    className={styles.searchInput}
                    placeholder={"Busque por um alimento: "}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <button onClick={handleClick}>+</button>
                <BreakLine />
                <section className={styles.foodItems}>
                    {displayedItens}
                    {displayedItens && <div ref={infiniteScrollRef}></div>}
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