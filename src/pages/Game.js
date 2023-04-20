import React from 'react';
  
function Game (props) {
    return (
        <div className="game-page">
            <div className="drawing-area">
                <div className="drawing-header"> AI is drawing... </div>
                <div className="drawing-body">

                </div>
                <div className="drawing-prompt">
                    <p> Your partner's prompt:  </p>{ props.prompt }
                </div>
            </div>
            <div className="guess-area">
                <div className="guess-header"> Guess </div>
                <div className="guess-body">

                </div>
                <input type="text" value={props.prompt}></input>
            </div>  
        </div>
    );
}
export default Game;