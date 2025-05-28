import React,{useState,useEffect,useRef} from 'react'

function ProgressBar({timer,handleTimeOut}) {
    const [idleTime,setIdleTime] = useState(timer);
    
    // console.count("Progress bar rendered")

    useEffect(()=>{
        const timeOut = setTimeout(()=>{
            handleTimeOut();
        },timer);

        return () => {
            clearTimeout(timeOut);
        } 
    },[timer,handleTimeOut])

    useEffect(()=>{
        const time  = setInterval(()=>{
            setIdleTime(prevTime => prevTime - 10);
        },10);

        return () => clearInterval(time);
    },[])

    return (
        <progress value={idleTime} max={timer}/>
    )
}

export default ProgressBar