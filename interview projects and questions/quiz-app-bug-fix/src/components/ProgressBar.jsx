import React,{useState,useEffect,useRef} from 'react'

function ProgressBar({timer,handleTimeOut}) {
    const [idleTime,setIdleTime] = useState(timer);
    
    // console.count("Progress bar rendered");
    console.count("Progress bar rendered")

    if(idleTime <= 0){
        debugger;
        handleTimeOut();
    }
    // useEffect(()=>{
    //     const timeOut = setTimeout(()=>{
    //         handleTimeOut();
    //     },timer)

    //     return () => clearTimeout(timeOut);
    // },[])

    useEffect(()=>{
        const time  = setInterval(()=>{
            setIdleTime(prevTime => prevTime - 10);
        },10)
        return () => clearInterval(time);
    },[])

    return (
        <progress value={idleTime} Max={timer}/>
    )
}

export default ProgressBar