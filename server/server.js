const bodyParser = require('body-parser');
const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io').listen(server);
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;
const md5 = require('md5');

// Mongo Config
const url = 'mongodb+srv://admin:AAvZTEwKEE5y5uSq@gifbattle-cvvpb.gcp.mongodb.net/test?retryWrites=true&w=majority'
const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology : true });

// CORS
app.use(cors({
  origin: 'http://localhost:3001',
}))

// Parse Form Requests and JSON Requests
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// On Client Connect
client.connect(err => {
  const users = client.db("memebattle").collection("users");
  const questions = client.db("memebattle").collection("questions")

  // Routes //
  app.get('/', (req, res) => {
    res.json({ message: 'Hello World' })
  })

  // Signup
  app.post('/signup', (req, res) => {
    // Create MongoDB Entry and User Token
    const user = req.body.user.toString();
    const pass = req.body.pass.toString();
    const token = md5(user + pass);
    users.findOne({user : user}).then( data => {
      if (data){
        res.status(400).json({message : 'Username Already Taken'});
      }else{
        users.insertOne({user : user, pass : pass, token : token, wins : []})
        res.status(201).json({message : 'Success'});
      }
    })
  })

  // Login
  app.post('/login', (req, res) => {
    // Return their Login Token?
    const user = req.body.user.toString();
    const pass = req.body.pass.toString();
    users.findOne({user : user, pass : pass}, {projection: {token : 1, _id : 0}}).then( data => {
      const token = data;
      if (token){
        res.status(201).json({message : 'Login Success', token : token['token']})
      }else{
        res.status(400).json({message : 'Wrong Username or Password'})
      }
    })
  })

  // Get A Users Collection of GIFs (Wins)
  app.get('/collection/:user', (req, res) => {
    const user = req.params.user;
    users.findOne({user : user}, {projection: {user : 1, wins : 1}}).then( data => {
      if (!data){
        res.status(400).json({message : 'User Does not Exist'})
      }else{
        res.status(200).json({message : 'Success', n : data.wins.length, wins : data['wins']})
      }
    })
  })

  // Get A Prompt by ID
  app.get('/prompt/:n', (req, res) => {
    const n = parseInt(req.params.n);
    questions.findOne({n : n}).then( data => {
      if (!data){
        res.status(400).json({ message : 'Question Does not Exist'})
      }else{
        res.status(200).json({ message : 'Success', prompt : data['prompt']})
      }
    })
  })

  // Add an Image to A User's Collection (If Doesn't Already Exist)
  app.post('/win', (req, res) => {
    const user = req.body.user.toString();
    const gif = req.body.gif.toString();
    users.findOneAndUpdate({user : user}, { $addToSet : {wins : gif}}).then( data => {
      if (data.value){
        res.status(201).json({ message : 'GIF Added to Collection'})
      }else{
        res.status(400).json({ message : 'User Does not Exist'})
      }
    })
  })

});

// Websockets
io.on('connection', (socket) => {
  console.log('A User Connected')

  socket.on('joinGame', socket => {

  })

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



// Listen 
// const port = process.env.PORT || 3000;
server.listen(3000, () => {
    console.log("Server is listening on port 3000");
});
