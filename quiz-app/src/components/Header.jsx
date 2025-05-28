import React from 'react'
import logoImg from "../assets/quiz-logo.png";

function Header() {
  return (
    <header>
        <img src={logoImg} alt='Quiz Logo'/>
        <h1>React Quiz</h1>
    </header>
  )
}

export default Header