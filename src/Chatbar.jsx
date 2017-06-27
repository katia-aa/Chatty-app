import React, {Component} from 'react';
import $ from 'jquery';

class Chatbar extends Component {


  render() {
    return (
      <footer className="chatbar">
        <input className="chatbar-username" placeholder="Your Name (Optional)" value={this.props.name}/>
        <input className="chatbar-message" placeholder="Type a message and hit ENTER" />
      </footer>
    );
  }

  componentDidMount() {
    let that = this;
    $('.chatbar-message').on('keydown', function (e) {

      if (e.keyCode === 13) { // if Enter is pressed

        //let messageContent = {content: this.props.onMessage($(this).val())};
        let messageContent = $(this).val();
        let userName = $('.chatbar-username').val();

        //message action
        that.props.onMessage({
          username: userName,
          content: messageContent
        })
        $(this).val(''); //set input to empty afterwards
      }
    });
  }
}

export default Chatbar;
