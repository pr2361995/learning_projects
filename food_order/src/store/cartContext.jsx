import { createContext, useReducer } from "react";

const CartContext = createContext({
    cart: [],
    addItem : (item) => {},
    removeItem : (id) => {},
    clearCart : () => {}
});

function cartReducer(state,action){
    switch(action.type){
        case "ADDITEM" : {
            const findItem = state.cart.find(itm => itm.id === action.payload.id);
            if(findItem){
                const updateItem = state.cart.map(itm => itm.id === action.payload.id ? ({...itm,quantity : itm.quantity + 1}) : itm)
                return {
                    ...state,
                    cart : updateItem
                }
            }
            return {
                ...state,
                cart : [...state.cart,{...action.payload,quantity:1}]
            }
        }
        case "REMOVEITEM" : {
            const findItem = state.cart.find(itm => itm.id === action.id);
            if(findItem && findItem.quantity > 1){
                const updateItem = state.cart.map(itm => itm.id === action.id ? ({...itm , quantity : itm.quantity - 1}) : itm)
                return {
                    ...state,
                    cart : updateItem
                }
            }
            return {
                ...state,
                cart : state.cart.filter(itm => itm.id !== action.id)
            }
        }   
        case "CLEAR" : {
            return {
                cart : []
            }
        }
        default : 
            return state;
    }
}

export function CartContextProvider({children}){    
    const [data,dispatchCartAction] = useReducer(cartReducer,{cart : []});

    function addItem(item){
        dispatchCartAction({type:"ADDITEM",payload:item})
    }
    function removeItem(id){
        dispatchCartAction({type:"REMOVEITEM",id})
    }
    function clearCart(){
        dispatchCartAction({type:"CLEAR"})
    }

    return <CartContext.Provider value={{cart:data.cart,addItem,removeItem,clearCart}}>
        {children}
    </CartContext.Provider>
}

export default CartContext;
