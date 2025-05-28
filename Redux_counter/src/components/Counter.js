import { useSelector,useDispatch } from 'react-redux';
import classes from './Counter.module.css';
import { decrement, increase, increment, toggleCounter } from '../store/counterSlice';

const Counter = () => {
  function toggleCounterHandler(){
    dispatch(toggleCounter());
  };
  const {count,showCounter} = useSelector(store => store.counter);
  const dispatch = useDispatch();

  return (
    <main className={classes.counter}>
      <h1>Redux Counter</h1>
      {showCounter && <div className={classes.value}>{count}</div>}
      <button onClick={()=>dispatch(increment())}>Increment</button>
      <button onClick={()=>dispatch(increase({value:5}))}>Increment By 5</button>
      <button onClick={()=>dispatch(decrement())}>Decrement</button>
      <div>
        <button onClick={toggleCounterHandler}>Toggle Counter</button>
      </div>
    </main>
  );
};

export default Counter;
