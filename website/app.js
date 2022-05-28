/* Global Variables */
let apiKey = '876220e4f878005823462c7ba3af45f1';
let baseURL = `https://api.openweathermap.org/data/3.0/onecall?`;

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear()

// Get Location
const getLocation = async (zip, key) => {
  const res = await fetch(`http://api.openweathermap.org/geo/1.0/zip?zip=${zip}&appid=${key}`);
  try {
    const data = await res.json();
    console.log(data);
  }
  catch (error) {
    console.log(`Error: ${error}`);
  }
}

// Weather Data
const getWeather = async (baseURL, lat, lon, key) => {
  const res = await fetch(`${baseURL}lat=${lat}&lon=${lon}&appid=${key}`);
  try {
    const data = await res.json();
    console.log(data);
  }
  catch (error) {
    console.log(`Error: ${error}`);
  }
}

const post = async (url = '', data = {}) => {
  console.log(data);
  const response = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  try {
    const newData = await response.json();
    console.log(newData);
    return newData;
  }
  catch (error) {
    console.log(`Error: ${error}`);
  }
}

// Update the UI
const updateUI = async() => {
  const req = await fetch("/all");
  try {
    const projectData = await req.json();
    document.getElementById('temp').innerHTML = Math.round(allData.temp)+ 'degrees';
    document.getElementById('content').innerHTML = allData.feel;
    document.getElementById("date").innerHTML =allData.date;
  }
  catch(error) {
    console.log(`Error: ${error}`);
  }
}

// Controller
const controller = (e) => {
  // e.preventDefault();
  console.log("running");
  const feelings = document.getElementById("feelings").value;
  const zip = document.getElementById("zip");
  getLocation(baseURL, zip, apiKey)
  .then(function (data){
    post('/addLocation', {lat: data.lat, lon: data.lon});
  })
  .then(function (data) {
    getWeather(baseURL, data.lat, data.lon, apiKey);
  })
  .then(function (newData){
    post("/addData", {date: newDate, temp: data.current.temp, content: feelings})
  })
  .then(function (data){
    updateUI();
  })
}

// Listening Click Event
document.getElementById("generate").addEventListener('click', controller);