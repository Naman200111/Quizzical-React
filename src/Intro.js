import React from "react"

export default function Intro(props) {
    function showQuestions() { 
        props.setGameStart(true)
    }
    return (
        <div className="intro-page-body">
            <h1>Quizzical</h1>
            <p>Test your Knowledge</p>
            <button className="intro-button" onClick={showQuestions}>Start Quiz</button>
        </div>
    )
}