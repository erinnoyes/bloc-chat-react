import React, { Component } from 'react';
import * as firebase from 'firebase';
import './App.css';
import RoomList from './components/RoomList';
import MessageList from './components/MessageList';
import User from './components/User';



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
      this.state = {activeRoom: "", user: null };
    }

    chooseActiveRoomCallback = (room) => {
      this.setState({activeRoom:room});
    }

    setUser = (currentuser) => {
      this.setState({user: currentuser});
      console.log(currentuser.displayName);
    }

    render() {

      return (
        <div className="App">

        <h2>{this.state.activeRoom.name || 'Select a Room'}</h2>
        <RoomList
          firebase={firebase}
          chooseActiveRoomCallback={this.chooseActiveRoomCallback}
          activeRoom={this.state.activeRoom}
        />
        {this.state.activeRoom.key ?
        <MessageList
          firebase={firebase}
          activeRoom= {this.state.activeRoom}
          currentUser={this.state.user}
        />
        : null
        }
        <User
          firebase={firebase}
          setUser={this.setUser}
          currentUser={this.state.user}
          />

        </div>
      );
    }
  }

  export default App;
