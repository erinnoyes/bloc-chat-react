import React, { Component } from 'react';

class User extends Component {
  constructor(props) {
    super(props);
    this.handleSignIn.bind(this);
    this.handleSignOut.bind(this);
  }


handleSignIn() {
  const provider = new this.props.firebase.auth.GoogleAuthProvider();
  this.props.firebase.auth().signInWithPopup(provider);
}

handleSignOut() {
   this.props.firebase.auth().signOut();
}


componentDidMount() {
  this.props.firebase.auth().onAuthStateChanged( user => {
    this.props.setUser(user);
  });
}



render() {
  return(
    <div className="signInandOut">
      <button onClick = {()=>this.handleSignIn()}>Sign In</button>
      <button onClick = {()=>this.handleSignOut()}>Sign Out</button>
      <h2>User: {this.props.currentUser}</h2>
    </div>
  );
}
}

export default User;
