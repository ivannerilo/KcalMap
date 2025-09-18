import AddFoodItem from "partials/dashboard/addFoodModal/addFoodItem/AddFoodItem";

export default function ItemLoader({ foods }){
    return foods.template_foods && foods.global_foods ? (
        <>
            {foods.template_foods.length > 0 &&
                <span>{"Favoritos"}</span>
            }
            {foods?.template_foods?.map((item) => {
                    return <AddFoodItem item={item}/>
            })}
            {foods?.global_foods?.length > 0 &&
                <span>{"Global"}</span>
            }
            {foods?.global_foods?.map((item) => {
                    return <AddFoodItem item={item}/>
            })}
        </>
    ) : null
    
}   