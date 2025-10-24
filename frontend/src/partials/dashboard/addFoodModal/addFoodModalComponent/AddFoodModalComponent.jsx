import { useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import styles from "partials/dashboard/addFoodModal/addFoodModalComponent/AddFoodModalComponent.module.css";
import { AddFoodModalContext } from "partials/dashboard/addFoodModal/AddFoodModal";
import { MealContext } from "partials/dashboard/meal/Meal";
import {createPortal} from "react-dom";
import Container from "components/basicContainer/Container";
import Input from "components/input/Input";
import AddFoodItem from "partials/dashboard/addFoodItem/AddFoodItem";
import BreakLine from "components/breakLine/BreakLine";
import Button from "components/button/Button";
import { useFood } from "contexts/FoodContext";
import { useDebounce } from "hooks/useDebounceSearch";
import ItemLoader from "components/itemLoader/ItemLoader";


export default function AddFoodModalComponent({ setModalOpen }) {
    const {page, isLoading, setIsLoading, hasNextPage, loadNextPage, loadSearchedFoods, foods, resetSearch } = useContext(AddFoodModalContext)

    const [search, setSearch] = useState(null)
    const debounceSearch = useDebounce(search, 300)
    const overlayRef = useRef(null)
    const infiniteScrollRef = useRef(null)

    function handleClickOusideModal(e) {
        const target = e.target;
        if (target === overlayRef.current) {
            setModalOpen(false);
        }
    }

    useEffect(() => {
        if (infiniteScrollRef.current !== null) {
            const observer = new IntersectionObserver(([entry]) => {
                if (entry.isIntersecting && !isLoading && hasNextPage){
                    loadNextPage()
                }    
            }, {
                root: null,
                rootMargin: '0px',
                threshold: 0.50
            })
    
            observer.observe(infiniteScrollRef.current)
    
            return () => observer.disconnect()
        }
    }, [page, infiniteScrollRef.current])
                
    useEffect(() => {
        if (debounceSearch){
            loadSearchedFoods(debounceSearch)
        } else if (debounceSearch !== null && debounceSearch.length <= 0) {
            resetSearch();
        }
    }, [debounceSearch])

    useEffect(() => {
        loadNextPage()
    }, [])

    return createPortal((
        <div
            ref={overlayRef}
            className={styles.overlay}
            onClick={handleClickOusideModal}
        >
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
                        setIsLoading={setIsLoading}
                        ref={infiniteScrollRef} 
                    />
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