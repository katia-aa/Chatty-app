const uuidv4 = require('uuid/v4');

import React, {Component} from 'react';


import Chatbar from './Chatbar.jsx';
import MessageList from './MessageList.jsx';



class App extends React.Component {

  addMessage(newMessage) {
    newMessage.id = uuidv4()
    //send message to the WebSocket
    this.socket.send(JSON.stringify(newMessage))
  }

  constructor(props) {
    super(props);
    this.state = {
      currentUser: {name: "Bob"}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: []
    };
  }

  componentDidMount() {
    //connect React app to the server (initiate the connection)
    this.socket = new WebSocket("ws://localhost:5657");
    console.log('Connected to server');


    this.socket.onmessage = (event) => {
      let data = JSON.parse(event.data);
      this.setState({messages: this.state.messages.concat(data)})
    }

  }


  render() {
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
        </nav>
        <main className="messages">
          <MessageList messages={this.state.messages}/>
        </main>
        <Chatbar onMessage={this.addMessage.bind(this)} name={this.state.currentUser.name} />
      </div>
    );
  }
}


export default App;
