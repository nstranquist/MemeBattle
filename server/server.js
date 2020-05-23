const express = require('express');
const bodyParser = require('body-parser');

// Create Express App
const app = express();

// Parse Form Requests and JSON Requests
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())



// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Hello World' })
})

// Websockets


// Listen 
app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});