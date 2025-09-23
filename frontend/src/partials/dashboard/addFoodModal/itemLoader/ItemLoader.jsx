import AddFoodItem from "partials/dashboard/addFoodModal/addFoodItem/AddFoodItem";
import { forwardRef, useEffect} from "react";

const ItemLoader = forwardRef(({ foods, setIsLoading }, ref) => {
    const lastItemId = foods?.global_foods?.at(-1)?.id;

    useEffect(() => {
        setIsLoading(false)
    }, [foods])

    return foods.template_foods && foods.global_foods ? (
        <>
            {foods.template_foods.length > 0 &&
                <span>{"Favoritos"}</span>
            }
            {foods?.template_foods?.map((item) => {
                    return <AddFoodItem key={item.id} item={item}/>
            })}
            {foods?.global_foods?.length > 0 &&
                <span>{"Global"}</span>
            }
            {foods?.global_foods?.map((item) => {
                if (item.id === lastItemId) {
                    return <AddFoodItem key={item.id} item={item} ref={ref}/>
                }
                return <AddFoodItem key={item.id} item={item}/>
            })}
        </>
    ) : null 
});

export default ItemLoader;