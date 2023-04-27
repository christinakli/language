
import React, { useState } from 'react';
import Game from './pages/Game.js';
import {
  BrowserRouter as Router, Routes, Route, Link
} from 'react-router-dom';

function App () {
    const [username, setUsername] = useState('');
    const [allUsernames, setUsernames] = useState([]);
    const [userEntered, setUserEntered] = useState(false);

    function selectGameMode(mode) {
        console.log(mode)
    }

    const usernameEntered = (evt) => {
        if (evt.key === 'Enter') {
            const user = evt.target.value;
            console.log("Name: ", user)
            setUsername(user);
            setUsernames([...allUsernames, user]);
            setUserEntered(true);

            // fetch("http://localhost:8000/enter-prompt", {
            //     method: "POST",
            //     body: JSON.stringify(user),
            //     headers: {
            //         "Content-type": "application/json; charset=UTF-8"
            //     }
            // })
            // .then(response => response.json())
            // .then((response) => {
            //     console.log("receive responde");
            //     console.log(response);
            // });
        }
    }

    return ( 
          <Router> 
            <Routes>
                <Route path='/' element={
                    <div className="home-page">
                    <h1> Language Learning Game </h1> 
                    <div className="username-prompt">
                    {!userEntered &&
                        <div> 
                            <p> Enter your name: </p>
                            <input type="text" value={username} 
                                onInput={evt => setUsername(evt.target.value)}
                                onKeyDown={usernameEntered}></input>
                        </div>
                    }
                    {userEntered && 
                        <div>
                            <p> Select a game mode: </p>
                            <div className="mode-buttons">
                                <button onClick={() => selectGameMode('Random')}> <Link to="/game">Random partner</Link> </button>
                                <button onClick={() => selectGameMode('Multi')}> <Link to="/game">Multi player </Link> </button>
                            </div>
                        </div>  
                    } 
                    </div>
                    </div>
                }></Route>
                <Route path='/game' element={< Game username={username}/>}></Route>
            </Routes>
      </Router>

   );
}
  
export default App;
