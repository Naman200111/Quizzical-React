import React from "react"

export default function Options(props) {  
    const [on, setOn] = React.useState(props.item.isHeld)
    const [isHover, setIsHover] = React.useState(false)

    const styling = {
        backgroundColor: on ? "#D6DBF5" : 
                              isHover ? "#4D5B9E" : "white",
        color: (isHover&&!on) ? "white" : "black",
        border: on ? "none" : ""
    }

    function onMouseEnter() {
        setIsHover(true)
    }

    function onMouseLeave() {
        setIsHover(false)
    }

    props.item.isHeld = on;
    return <button 
                style={styling} 
                className="choice" 
                onClick={() => props.handleClick((setOn))}
                onMouseEnter = {onMouseEnter}
                onMouseLeave = {onMouseLeave}
            >
                    {props.item.value}
            </button>
}