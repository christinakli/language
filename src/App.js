
import React, { Component } from 'react';
import Home from './pages/Home.js';
import Game from './pages/Game.js';
import {
  BrowserRouter as Router, Routes, Route, Link
} from 'react-router-dom';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: '',
      prompt: '',
      pastPrompts: []
    };
  }

  render() {
    const selectGameMode = (mode) => {
      this.setState({ mode: mode });
      console.log("Mode: ", this.state.mode);
    }

    return (
      <div>
        <Router>
          <div> 
            <button onClick={() => selectGameMode('Random')}> <Link to="/game">Random partner</Link> </button>
            <button onClick={() => selectGameMode('Multi')}> <Link to="/game">Multi player </Link> </button>
          </div>
          <Routes>
              <Route path='/home' element={< Home />}></Route>
              <Route path='/game' element={< Game />}></Route>
          </Routes>
        </Router>
      </div>
   );
  }
}
  
export default App;
