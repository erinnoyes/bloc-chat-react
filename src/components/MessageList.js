import React, { Component } from 'react';

class MessageList extends Component {
  constructor(props) {
    super(props);
    this.state = { username: "", content: "", sentAt: "", roomId: "", messages: [] };
    this.messagesRef = this.props.firebase.database().ref('messages');
  }

  handleChange= (e) => {
    this.setState({
      username: "User",
      content: e.target.value,
      sentAt: this.props.firebase.database.ServerValue.TIMESTAMP,
      roomId: this.props.activeRoom.key
    });
  }

  createMessage= (e) => {
    e.preventDefault();
    this.messagesRef.push({
      username: this.state.username,
      content: this.state.content,
      sentAt: this.state.sentAt,
      roomId: this.state.roomId
    });
    this.setState({username: "", content: "", sentAt: "", roomId: ""})
  }

  componentDidMount() {
    this.messagesRef.on('child_added', snapshot => {
      const message = snapshot.val();
      message.key = snapshot.key;
      this.setState({ messages: this.state.messages.concat( message ) });
    });
  }

  render() {

    const messageLists = this.state.messages.map( message => {
      if (message.roomId === this.props.activeRoom.key) {
        return <li key={message.key}>{message.content}</li>
      }
      return null;
    });

    const newMessage = (
      <form onSubmit={this.createMessage}>
        <input type="text" value={this.state.content} onChange={this.handleChange}/>
        <input type="submit" value="Send Message"/>
      </form>
    );

    return (
      <section className="message-list">
        <ul>{messageLists}</ul>
        <div>{newMessage}</div>
      </section>
    );
  }
}


export default MessageList;
