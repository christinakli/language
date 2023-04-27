
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

    const handleKeyDown = (evt) => {
        if (evt.key === 'Enter') {
            console.log("Name: ", evt.target.value)
            setUsername(evt.target.value);
            setUsernames([...allUsernames, evt.target.value]);
            setUserEntered(true);
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
                                onKeyDown={handleKeyDown}></input>
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
                <Route path='/game' element={< Game />}></Route>
            </Routes>
      </Router>


      // <div>
      //   <Router>
      //     <div> 
      //       {/* <button onClick={() => selectGameMode('Random')}> <Link to="/game">Random partner</Link> </button> */}
      //       {/* <button onClick={() => selectGameMode('Multi')}> <Link to="/game">Multi player </Link> </button> */}
      //     </div>
      //     <Routes>
      //         <Route path='/' element={< Home />}></Route>
      //         <Route path='/game' element={< Game />}></Route>
      //     </Routes>
      //   </Router>
      // </div>
   );
}
  
export default App;
