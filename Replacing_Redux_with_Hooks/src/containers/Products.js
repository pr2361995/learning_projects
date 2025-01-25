import React from 'react';
// import { useSelector } from 'react-redux';

import ProductItem from '../components/Products/ProductItem';
import './Products.css';
import { useProductContext } from '../context/product-context';

const Products = props => {
  const {products} = useProductContext();
  console.log("product",products);
  // const productList = useSelector(state => state.shop.products);
  return (
    <ul className="products-list">
      {products.map(prod => (
        <ProductItem
          key={prod.id}
          id={prod.id}
          title={prod.title}
          description={prod.description}
          isFav={prod.isFavorite}
        />
      ))}
    </ul>
  );
};

export default Products;
