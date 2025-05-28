import React, { useContext } from 'react'
import { currencyFormatter } from '../util/formatting';
import Button from './UI/Button';
import CartContext from '../store/cartContext';

function MealItem({data}) {
    const {name,price,description,image} = data;
    const {addItem} = useContext(CartContext);

    
    return (
        <li className='meal-item'>
            <article>
                <img src={`http://localhost:3000/${image}`} alt={name}/>
                <div>
                    <h3>{name}</h3>
                    <p className='meal-item-price'>{currencyFormatter.format(price)}</p>
                    <p className='meal-item-description'>{description}</p>
                </div>
                <p className='meal-item-actions'>
                    <Button onClick={()=>addItem(data)}>
                        Add to Cart
                    </Button>
                </p>
            </article>
        </li>
    )
}

export default MealItem