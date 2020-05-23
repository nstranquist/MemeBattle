import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import io from 'socket.io-client';
import { SocketProvider } from 'socket.io-react';

const socket = io('localhost:3000') //.connect('http://localhost:3000');
// const socket = openSocket.connect()

// socket.on('message', msg => console.log(msg));
// socket.on('event', msg => console.log(msg));


ReactDOM.render(
  <React.StrictMode>
    <SocketProvider socket={socket}>
      <App />
    </SocketProvider>,
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
