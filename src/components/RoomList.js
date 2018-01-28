
import React, { Component } from 'react';

class RoomList extends Component {
  constructor(props) {
   super(props);
   this.state = {
     rooms: [],
     newRoomName: ''
   };
   this.roomsRef = this.props.firebase.database().ref('rooms');
  }

  handleChange = (e) => {
      this.setState({ newRoomName: e.target.value })
    }

  componentDidMount() {
    this.roomsRef.on('child_added', snapshot => {
      const room = snapshot.val();
      room.key = snapshot.key;
      this.setState({ rooms: this.state.rooms.concat( room ) });
    });
  }

  createRoom = (e) => {
    e.preventDefault();
    if (!this.state.newRoomName) { return}
    this.roomsRef.push({name: this.state.newRoomName});
    this.setState({ newRoomName: '' });
  }

  chooseRoom(room){
    this.props.chooseActiveRoomCallback(room);
  }

  render () {

    const roomLists = this.state.rooms.map( room =>
      <li key={room.key} onClick={(e) => this.chooseRoom(room)}>{room.name}</li>
    );

    return (
      <section className="room-list">
        <ul>{roomLists}</ul>

        <form onSubmit= {this.createRoom}>
          <input type="text" value= {this.state.newRoomName} onChange={this.handleChange}/>
          <input type="submit"/>
        </form>
      </section>
    );
  }
}


export default RoomList;
