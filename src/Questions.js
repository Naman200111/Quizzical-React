import React from "react"
import Options from "./Options"
import AnswerSheet from "./AnswerSheet"

export default function Questions(props) {
    const [data, setData] = React.useState([])
    const [updatedData, setUpdatedData] = React.useState([])

    React.useEffect(() => {
        fetch("https://opentdb.com/api.php?amount=5&category=27&difficulty=easy&type=multiple")
            .then(res => res.json())
            .then(data => setData(data.results))
    }, []) 

    React.useEffect(() => {
        let updatedData = []
        let optionsArray = [] 
        for(let i=0; i<data.length; i++) {
            optionsArray.push(data[i].correct_answer)
            for(let j=0; j<data[i].incorrect_answers.length; j++)
                optionsArray.push(data[i].incorrect_answers[j])
            
            let newOptions = []
            let incorrect_answers_length = data[i].incorrect_answers.length
            let correct = data[i].correct_answer
            
            while(optionsArray.length) {
                let randomIndex = Math.floor(Math.random() * optionsArray.length)
                newOptions.push(
                    {
                        value: optionsArray[randomIndex],
                        id: i * (incorrect_answers_length+1) + 1,
                        isHeld: false,
                        correct_answer: correct
                    }
                )
                optionsArray.splice(randomIndex,1)
            }
            updatedData.push({
                id: i+1,
                ques: data[i].question,
                options: newOptions
            })
        }
        setUpdatedData(updatedData)
    }, [data]);

    function handleClick(setOn) {
        setOn(prevOn => !prevOn);
    }

    function showOptions(item) {
        const options = item.map(function(item) {
            return <Options item={item} handleClick={handleClick}/>
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

    const [showAnswers, setShowAnswers] = React.useState(false);
    const [correctCount, setCorrectCount] = React.useState(0);
    
    function toggleShowAnswers() {
        setShowAnswers(oldvalue => !oldvalue);
        updatedData.map(function(item){
            item.options.map(function(option) {
                    if(option.isHeld && option.correct_answer === option.value)
                        setCorrectCount(oldvalue => oldvalue+1);
                    return option
                })
            return item
        })
    }

    return (
        showAnswers
        ?
            <AnswerSheet 
                apiData = {data}
                data = {updatedData}
                setGameStart={props.setGameStart}
                correct = {correctCount}
            />
        :
            <div className="layout">
                <div className="all-questions">
                    {questionsWithOptions}
                </div>
                <button className="blue-button" onClick={toggleShowAnswers}>Check answers</button>
            </div>
    )
}