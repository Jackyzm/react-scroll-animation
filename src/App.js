import React from 'react';
import './App.css';
import ScrollAnimation from 'react-scroll-animation';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <div>
        <div style={{height: 800}} />
        <ScrollAnimation
          offset={150}
          animateIn="fadeInUp"
          animateOut="fadeOutDown"
        >
          <div className="demo" />
        </ScrollAnimation>
        <div style={{height: 1000}} />
      </div>
    </div>
  );
}

export default App;
