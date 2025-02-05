import React, { useRef, useState } from 'react'


var startTime = new Date()
startTime.setHours(0,5,0,0);
var endTime = new Date()
endTime.setHours(0,0,0,0);

function Timer() {
    const [timer,setTimer] = useState(new Date(startTime));
    const timerRef = useRef(null);

    function startTimer(){
        if(!timerRef.current){
            timerRef.current = setInterval(() => {
                setTimer(prevTimer => {
                    if (endTime >= prevTimer) {
                        clearInterval(timerRef.current);
                        timerRef.current = null;
                        return new Date(startTime); // 00:00 when time is up
                    }
                    prevTimer.setSeconds(prevTimer.getSeconds() - 1);
                    return new Date(prevTimer);
                })
            },1000);
        }
    }

    function stopTimer(){
        if(timerRef.current){
            clearInterval(timerRef.current);
            timerRef.current = null;
        }
    }

    function ResetTimer(){
        if(timerRef.current){
            clearInterval(timerRef.current);
            timerRef.current = null;
        }
        setTimer(new Date(startTime))
    }

    var content = (
        <div >
            <div>{`${timer.getMinutes()} : ${timer.getSeconds()}`}</div>
            <button onClick={startTimer}>Start</button>
            <button onClick={stopTimer}>Stop</button>
            <button onClick={ResetTimer}>Reset</button>
        </div>
    );

    if (endTime >= timer)
        content = <p>Five minutes is over</p>

    return (
        content
    )
}

export default Timer