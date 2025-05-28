import React,{useState,useEffect} from 'react'


function Answers({
    answers,
    isAnswerStatus,
    handleAnswer
    }) {
    // state is maintain the current question answers option shuffled data 
    const [shuffledAnswers,setShuffledAnswers] = useState([]);

    useEffect(()=>{
            setShuffledAnswers(prev => {
                return [...answers].sort(()=> Math.random() - 0.5)
            });
    },[])

  return (
    <ul id="answers">
        {
            shuffledAnswers.map((ans,index) => {
                return <li key={index} className={`answer`}>
                    <button className={isAnswerStatus.ans === ans ? isAnswerStatus.class : ""} disabled={isAnswerStatus.ans && isAnswerStatus.ans !== ans ? true : false} onClick={() => handleAnswer(ans)}>{ans}</button>
                </li>
            })
        }
    </ul>
  )
}

export default Answers