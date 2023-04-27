import { React , useState } from 'react';
  
function Home (){
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
                        <button onClick={() => selectGameMode('Random')}> Random Partner </button>
                        <button onClick={() => selectGameMode('Multi')}> Multi Partner </button>
                    </div>
                </div>  
            } 
            </div>

        </div>
    );
}
  
export default Home;