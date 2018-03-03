import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Greeting from './components/hello';
import Person from './components/person';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div class="stars"></div>
        <div class="twinkling"></div> 
        <div class="clouds"></div>
      </div>
    );
  }
}

export default App;
