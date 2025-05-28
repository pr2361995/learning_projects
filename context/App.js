import Page from './Page';
import ThemeContextProvider from './ThemeContextProvider';
import React from 'react';

function App() {
  return (<ThemeContextProvider>
            <Page />
        </ThemeContextProvider> );
}

export default App;
