import { useReducer } from "react";

function reducer(state,action){
    switch(action.type){
      case "Increment" : 
        return state + 1; 
      case "Decrement" :
        return state - 1;
      default : 
        return state
    }
  }
  
  
  function checker(value){
    if(value % 2 === 0)
        return "EVEN" 
    else 
        return "ODD"
  }
  
  export default function Counter(){
    const [count,dispatch] = useReducer(reducer,0);
  
    return <div>
        <div>{count}</div>
        <button onClick={() => dispatch({type : "Increment"})}>Increment</button>
        <span>Count is {checker(count)}</span>
        <button onClick={() => dispatch({type : "Decrement"})}>Decrement</button>
      </div>
  }