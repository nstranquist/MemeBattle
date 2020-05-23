import React from 'react';
import logo from './logo.svg';
import './App.css';
import {
  socketConnect
} from 'socket.io-react'
import io from 'socket.io-client';

import Messages from './components/Message.js'

const socket = io("http://localhost:3000"); //.connect("http://localhost:3001")

// const socket = openSocket("http://localhost:3000")

// socket.on('message', msg => console.log(msg));
// socket.on('event', msg => console.log(msg));

function App() {

  const handleSocketEvent = (e) => {
    console.log('socket event:', e)

    
    // emit a basic event
    socket.emit('message', 'Message from socket.io')
    socket.emit('serverEvent', 'Hello socket.io!')
    socket.emit('event', 'Event emitted from client')
  }

  socket.on('sender', e => console.log(e))

  return (
    <div className="App">
      <h1>Welcome to my playground</h1>
      <p>
        <button onClick={handleSocketEvent}>
          Emit Event
        </button>
        <Messages />
      </p>
    </div>
  );
}

// export default App
export default socketConnect(App);
