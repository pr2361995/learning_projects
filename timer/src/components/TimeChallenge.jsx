import { useState,useRef } from "react"
import ResultModal from "./ResultModal";

export const TimeChallange = ({title, targetTime})=> {
    let timer = useRef();
    let dialog = useRef();
    const [remainingTime,setRemainingTime] = useState(targetTime * 1000);
    let timerIsActive = remainingTime > 0 && remainingTime < (targetTime * 1000);

    if(remainingTime <= 0){
        clearInterval(timer.current);
        dialog.current.open();
    }

    const onReset = () => {
        setRemainingTime(targetTime * 1000);
    }

    const handleStart = () => {
        timer.current = setInterval(()=> {
            setRemainingTime(prevTime => prevTime - 10);
        }, 10);
    }

    const handleStop = () => {
        clearInterval(timer.current);
        dialog.current.open();
    }
    
    return (
        <>
        <ResultModal 
            ref={dialog} 
            remainingTime={remainingTime} 
            targetTime={targetTime}
            onReset={onReset} />
            
        <section className="challenge">
            <h2>{title}</h2>
            <p className="challenge-time">
                {targetTime} second {targetTime > 1 ? 's' : ''}
            </p>
            <p>
                <button onClick={timerIsActive ? handleStop : handleStart}>
                    {timerIsActive ? "Stop" : "Start"} Challenge
                </button>
            </p>
            <p className={timerIsActive ? "active" : undefined}>
                {timerIsActive ? "Time is running..." : "Timer inactive"}
            </p>

        </section>
        </>
    )
}