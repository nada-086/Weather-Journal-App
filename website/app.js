/* Global Variables */
let apiKey = '876220e4f878005823462c7ba3af45f1&units=imperial';
let baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear()

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

    pDate.innerHTML = data.date;
    pTemp.innerHTML = `${data.temp}&#8451;`;
    pDescription.innerHTML = data.description;

    document.getElementById("date").appendChild(pDate);
    document.getElementById("temp").appendChild(pTemp);
    document.getElementById("state").appendChild(pDescription);

  } catch(error){
    console.log(`Error: ${error}`);
  }
}

// Controller
const controller = () => {
  const zip = document.getElementById('zip').value;
  const country = document.getElementById('country').value;
  get(baseURL, zip, country, apiKey)
  .then(function (data) {
      let des = data.weather[0];
    post("/add", { date: newDate, temp: data.main.temp, description: des.description });
  })
  .then(function (newDate){
    updateUI()
  })
}

document.getElementById("generate").addEventListener('click', controller);