import { createContext, useContext, useState } from "react";
import { defaultValue } from "../data.js";

const ProductContext = createContext({
    products    : [],
    toggleFav   : () => {},
    getFavorite : () => {}
});


export function useProductContext(){
    const ctx = useContext(ProductContext);
    if(!ctx)
        throw new Error("Product context is not truthy")
    return ctx;
}

export default props => {
const [products,setProducts] = useState(defaultValue);

function toggleFav(id){
  setProducts(prevProduts => prevProduts.map(product => 
      product.id === id ? 
        {...product,isFavorite:!product.isFavorite} 
      : 
        product
    ))
}

function getFavorite(){
  return products.filter(prod => prod.isFavorite)
}

const productsContext = {
  products,
  toggleFav,
  getFavorite
}

return (
  <ProductContext.Provider value={productsContext}>
    {props.children}
  </ProductContext.Provider>
);
};