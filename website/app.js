/* Global Variables */
const apiKey = '';  // Your apiKey + "&units=imperial"
let baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 + '.' + d.getDate() + '.' + d.getFullYear()

const get = async (url, zip, country, key) => {
  const res = await fetch(`${url}${zip},${country}&appid=${key}`);
  try {
    const data = res.json();
    return data;
  }
  catch (error) {
    console.log(`Error: ${error}`);
  }
}

const post = async (url = '', data = {}) => {
  console.log(JSON.stringify(data));
  const response = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  try {
    const newData = await response.json();
    return newData;
  }
  catch (error) {
    console.log(`Error: ${error}`);
  }
}

const updateUI = async () => {
  const req = await fetch("/all");
  try {
    const data = await req.json();
    const pDate = document.createElement('p');
    const pTemp = document.createElement('p');
    const pDescription = document.createElement('p');
    const pFeel = document.createElement('p');


    pDate.innerHTML = data.date;
    pTemp.innerHTML = `${Math.round(data.temp)}&#8457;`;
    pDescription.innerHTML = data.description;
    pFeel.innerHTML = data.feelings;

    document.getElementById("date").appendChild(pDate);
    document.getElementById("temp").appendChild(pTemp);
    document.getElementById("state").appendChild(pDescription);
    document.getElementById("feel").appendChild(pFeel);

  } catch(error){
    console.log(`Error: ${error}`);
  }
}

// Controller
const controller = () => {
  const zip = document.getElementById('zip').value;
  const country = document.getElementById('country').value;
  const feelings = document.getElementById('feelings').value;
  if (zip && country && feelings) {
    get(baseURL, zip, country, apiKey)
    .then(function (data) {
      let des = data.weather[0];
      post("/add", { date: newDate, temp: data.main.temp, description: des.description, feelings: feelings });
    })
    .then(function (newDate){
      updateUI()
    })
  }
}

document.getElementById("generate").addEventListener('click', controller);