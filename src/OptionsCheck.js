import React from "react"

export default function OptionsCheck(props) {
    let styling = {};

    if(props.item.isHeld) {
        if(props.item.value === props.item.correct_answer) {
            styling = {
                backgroundColor: "#94D7A2"
            }
        }
        else {
            styling = {
                backgroundColor: "#F8BCBC",
                opacity: 0.5
            }
        }
    }
    else {
        if(props.item.value === props.item.correct_answer) {
            styling = {
                backgroundColor: "#94D7A2"
            }
        }
        else {
            styling = {
                backgroundColor: "#F5F7FB",
                opacity: 0.5
            }
        }
    }

    return <button 
                style={styling} 
                className="choice"
                dangerouslySetInnerHTML={{__html:props.item.value}}
            >
            </button>
}