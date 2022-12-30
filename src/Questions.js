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
        for(let i=0; i<data.length; i++) {
            let newOptions = []
            newOptions.push(
                {
                    value: data[i].correct_answer,
                    id: i * (data[i].incorrect_answers.length+1) + 1,
                    isHeld: false,
                    correct_answer: data[i].correct_answer
                }
            )
            for(let j=0; j<data[i].incorrect_answers.length; j++) {
                newOptions.push({
                    value: data[i].incorrect_answers[j],
                    id: i * (data[i].incorrect_answers.length+1) + (j+2),
                    isHeld: false,
                    correct_answer: data[i].correct_answer
                })
            }

            updatedData.push({
                id: i+1,
                ques: data[i].question,
                options: newOptions
            })
        }
        setUpdatedData(updatedData)
    }, [data]);

    // render options whenever updatedData changes

    React.useEffect(() => {
        <div>
            console.log("ran")
            <div className="all-questions">
                {questionsWithOptions}
            </div>
        </div>
    },[updatedData])

    // do the required changes in updatedData
    console.log(updatedData)   
    function handleClick(setOn, options, item) {
        console.log(options)
        // console.log(item)
        setOn(oldvalue => !oldvalue)

        for(let i=0; i<updatedData.length; i++) {
            for(let j=0; j<updatedData[i].options.length; j++) {
                if(updatedData[i].options[j].id === item.id) {
                    updatedData[i].options[j] = {
                        ...updatedData[i].options[j],
                        isHeld: !updatedData[i].options[j].isHeld
                    }
                }
                else {
                    updatedData[i].options[j] = {
                        ...updatedData[i].options[j],
                        isHeld: false
                    }
                }
            }
        }

        // props.item.isHeld = on;

        // let original_option = item.value;
        // for(let i=0; i<options.length; i++) {
        //     let curr_option = options[i];
        //     if(curr_option.value === original_option) {
        //         curr_option.isHeld = true;
        //     }
        //     else {
        //         curr_option.isHeld = false;
        //     }
        // }
        // console.log(options)
    }

    function showOptions(item) {
        let allOptions = item;
        const options = item.map(function(item) {
            return <Options item={item} allOptions={allOptions} handleClick={handleClick}/>
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
        // console.log(correctCount)
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