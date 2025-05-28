import React from 'react'
import { currencyFormatter } from '../util/formatting'

function CartItem({id,name,price,quantity,add,remove}) {
  return (
    <li className='cart-item'>
        <p>
            {name} - {quantity} x {currencyFormatter.format(price)}
        </p>
        <p className='cart-item-actions'>
            <button onClick={remove}>-</button>
            <span>{quantity}</span>
            <button onClick={add}>+</button>
        </p>
    </li>
  )
}

export default CartItem