import React from 'react';
import { Route } from 'react-router-dom';

import Navigation from './components/Nav/Navigation';
import ProductsPage from './containers/Products';
import FavoritesPage from './containers/Favorites';
import ProductContextProvider from './context/product-context';

const App = props => {
  
  return (
    <ProductContextProvider>
      <React.Fragment>
        <Navigation />
        <main>
          <Route path="/" component={ProductsPage} exact />
          <Route path="/favorites" component={FavoritesPage} />
        </main>
      </React.Fragment>
    </ProductContextProvider>
  );
};

export default App;
