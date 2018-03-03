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
        <section class="animation-box">
        <div class="copy-text">metaverse</div>
        </section>
      </div>
    );
  }
}

export default App;
