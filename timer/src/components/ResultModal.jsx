import React,{forwardRef,useRef,useImperativeHandle} from 'react';
import {createPortal} from "react-dom";

const ResultModal = forwardRef(function ResultModal({remainingTime,targetTime,onReset},ref){
    const dialog = useRef();

    const isLost = remainingTime <= 0;
    const leftTime = (remainingTime / 1000).toFixed(2);
    const score = Math.round(( 1 - remainingTime / (targetTime * 1000)) * 100);
    
    useImperativeHandle(ref,()=>{
        return ({
            open (){
                dialog.current.showModal();
            }
        });
    });

  return createPortal(
    <>
      <dialog className='result-modal' ref={dialog}>
        {isLost && <h2>You Lost</h2>}
        {!isLost && <h2>You Score {score}</h2>}
        <p>The target  time was <strong>{targetTime}</strong> seconds.</p>
        <p>You stopped the timer with <strong> {leftTime} seconds left.</strong></p>
        <form method='dialog'>
            <button onClick={onReset}>Close</button>
        </form>
      </dialog>
    </>
  ,document.getElementById("modal"))
});

export default ResultModal