import React,{forwardRef, useActionState, useContext, useEffect, useImperativeHandle, useRef} from 'react'
import Modal from './UI/Modal'
import CartContext from '../store/cartContext';
import { currencyFormatter } from '../util/formatting';
import Input from './UI/Input';
import Button from './UI/Button';
import { hasMinLength, isEmail, isNotEmpty } from '../util/validation';
import useHttp from '../Hooks/useHttp';
import Error from './UI/Error';

const reqConfig = {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
}

const CheckOut = forwardRef((props,ref) => {
    const {cart:items,clearCart} = useContext(CartContext),
     totalPrice = items.reduce((total,item)=> total + (item.quantity * item.price),0),
     checkoutRef = useRef(),
     successRef = useRef(),
     {data,error,sendRequest,clearData} = useHttp("http://localhost:3000/orders",reqConfig,undefined),
     [formState,formAction,isLoading] = useActionState(handleSubmit,{errors:null})


    useImperativeHandle(ref,()=>({
       open : () => checkoutRef.current?.open()
    }))

    async function handleSubmit(state,formData){
        const name = formData.get("name"),
        email = formData.get("email"),
        street = formData.get("street"),
        post_code = formData.get("post_code"),
        city = formData.get("city"),
        errors = [];

        if(!isNotEmpty(name))
            errors.push("Please provide the full name")
        if(!isEmail(email)){
            errors.push("Please provide the valid email address")
        }
        if(!hasMinLength(street,6)){
            errors.push("Please provide at least 6 characters")
        }
        if(!isNotEmpty(post_code)){
            errors.push("Please provide post code")
        }
        if(!isNotEmpty(post_code)){
            errors.push("Please provide city")
        }

        if(errors.length > 0){
            return {errors,data:{name,email,street,post_code,city}}
        }

        await sendRequest(JSON.stringify({
            order :{
                items,
                customer:{name,email,street,city,"postal-code":post_code},
            },
          })
        );


        return {errors};
    }

    // function orderPlaced(){
    //     checkoutRef.current?.close()
    //     successRef.current?.open();
    // }

    function orderPlacedFineshed(){
        successRef.current?.close();
        clearCart();
        clearData();
    }

    var actions = (
        <>
            <Button textOnly onClick={()=>checkoutRef.current?.close()}>Close</Button>
            <Button type="submit">Place Order</Button>
        </>
    )

    if(isLoading){
        actions = <span>Sending order data...</span>
    }

    if(data && !error){
        console.log("sucess",data);
        return <Modal ref={successRef}>
            <h2>Success..!</h2>
            <p>Your order was submitted successfully.</p>
            <p>We will get back to you more details via email within the next few minutes.</p>
            <div className='modal-actions'>
                <Button onClick={orderPlacedFineshed}>Okey</Button>
            </div>
        </Modal>
    }

  return (
    <Modal ref={checkoutRef}>
        <form action={formAction}>
            <h2>Checkout</h2>
            <p>Total Amount : {currencyFormatter.format(totalPrice)}</p>
            <Input id="name" label={"Full Name"} 
                type="text"
                defaultValue={formState.data?.name}
                />
            <Input id="email" label={"Email ID"} 
                type="text"
                defaultValue={formState.data?.email}
                />
            <Input id="street" label={"Street"} 
                type="text"
                defaultValue={formState.data?.street}
                />
            <div className='control-row'>
                <Input label="Post Code" id="post_code" 
                    type="text"
                    defaultValue={formState.data?.post_code}
                    />
                <Input label="City" id="city" 
                    type="text"
                    defaultValue={formState.data?.city}
                    />
            </div>
             {
                formState.errors && <ul className='errors'>
                    {
                        formState.errors.map(err => <li key={err}>{err}</li>)
                    }
                </ul>
            }
            {
                error && <Error title={"Order submittion failed"} message={error}/>
            }
            <div className='modal-actions'>
                {actions}
            </div>
        </form>
    </Modal>
  )
})

export default CheckOut