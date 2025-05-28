import React from 'react'
import QUESTIONS from "../questions";
import { useState } from 'react';
import quizComplete from "../assets/quiz-complete.png";
import { useEffect } from 'react';
import ProgressBar from './ProgressBar';
import { useCallback } from 'react';

const TIMER = 15000;

function Quiz() {
    const [userAnswers,setUserAnswers] = useState([]);
    console.table("userAnswers",userAnswers);

    const activeIndex = userAnswers.length;

    const handleAnswer = useCallback((ans)=> {
        // if(activeIndex < QUESTIONS.length){
            setUserAnswers(prevAns => [...prevAns,ans]);
        // }
    },[])

    const handleSkipAnswer = useCallback(()=> {
        console.log("handle Skip Answer")
        handleAnswer(null);
    },[handleAnswer])

    if(activeIndex >= QUESTIONS.length){
        return <div id="summary">
            <img src={quizComplete} alt="Quiz complete"></img>
            <h2>Quiz Completed</h2>
        </div>
    }

    var shuffledAnswers = [...QUESTIONS[activeIndex].answers].sort(()=> Math.random() - 0.5);

    return (
        <div id="quiz">
            <div id="question">
                <h2>{QUESTIONS[activeIndex].text}</h2>
                <ul id="answers">
                    {
                        shuffledAnswers.map((ans,index) => <li key={index} className='answer'>
                            <button onClick={() => handleAnswer(ans)}>{ans}</button>
                        </li>)
                    }
                </ul>
            </div>
            <ProgressBar 
                key={activeIndex} 
                timer={TIMER} 
                handleTimeOut={handleSkipAnswer}/>
        </div>
    )
}

export default Quiz