import React from 'react'
import quizComplete from "../assets/quiz-complete.png";
import QUESTIONS from '../questions';

function Summary({userAnswers}) {
  return (
    <div id="summary">
        <img src={quizComplete} alt="Quiz complete"></img>
        <h2>Quiz Completed</h2>
        <div id="summary-stats">
            <p>
                <span className="number">
                    {(userAnswers.filter(ud => ud.answer === null).length / userAnswers.length) * 100}%
                </span>
                <span className="text">Skipped</span>
            </p>
            <p>
                <span className="number">
                    {(userAnswers.filter(ud => ud.status).length / userAnswers.length) * 100}%
                </span>
                <span className="text">Answered Correctly</span>
            </p>
            <p>
                <span className="number">
                    {(userAnswers.filter(ud => !ud.status).length / userAnswers.length) * 100}%
                </span>
                <span className="text">Answered InCorrectly</span>
            </p>
        </div>
        <ol>
            {
                userAnswers.map((ansDetail,index)=>
                    <li key={index}>
                        <h3>{index+1}</h3>
                        <p className='question'>{QUESTIONS[index].text}</p>
                        <p className={`user-answer ${ansDetail.answer ? (ansDetail.status ? " correct" : " wrong") : " skipped" }`}>
                            {ansDetail.answer ?? "Skipped"}
                        </p>
                    </li>
                )
            }
        </ol>
    </div>
  )
}

export default Summary