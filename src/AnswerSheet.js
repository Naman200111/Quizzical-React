import React from "react"
import OptionsCheck from "./OptionsCheck"

export default function AnswerSheet(props) {
    let updatedData = props.data;
    function resetGame() {
        props.setGameStart(oldvalue => !oldvalue)
    }
    
    function showOptions(item) {
        let verdict = false
        const options = item.map(function(item) {
            if(item.isHeld && item.correct_answer === item.value)
                verdict = true
            return <OptionsCheck item={item}/>
        })

        return (
            verdict
            ?
            <div className="optionsWithTicks">
                <div>{options}</div>
                <img className="img_res" src="./images/tick.png" alt="verdict" />
            </div>
            :
            <div className="optionsWithTicks">
                <div>{options}</div>
                <img className="img_res" src="./images/cross.jpg" alt="verdict" />
            </div>
        )
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
                    <div className="score">
                        <h2>{`You scored ${props.correct}/5 correct answer`}</h2>
                    </div>
                    <button className="blue-button" onClick={resetGame}>Play Again</button>
                </div>
            </div>
        </div>
    )
}