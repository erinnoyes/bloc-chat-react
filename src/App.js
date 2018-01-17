import React, { Component } from 'react';
import * as firebase from 'firebase';
import logo from './logo.svg';
import './App.css';
import RoomList from './components/RoomList';



  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyD4XmkCsjAkKR8EAtxI1qACTBh1jqT1JrI",
    authDomain: "bloc-chat-react-be4d6.firebaseapp.com",
    databaseURL: "https://bloc-chat-react-be4d6.firebaseio.com",
    projectId: "bloc-chat-react-be4d6",
    storageBucket: "bloc-chat-react-be4d6.appspot.com",
    messagingSenderId: "630162315586"
  };
  firebase.initializeApp(config);


  class App extends Component {
    render() {
      return (

        <div className="App">
          <header className="App-header">
            <h1 className="App-title">Bloc Chat</h1>
          </header>
        <RoomList firebase= {firebase}/>
        </div>
      );
    }
  }

export default App;
