import React from "react";

export function counterReducer(state,action) {
    switch(action.type){
    case "INCREMENT": 
        return {...state,count: state.count+1};
    case "DECREMENT":
        return {...state,count: state.count-1};
    case "RESET":
        return {...state,count: 0};
    default:
        return state;
    }
}

function App() {
    const [counterState,countStateDispatch] = React.useReducer(counterReducer,{
        count : 0
    });
  return (
    <div id="app">
      <h1>The Counter</h1>
      <p id="actions">
        <button onClick={() => countStateDispatch({type:"INCREMENT"})}>Increment</button>
        <button onClick={() => countStateDispatch({type:"DECREMENT"})}>Decrement</button>
        <button onClick={() => countStateDispatch({type:"RESET"})}>Reset</button>
      </p>
      <p id="counter">{counterState.count}</p>
    </div>
  );
}

export default App;
