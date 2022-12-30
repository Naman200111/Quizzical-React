import React from "react"
import OptionsCheck from "./OptionsCheck"

export default function AnswerSheet(props) {
    // console.log(props)
    let updatedData = props.data;
    function resetGame() {
        props.setGameStart(oldvalue => !oldvalue)
    }

    function showOptions(item) {
        const options = item.map(function(item) {
            return <OptionsCheck item={item}/>
        })
        return options
    }
    const questionsWithOptions = updatedData.map(function(item) {
        return (
            <div className="one-question">
                <p>{item.ques}</p>
                {showOptions(item.options)}  
                <hr className="hz"/>
            </div>
        )
    }) 

    return (
        <div className="layout">
            <div className="all-questions">
                {questionsWithOptions}
                <div className="result">
                    <div class="score">
                        <h2>{`You scored ${props.correct}/5 correct answer`}</h2>
                    </div>
                    <button className="blue-button" onClick={resetGame}>Play Again</button>
                </div>
            </div>
        </div>
    )
}