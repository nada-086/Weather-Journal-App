// Setup empty JS object to act as endpoint for all routes
projectData = {};
location = {};

// Require Express to run server and routes
const express = require('express');
const bodyParser = require('body-parser');

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
const port = 8000;
const server = app.listen(port, listening);
function listening() {
  console.log(`Server is running on port ${port}`);
}

// Location Requests
app.get('/location', function (req, res) {
  res.send(location);
}) 

app.post('/addLocation', function (req, res) {
  location = {
    lat: req.body.lat,
    lon: req.body.lon
  }
  req.send(location);
})

// Weather Requests
app.get('/all', function (req, res) {
  res.send(projectData);
});

app.post('/addWeather', function (req, res) {
  projectData = {
    date: req.body.date,
    temp: req.body.current.temp,
    feel: req.body.content
  };
  res.send(projectData);
});

