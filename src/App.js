import React from "react"
import Intro from "./Intro"
import Questions from "./Questions"

export default function App() {
    const [gameStart, setGameStart] = React.useState(false)
    return (
        <div className="img_and_body">
            <img className="blob-1" src="./images/blob1.png" alt="Blob 1"></img>
            {
                gameStart 
                ? 
                <Questions gameStart={gameStart} setGameStart={setGameStart}/> 
                : 
                <Intro setGameStart={setGameStart}/>
            }
            <img className="blob-2" src="./images/blob2.png" alt="Blob 2"></img>
        </div>
    )
}