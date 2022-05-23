let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let months = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];

let today = new Date();
let day = days[today.getDay()];
let month = months[today.getMonth()];
let date = today.getDate();
let hour = today.getHours();
let minute = today.getMinutes();
if (minute < 10) {
  minute = `0${minute}`;
}
let todayDate = document.querySelector("#today");
todayDate.innerHTML = `${day} ${month}/${date} at ${hour}:${minute}`;

let searchCity = document.querySelector("#city-search");
searchCity.addEventListener("submit", cityDisplay);

function cityDisplay(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#search-city");
  let searchedCity = document.querySelector("#searched-city");
  searchedCity.innerHTML = `${cityInput.value}`;
}

//Temp from city search

let cityTemp = document.querySelector("#city-search");
cityTemp.addEventListener("submit", cityTemperature);

function cityTemperature(event) {
  event.preventDefault();
  let cityTempInput = document.querySelector("#search-city");
  let units = "imperial";
  let apiKey = "eb6bcf966cb5441d483acafc8350d5e6";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityTempInput.value}
  &appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showTemperature);
}
function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let tempDisplay = document.querySelector("h5");
  tempDisplay.innerHTML = `${temperature}℉`;
}

//GeoLocate

let locationButton = document.querySelector("button");
locationButton.addEventListener("click", geoLocate);

function geoLocate() {
  navigator.geolocation.getCurrentPosition(locate);
}
function locate(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "eb6bcf966cb5441d483acafc8350d5e6";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;

  axios.get(apiUrl).then(showTemperatureAndCity);
}

function showTemperatureAndCity(response) {
  let temperature = Math.round(response.data.main.temp);
  let tempDisplay = document.querySelector("h5");
  tempDisplay.innerHTML = `${temperature}℉`;
  let name = response.data.name;
  let nameDisplay = document.querySelector("#searched-city");
  nameDisplay.innerHTML = `${name}`;
}
