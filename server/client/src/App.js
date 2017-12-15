import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Greeting from './components/hello';
import Person from './components/person';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
         <Greeting name="Jake" />Jltm1-b-1
        </p>
      </div>
    );
  }
}

export default App;
