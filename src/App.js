import React, { Component } from 'react';
import * as firebase from 'firebase';
import './App.css';
import RoomList from './components/RoomList';
import MessageList from './components/MessageList';



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
  constructor(props) {
    super(props);
    this.state = {activeRoom: "" }
  }

  selectActiveRoom = (room) => {
    this.setState({activeRoom:room});
  }

  render() {

    return (
      <div className="App">
        <header className="App-header">
          <h1 classNmae="App-title">Bloc Chat</h1>
        </header>


      <h3>{this.state.activeRoom.name || 'Select a Room'}</h3>
      <RoomList
        firebase={firebase}
        selectActiveRoom ={this.selectActiveRoom }
      />
      <h3>Messages</h3>
      {this.state.activeRoom.key ?
      <MessageList
        firebase={firebase}
        activeRoom= {this.state.activeRoom}
      />
      : null
      }
      </div>
    );
  }
}

export default App;
