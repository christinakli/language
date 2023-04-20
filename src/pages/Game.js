import React, { useState, useEffect } from 'react';
  
function Game (props) {
    const [prompt, setPrompt] = useState('');
    const [aiImgSrc, setImgSrc] = useState('');
    const [allPrompts, setAllPrompts] = useState([]);
   
    useEffect(() => {
        console.log(prompt, ' has changed')
    }, [prompt])
    
    useEffect(() => {
        console.log("New list of prompts: ", allPrompts)
    }, [allPrompts])

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            // setPrompt(event.target.value)
            console.log("Current prompt: ", prompt)
            // Send prompt to API
            // fetch("https://shrouded-wildwood-66393.herokuapp.com/https://stablediffusionapi.com/api/v3/text2img", {
            //     method: "POST",
            //     body: JSON.stringify({
            //         key: "HeJSpyrdPJ19rdI379rWiRTJweUecl0UIcaSoJuqV5yMCmOv9fEb8hPDazJ4",
            //         prompt: prompt,
            //         negative_prompt: "",
            //         width: "512",
            //         height: "512",
            //         samples: "1",
            //         num_inference_steps: "20",
            //         seed: null,
            //         guidance_scale: 7.5,
            //         safety_checker: "yes",
            //         webhook: null,
            //         track_id: null
            //     }),
            //     headers: {
            //         "Content-type": "application/json; charset=UTF-8"
            //     }
            // })
            // .then((response) => response.json())
            // .then((json) => {
            //     let img = json.output[0];
            //     // document.getElementById('ai-image').src = img; 
            //     setImgSrc(img);
            // });

            setAllPrompts([...allPrompts, prompt]);
            console.log("Prompts: ", allPrompts)
            setPrompt('');
        }
    };

    return (
        <div className="game-page">
            <div className="drawing-area">
                <div className="drawing-header"> 
                    <p className="static-text"> AI is drawing... </p>
                </div>
                <div className="drawing-body">
                    <img id="ai-image" src={aiImgSrc}></img>
                </div>
                <div className="drawing-prompt">
                    <p className="static-text"> Your partner's prompt: </p> <p> { prompt }  </p>
                </div>
            </div>
            <div className="guess-area">
                <div className="guess-header"> 
                    <p className="static-text"> Guess/Prompt History </p> 
                </div>
                <div className="guess-body">
                    <ul>
                        {allPrompts.map((item, index) => {
                            console.log("Displaying item at index", index)
                            return <li key={index} className="prompt">{item}</li>
                        })}
                    </ul>
                </div>
                <input type="text" value={prompt} 
                       onInput={evt => setPrompt(evt.target.value)}
                       onKeyDown={handleKeyDown}></input>
                {/* <input type="text" id="chat_message" onKeyDown={handleKeyDown}></input> */}
            </div>  
        </div>
    );
}
export default Game;