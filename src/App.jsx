import React, {Component} from 'react';

import Chatbar from './Chatbar.jsx';
import MessageList from './MessageList.jsx';


class App extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        currentUser: {name: "Bob"}, // optional. if currentUser is not defined, it means the user is Anonymous
        messages: [
          {
            id: 1,
            username: "Bob",
            content: "Has anyone seen my marbles?",
          },
          {
            id: 2,
            username: "Anonymous",
            content: "No, I think you lost them. You lost your marbles Bob. You lost them for good."
          }
        ]
      };
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
        <Chatbar name={this.state.currentUser.name} />
      </div>
    );
  }
}


export default App;
