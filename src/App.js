import React from 'react';
import logo from './logo.svg';
import './App.css';
import { loadBlocks } from './helperFunctions';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <button onClick={loadBlocks}>Load</button>
      </header>
      <pre></pre>
    </div>
  );
}

export default App;
