import AddFoodItem from "partials/dashboard/addFoodItem/AddFoodItem";
import { forwardRef, useEffect} from "react";
import FoodItem from "partials/foods/foodItem/FoodItem";

const ItemLoader = forwardRef(({ foods, setIsLoading, firstGroupKey, firstGroupName, secondGroupKey, secondGroupName, itemCallback, refItemCallback }, ref) => {
    let lastItemId;

    if (secondGroupKey) {
        lastItemId = foods[secondGroupKey]?.at(-1)?.id;
    } else {
        lastItemId = foods[firstGroupKey]?.at(-1)?.id;
    }

    useEffect(() => {
        setIsLoading(false)
    }, [foods])

    return foods[firstGroupKey] && foods[secondGroupKey] ? (
        <>
            {foods[firstGroupKey]?.length > 0 &&
                <span>{firstGroupName}</span>
            }

            {foods[firstGroupKey]?.map((item) => {
                    return itemCallback(item);
                    // return <AddFoodItem key={item.id} item={item}/>
            })}

            {foods[secondGroupKey]?.length > 0 &&
                <span>{secondGroupName}</span>
            }

            {foods[secondGroupKey]?.map((item) => {
                return refItemCallback(item, lastItemId);
                // if (item.id === lastItemId) {
                //     return <AddFoodItem key={item.id} item={item} ref={ref}/>
                // }
                // return <AddFoodItem key={item.id} item={item}/>
            })}
        </>
    ) : (
        <>
            {foods[firstGroupKey]?.map((item) => {
                return refItemCallback(item, lastItemId);
                // if (item.id === lastItemId) {
                //     return <FoodItem key={item.id} item={item} ref={ref}/>
                // }
                // return <FoodItem key={item.id} item={item}/>
            })}
        </>
    )
});

export default ItemLoader;