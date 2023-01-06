import React from "react"
import OptionsCheck from "./OptionsCheck"

export default function AnswerSheet(props) {
    let updatedData = props.data;
    function resetGame() {
        props.setGameStart(oldvalue => !oldvalue)
    }
    
    function showOptions(item) {
        let verdict = false
        let heldIncorrect = false
        const options = item.map(function(item) {
            if(item.isHeld && item.correct_answer === item.value)
                verdict = true
            if(item.isHeld && item.correct_answer !== item.value)
                heldIncorrect = true
            return <OptionsCheck key={item.id} item={item}/>
        })

        return (
            verdict && !heldIncorrect
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
            <div key={item.id} className="one-question">
                <p dangerouslySetInnerHTML={{__html:item.ques}}></p>
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