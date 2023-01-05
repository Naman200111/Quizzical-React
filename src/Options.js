import React from "react"

export default function Options(props) {  
    const [on, setOn] = React.useState(props.item.isHeld)
    const styling = {
        backgroundColor: on ? "#D6DBF5" : "white"
    }
    props.item.isHeld = on;
    return <button 
                style={styling} 
                className="choice" 
                onClick={() => props.handleClick((setOn))}
            >
                    {props.item.value}
            </button>
}