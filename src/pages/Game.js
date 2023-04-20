import React from 'react';
  
function Game (props) {
    const handleKeyDown = (event) => {
        if (event.key == 'Enter') {
            let message = document.getElementById('chat_message').value;
            document.getElementById('chat_message').value = "";
            console.log("user typed " + message);

            fetch("https://shrouded-wildwood-66393.herokuapp.com/https://stablediffusionapi.com/api/v3/text2img", {
                method: "POST",
                body: JSON.stringify({
                    key: "HeJSpyrdPJ19rdI379rWiRTJweUecl0UIcaSoJuqV5yMCmOv9fEb8hPDazJ4",
                    prompt: message,
                    negative_prompt: "",
                    width: "512",
                    height: "512",
                    samples: "1",
                    num_inference_steps: "20",
                    seed: null,
                    guidance_scale: 7.5,
                    safety_checker: "yes",
                    webhook: null,
                    track_id: null
                }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            })
            .then((response) => response.json())
            .then((json) => {
                let img = json.output[0];
                document.getElementById('ai-image').src = img; 
            });
        }
    };

    return (
        <div className="game-page">
            <div className="drawing-area">
                <div className="drawing-header"> AI is drawing... </div>
                <div className="drawing-body">
                    <img id="ai-image"></img>
                </div>
                <div className="drawing-prompt">
                    <p> Your partner's prompt:  </p>{ props.prompt }
                </div>
            </div>
            <div className="guess-area">
                <div className="guess-header"> Guess </div>
                <div className="guess-body">

                </div>
                <input type="text" id="chat_message" onKeyDown={handleKeyDown}></input>
            </div>  
        </div>
    );
}
export default Game;