import { useState,memo, useCallback, useDebugValue, useEffect, useMemo } from "react";

import IconButton from "../UI/IconButton";
import MinusIcon from "../UI/Icons/MinusIcon";
import PlusIcon from "../UI/Icons/PlusIcon";
import CounterOutput from "./CounterOutput";
import { log } from "../../log.js";
import CounterHistory from "./CounterHistory.js";

function isPrime(number) {
  log("Calculating if is prime number", 2, "other");
  if (number <= 1) {
    return false;
  }

  const limit = Math.sqrt(number);

  for (let i = 2; i <= limit; i++) {
    if (number % i === 0) {
      return false;
    }
  }

  return true;
}

const Counter = memo(({ initialCount }) => {
  log("<Counter /> rendered", 1);
  
  const initialCountIsPrime = useMemo(()=>{ 
    return isPrime(initialCount);
  },[initialCount]);

  const randomGen = () => Math.random() * 100;

  const [counter, setCounter] = useState([{value:initialCount,id:randomGen()}]);

  const currentCount = counter.reduce((prevCount,counterChanges)=> prevCount + counterChanges.value ,0);

  // useEffect(()=>{
  //   setCounter(prev => [{value : initialCount, id : randomGen()}]);
  // },[initialCount])

  const handleDecrement = useCallback(() => {
    setCounter((prevCounter) => [{value:-1,id:randomGen()},...prevCounter]);
  },[])

  const handleIncrement = useCallback(() => {
    setCounter((prevCounter) => [{value:+1,id:randomGen()},...prevCounter]);
  },[])

  return (
    <section className="counter">
      <p className="counter-info">
        The initial counter value was <strong>{initialCount}</strong>. It{" "}
        <strong>is {initialCountIsPrime ? "a" : "not a"}</strong> prime number.
      </p>
      <p>
        <IconButton icon={MinusIcon} onClick={handleDecrement}>
          Decrement
        </IconButton>
        <CounterOutput value={currentCount} />
        <IconButton icon={PlusIcon} onClick={handleIncrement}>
          Increment
        </IconButton>
      </p>
      <CounterHistory history={counter}/>
    </section>
  );
})

export default Counter;
