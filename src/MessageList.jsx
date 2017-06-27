import React, {Component} from 'react';
import Message from './Message.jsx';


class MessageList extends Component {

  render() {
    let messages = this.props.messages.map((msg) => {
      return <Message key={msg.id} username={msg.username} messageContent={msg.content}/>
    });

    return (
      <div className="messages">
        {messages}
      </div>
    );
  }
}

export default MessageList;
