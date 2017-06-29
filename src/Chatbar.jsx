import React, {Component} from 'react';
import $ from 'jquery';

class Chatbar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      message: ''
    };

    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handleMessageChange = this.handleMessageChange.bind(this);
    this.handleKeydownEvents = this.handleKeydownEvents.bind(this);
  }


  handleUsernameChange(event) {
    this.setState({username: event.target.value});
  }

  handleMessageChange(event) {
    this.setState({message: event.target.value});
  }

  handleKeydownEvents(e) {
    if (e.keyCode === 13 && this.state.message !== '') { // if Enter is pressed
      //let messageContent = {content: this.props.onMessage($(this).val())};
      let messageContent = this.state.message;
      let userName = this.state.username || "Anonymous"; //get user name OR if empty, set it to "Anonymous"

      //message action
      this.props.onMessage({
        username: userName,
        content: messageContent
      })
      $(this).val(''); //set input to empty afterwards
    }
  }

  render() {
    return (
      <footer className="chatbar">
        <input className="chatbar-username" placeholder="Your Name (Optional)" value={this.state.username} onChange={this.handleUsernameChange} />
        <input className="chatbar-message" placeholder="Type a message and hit ENTER" value={this.state.message}  onChange={this.handleMessageChange} onKeyDown={this.handleKeydownEvents}/>
      </footer>
    );
  }

}

export default Chatbar;
