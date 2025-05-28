import React from 'react'
import QUESTIONS from "../questions";
import quizComplete from "../assets/quiz-complete.png";
import { useEffect } from 'react';
import ProgressBar from './ProgressBar';
import { useCallback,useRef,useState } from 'react';
import Answers from './Answers';
import Summary from './Summary';

let TIMER = 15000;

function Quiz() {
    // state maintain the all the answers with status
    const [userAnswers,setUserAnswers] = useState([]);
    const activeIndex = userAnswers.length;
    
    // state hold current selected answer is correct or not
    const [isAnswerStatus,setAnswerStatus] = useState({ans:"",class:""});
    
    // clear time out reference
    const ref = useRef("");
    console.table(isAnswerStatus);

    useEffect(()=>{
        console.log("active index changed");
        setAnswerStatus({ans:"",class:""});
        clearTimeout(ref.current);
    },[activeIndex])

    const handleAnswer = useCallback((ans)=> {
        const isCorrect = ans === QUESTIONS[activeIndex].answers[0];
        setAnswerStatus({class : (isCorrect ? "correct" : "wrong"),ans});
        ref.current = setTimeout(()=>{
            console.log("time out expired");
            setUserAnswers(prevAns => [...prevAns,{answer:ans,status:isCorrect}]);
        },2000)
    },[activeIndex])

    const handleSkipAnswer = useCallback(()=> {
        setUserAnswers(prevAns => [...prevAns,{answer:null,status:false}]);
    },[handleAnswer])

    if(activeIndex >= QUESTIONS.length){
        return <Summary userAnswers={userAnswers}/>
    }


    return (
        <div id="quiz">
            <ProgressBar 
                    key={activeIndex} 
                    timer={TIMER} 
                    handleTimeOut={!isAnswerStatus.ans ? handleSkipAnswer : ()=>{}}/>
                    {/* handleTimeOut={handleSkipAnswer}/> */}
                    <div id="question">
                <h2>{QUESTIONS[activeIndex].text}</h2>
                <Answers 
                    key={activeIndex}
                    answers={QUESTIONS[activeIndex].answers}
                    isAnswerStatus={isAnswerStatus}
                    handleAnswer={handleAnswer}/>
            </div>
        </div>
    )
}

export default Quiz