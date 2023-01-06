import React from "react"

export default function Options(props) {  
    const [on, setOn] = React.useState(props.item.isHeld)
    const styling = {
        backgroundColor: on ? "#D6DBF5" : "white",
        border: on ? "none" : ""
    }
    props.item.isHeld = on;
    return <button 
                style={styling} 
                className="choice" 
                onClick={() => props.handleClick((setOn))}
                dangerouslySetInnerHTML={{__html:props.item.value}}
            >      
            </button>
}