import React, { useState, useEffect } from 'react';

class ChatMessage {
    constructor(text, isPrompt, user) {
        this.text = text;
        this.isPrompt = isPrompt;
        this.user = user;
    }
}

function Game (props) {
    const emptyMessage = new ChatMessage('', false, '');

    const {username} = props;
    const [chatMessage, setChatMessage] = useState(emptyMessage);
    const [aiImgSrc, setImgSrc] = useState('');
    const [allChatMessages, setAllChatMessages] = useState([]);

    function updateChat() {
        console.log("updateChat");
        fetch("http://localhost:8000/get-chat", {
            method: "GET",
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        .then(response => response.json())
        .then((response) => {
            setAllChatMessages(response);
        });
    }

    function updateImage() {
        console.log("updateImage");
        fetch("http://localhost:8000/get-image", {
            method: "GET",
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        .then(response => response.json())
        .then((response) => {
            setImgSrc(response.image);
        });
    }

    function doUpdates() {
        updateChat();
        updateImage();
    }

    // On mount
    useEffect(() => {
        // console.log("Window loaded");
        doUpdates();
        setInterval(doUpdates, 500);
    }, [])

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            console.log("Current chat message:", chatMessage)
            fetch("http://localhost:8000/enter-chat", {
                method: "POST",
                body: JSON.stringify(chatMessage),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            });
            // Send prompt to API
            // fetch("https://shrouded-wildwood-66393.herokuapp.com/https://stablediffusionapi.com/api/v3/text2img", {
            //     method: "POST",
            //     body: JSON.stringify({
            //         key: "HeJSpyrdPJ19rdI379rWiRTJweUecl0UIcaSoJuqV5yMCmOv9fEb8hPDazJ4",
            //         prompt: prompt.prompt,
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

            setAllChatMessages([...allChatMessages, chatMessage]);
            console.log("Chat messages:", allChatMessages);
            setChatMessage(emptyMessage);
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
                    <p className="static-text"> Your partner's prompt: </p> <p> { chatMessage.text }  </p>
                </div>
            </div>
            <div className="guess-area">
                <div className="guess-header"> 
                    <p className="static-text"> Guess/Prompt History </p> 
                </div>
                <div className="guess-body">
                    <ul>
                        {allChatMessages.map((item, index) => {
                            // console.log("Displaying item at index", index)
                            return <li key={index} className="prompt">
                                       <p style={{ fontWeight: 'bold' }}> {item.user === username ? "You" : item.user} </p> <p>: {item.text} </p>
                                   </li>
                        })}
                    </ul>
                </div>
                <input type="text" value={chatMessage.text} 
                       onInput={evt => setChatMessage(new ChatMessage(evt.target.value, true, username))}
                       onKeyDown={handleKeyDown}></input>
            </div>  
        </div>
    );
}
export default Game;