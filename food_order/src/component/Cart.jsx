import React, { forwardRef, useContext, useEffect, useImperativeHandle,useRef } from 'react'
import Modal from './UI/Modal'
import CartContext from '../store/cartContext'
import { currencyFormatter } from '../util/formatting';
import Button from './UI/Button';
import CartItem from './CartItem';
import CheckOut from './CheckOut';

const Cart = forwardRef((props,cartRef)=> {
    const {cart,addItem,removeItem} = useContext(CartContext),
    totalPrice = cart.reduce((total,item)=> total + (item.quantity * item.price),0),
    cartModalRef = useRef(),
    checkoutRef = useRef();

    console.log("cartModalRef",cartModalRef);

    useEffect(()=>{
        return () => cartModalRef.current?.close();
    },[])

    useImperativeHandle(cartRef,()=>({
        open: () => cartModalRef.current?.open()
    }))

    function close(){
        cartModalRef.current?.close();
    }

    function openCheckout(){
        close()
        checkoutRef.current?.open();
    }

    return (
        <Modal className='cart' ref={cartModalRef}>
            <h2>Your Cart</h2>
            <ul>
                {cart.map(item=> <CartItem 
                    key={item.id} 
                    {...item} 
                    add={()=>addItem(item)} 
                    remove={()=>removeItem(item.id)}/>)}
            </ul>
            <p className='cart-total'>
                {currencyFormatter.format(totalPrice)}
            </p>
            <p className='modal-actions'>
                <Button textOnly onClick={close}>Close</Button>
                {
                    cart.length > 0 ?
                        (
                            <Button onClick={openCheckout}>Go to checkout</Button>
                        )
                    :
                        null
                }
            </p>
            <CheckOut ref={checkoutRef}/>
        </Modal>
    )
});

export default Cart