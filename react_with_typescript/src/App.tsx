import React, { ReactElement } from 'react';
import './App.css';
import Todos from './components/Todos';

function App() : ReactElement {
  return (
    <div className="App">
      <Todos/>
    </div>
  );
}

export default App;
