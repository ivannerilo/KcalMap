import {  useContext, useEffect, useRef, useState } from "react";
import styles from "./FoodsListComponent.module.css";
import {createPortal} from "react-dom";
import Input from "components/input/Input";
import BreakLine from "components/breakLine/BreakLine";
import Button from "components/button/Button";
import { useDebounce } from "hooks/useDebounceSearch";
import ItemLoader from "components/itemLoader/ItemLoader";
import {FoodsListContext} from "partials/foods/foodsList/FoodsList";
import {CreateFoodsModal} from "../../createFoodsModal/CreateFoodsModal";
import FoodItem from "../../foodItem/FoodItem";


export default function FoodsListComponent() {
    const {page, isLoading, setIsLoading, hasNextPage, loadNextPage, loadSearchedFoods, foods, resetSearch } = useContext(FoodsListContext)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [search, setSearch] = useState(null)
    const debounceSearch = useDebounce(search, 300)
    const infiniteScrollRef = useRef(null)


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

    return (
        <div className={styles.container}>
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
                    firstGroupKey={"user_foods"}
                    firstGroupName={"Your foods"}
                    secondGroupKey={"global_foods"}
                    secondGroupName={"Globals"}
                    itemCallback={(item) => {
                        return <FoodItem key={item.id} item={item} />
                    }}
                    refItemCallback={(item, lastItemId) => {
                        if (item.id === lastItemId) {
                            return <FoodItem key={item.id} item={item} ref={infiniteScrollRef} />
                        }
                        return <FoodItem key={item.id} item={item} />
                    }}
                />
            </section>

            <section className={styles.buttonSection}>
                <Button
                    className={styles.button}
                    onClick={() => setIsModalOpen(true)}
                >Criar alimento</Button>
            </section>

            {isModalOpen && <CreateFoodsModal setIsModalOpen={setIsModalOpen} />}
        </div>
    )
}