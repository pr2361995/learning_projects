import React, { useEffect, useState } from 'react'
import MealItem from './MealItem';
import useHttp from '../Hooks/useHttp';
import Error from './UI/Error';

const reqConfig = {
    method : "GET"
}

function Meals() {
    const {data,error,isLoading} = useHttp("http://localhost:3000/meals",reqConfig,[]);

    if(isLoading)
        return <div>Data is fetching</div>
    
    if(error)
        return <Error title={"Failed to fetch meals"} message={error}/>

    return (
        <ul id="meals">
            {
                data.length > 0 &&
                data.map(meal => 
                        <MealItem key={meal.id} data={meal}/>
                    )
            }
        </ul>
    )
}

export default Meals