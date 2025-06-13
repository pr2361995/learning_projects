import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import Counter from './Counter';

function App() {
    return (
        <Provider store={store}>
            <div>
                <h1>Redux Counter Example</h1>
                <Counter />
            </div>
        </Provider>
    );
}

export default App; 