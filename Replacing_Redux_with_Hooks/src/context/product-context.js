import { createContext, useContext, useState } from "react";

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


const initialState = [
    {
      id: 'p1',
      title: 'Red Scarf',
      description: 'A pretty red scarf.',
      isFavorite: false
    },
    {
      id: 'p2',
      title: 'Blue T-Shirt',
      description: 'A pretty blue t-shirt.',
      isFavorite: false
    },
    {
      id: 'p3',
      title: 'Green Trousers',
      description: 'A pair of lightly green trousers.',
      isFavorite: false
    },
    {
      id: 'p4',
      title: 'Orange Hat',
      description: 'Street style! An orange hat.',
      isFavorite: false
    }
  ];


export default props => {
const [products,setProducts] = useState(initialState);

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