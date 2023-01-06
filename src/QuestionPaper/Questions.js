import React from "react"
import Options from "./Options"
import AnswerCheck from "../AnswerSheet/AnswerCheck"

export default function Questions(props) {
    const [data, setData] = React.useState([])
    const [updatedData, setUpdatedData] = React.useState([])

    React.useEffect(() => {
        fetch("https://opentdb.com/api.php?amount=5&difficulty=easy")
            .then(res => res.json())
            .then(data => setData(data.results))
    }, []) 
    
    React.useEffect(() => {
        let updatedData = []
        let optionsArray = [] 
        let lastIndex = 0
        for(let i=0; i<data.length; i++) {
            optionsArray.push(data[i].correct_answer)
            for(let j=0; j<data[i].incorrect_answers.length; j++)
                optionsArray.push(data[i].incorrect_answers[j])
            
            let newOptions = []
            let correct = data[i].correct_answer

            let j=0
            while(optionsArray.length) {
                let randomIndex = Math.floor(Math.random() * optionsArray.length)
                newOptions.push(
                    {
                        value: optionsArray[randomIndex],
                        id: lastIndex + (j+1),
                        isHeld: false,
                        correct_answer: correct
                    }
                )
                j++
                optionsArray.splice(randomIndex,1)
            }
            lastIndex += j
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
            return <Options key={item.id} item={item} handleClick={handleClick}/>
        })
        return options
    }

    const questionsWithOptions = updatedData.map(function(item) {
        return (
            <div key={item.id} className="one-question">
                {/* this dangerouslySetInnerHTML={{__html:item.ques} is used to remove html entities*/}
                <p dangerouslySetInnerHTML={{__html:item.ques}}></p>
                {showOptions(item.options,item.id)}  
                <hr className="hz"/>
            </div>
        )
    })  

    const [showAnswers, setShowAnswers] = React.useState(false);
    const [correctCount, setCorrectCount] = React.useState(0);
    
    function toggleShowAnswers() {
        setShowAnswers(oldvalue => !oldvalue);
        updatedData.map(function(item){
            let heldAndCorrect = false
            let heldButIncorrect = false
            item.options.map(function(option) {
                    if(option.isHeld && option.correct_answer === option.value)
                        heldAndCorrect = true
                    if(option.isHeld && option.correct_answer !== option.value)
                        heldButIncorrect = true
                    return option
                })
            if(heldAndCorrect && !heldButIncorrect)
                setCorrectCount(oldvalue => oldvalue+1);
            return item
        })
    }

    return (
        showAnswers
        ?
            <AnswerCheck
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
                <div>
                    <button 
                        className="blue-button checkBtn" 
                        onClick={toggleShowAnswers}
                    >
                        Check answers
                    </button>
                </div>
            </div>
    )
}