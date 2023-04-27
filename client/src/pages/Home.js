import React from 'react';
  
function Home (){
    function selectGameMode(mode) {
        console.log(mode)
    }

    return (
        <div className="home-page">
            <h1> Game Name </h1>      
            <button onClick={() => selectGameMode('Random')}> Random Partner </button>
            <button onClick={() => selectGameMode('Multi')}> Multi Partner </button>
        </div>
    );
}
  
export default Home;