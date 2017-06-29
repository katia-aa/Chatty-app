const uuidv4 = require('uuid/v4');
import React, {Component} from 'react';
import Chatbar from './Chatbar.jsx';
import MessageList from './MessageList.jsx';



class App extends React.Component {

  addMessage(newMessage) {
    newMessage.id = uuidv4()
    newMessage.username = this.state.currentUser.name
    newMessage.type = 'postMessage'
    //send message to the WebSocket
    this.socket.send(JSON.stringify(newMessage))
  }

  addUsername(newUser) {
    this.socket.send(JSON.stringify({
        type: 'postNotification',
        username: newUser,
        content: `${this.state.currentUser.name} has changed their name to ${newUser}.`
      })
    )
    this.setState({currentUser: {name: newUser} })
  }


  constructor(props) {
    super(props);
    this.state = {
      currentUser: {name: "Anonymous"},
      messages: [],
      usersOnline: 0
    };

    this.addMessage = this.addMessage.bind(this)
    this.addUsername = this.addUsername.bind(this)
  }


  componentDidMount() {
    //connect React app to the server (initiate the connection)
    this.socket = new WebSocket("ws://localhost:5657");
    console.log('Connected to server');

    this.socket.onopen = (e) => {
      console.log("eeee", e);
      this.socket.onmessage = (event) => {
        let data = JSON.parse(event.data);
        if (data.type === "usercount") {
          this.setState({usersOnline: data.usersOnline})
        }

        this.setState({messages: this.state.messages.concat(data)})

      }
    }

  }


  render() {
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
          <h3 className="userscount">Users Online: {this.state.usersOnline}</h3>
        </nav>
        <main className="messages">
          <MessageList messages={this.state.messages}/>
        </main>
        <Chatbar onMessage={this.addMessage} onUserChange={this.addUsername} />
      </div>
    );
  }
}


export default App;
