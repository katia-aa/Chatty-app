const express = require('express');
const SocketServer = require('ws').Server;
const WebSocket = require('ws');

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });



wss.on('connection', (ws) => {
  console.log('Client connected');


  wss.clients.forEach(function each(client) {

      client.send(JSON.stringify({
        "type": "usercount",
         "usersOnline" : wss.clients.size
     }));
  });


  //recieve message from App
  ws.on('message', function incoming(data) {
    let message = JSON.parse(data);
    console.log(`Type: ${message.type} Message ID: ${message.id} Username: ${message.username} Message-content: ${message.content}`);

    switch(message.type) {
      case "postMessage":
        message.type = 'incomingMessage';
        break;
      case "postNotification":
        message.type = 'incomingNotification';
        break;
      default:
        // show an error in the console if the message type is unknown
        throw new Error("Unknown event type " + message.type);
    }

    // Broadcast to everyone else.
    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(message));
      }
    });

  });


  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {

    wss.clients.forEach(function each(client) {

        client.send(JSON.stringify({
          "type": "usercount",
           "usersOnline" : wss.clients.size
       }));

    });

    return console.log('Client disconnected')
  });

});
