import React, { useContext,useRef } from 'react'
import Logo from "../assets/logo.jpg"
import Button from './UI/Button'
import CartContext from '../store/cartContext'
import Cart from './Cart';

function Header() {
  const {cart} = useContext(CartContext),
  totalItems = cart.reduce((total,item)=>total + item.quantity,0),
  cartDialog = useRef();

  console.log(cartDialog,"cartDialog")  

  function open(){
    if(cartDialog.current)
        cartDialog.current.open()
  }

  return (<header id="main-header">
        <div id="title">
            <img src={Logo} alt="A Restaurant"/>
            <h1>React Food</h1>
        </div>
        <nav>
            <Button textOnly onClick={open}>Cart (${totalItems})</Button>
        </nav>
        <Cart ref={cartDialog}/>
    </header>)
}

export default Header