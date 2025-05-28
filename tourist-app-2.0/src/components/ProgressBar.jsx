import React,{useEffect,useState} from 'react'

const TIMER = 3000;

function ProgressBar() {
    const [remainingTime,setRemainingTime] = useState(TIMER);

    useEffect(() => {
        console.count("Child UseEffect ");
        const timer = setInterval(()=>{
            setRemainingTime(prevTime => prevTime - 10);
        },10);

        return () => clearInterval(timer);
    },[]);

  console.count("Child rendered");

  return (
    <progress value={remainingTime} max={TIMER}/>
  )
}

export default ProgressBar