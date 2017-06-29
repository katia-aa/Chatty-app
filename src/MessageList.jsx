import React, {Component} from 'react';
import Message from './Message.jsx';


class MessageList extends Component {

  render() {
    let messages = this.props.messages.map((msg) => {
      if (msg.type === 'incomingMessage') {
        return <Message key={msg.id} username={msg.username} messageContent={msg.content}/>
      } else {
        return <div className="message system">{msg.content}</div>
      }
    });

    return (
      <div className="messages">
        {messages}
      </div>
    );
  }
}

export default MessageList;
