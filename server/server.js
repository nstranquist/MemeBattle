const bodyParser = require('body-parser');
const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io').listen(server);
const cors = require('cors');

// Parse Form Requests and JSON Requests
app.use(cors({
  origin: 'http://localhost:3001',
}))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Hello World' })
})

/*
// Signup
app.post('/signup', (req, res) => {
  // Create MongoDB Entry and User Token

  // Need a Hash Library... 
})

// Login
app.post('/login', (req, res) => {
  // Return their Login Token?
})

// Get A Users Collection of GIFs
app.get('/collection', (req, res) => {

  // Return
  {
    "wins" : array.length,
    "images"
  } // Images in Reverse Chronological Order
})

// Get A Prompt by ID or Get a Random Prompt?
// Depends if we store the prompt stateful
app.get('/prompt', (req, res) => {

})



*/

// Websockets
io.on('connection', (socket) => {
  console.log('on connection')

  socket.on('event', (data) => {
    console.log('socket event', data)
    socket.emit('sender', 'Yo What Up Clients!')
  });

  socket.emit('event', 'event emitted')

  socket.emit('message', 'greetings from server')

  socket.on('disconnect', () => {
    console.log('disconnected')
  });
  /*
  socket.on('joinGame', ()  => {
    // Randomly Assign one User to Judge
    // Add to Room?
  })

  */

});

io.on('serverEvent', () => {
  console.log('socket event')
});

io.on('message', () => console.log('message received'))

// Listen 
// const port = process.env.PORT || 3000;

server.listen(3000, () => {
    console.log("Server is listening on port 3000");
});
