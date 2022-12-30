import React from "react"

export default function Options(props) {  
    let options = props.allOptions

    const [on, setOn] = React.useState(props.item.isHeld)
    const styling = {
        backgroundColor: on ? "#D6DBF5" : "white",
    }

    // function handleClick() {
    //     setOn(prevOn => !prevOn);
    //     props.item.isHeld = on;

    //     let original_option = props.item.value;
    //     for(let i=0; i<options.length; i++) {
    //         let curr_option = options[i];
    //         if(curr_option.value === original_option) {
    //             curr_option.isHeld = true;
    //         }
    //         else {
    //             curr_option.isHeld = false;
    //         }
    //     }
    //     console.log(options)
    // }
    
    props.item.isHeld = on;

    return <button style={styling} className="choice" onClick={() => props.handleClick(setOn,options,props.item)}>
                    {props.item.value}
            </button>
}