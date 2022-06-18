function displayMain(response) {
  console.log(response.data);
  let tempDisplay = document.querySelector("#main-temp");
  tempDisplay.innerHTML = Math.round(response.data.main.temp);
  let cityDisplay = document.querySelector("#main-city");
  cityDisplay.innerHTML = response.data.name;
  let descriptionDisplay = document.querySelector("#description");
  descriptionDisplay.innerHTML = response.data.weather[0].description;
  let feelsLikeDisplay = document.querySelector("#feels-like");
  feelsLikeDisplay.innerHTML = Math.round(response.data.main.feels_like);
  let humidityDisplay = document.querySelector("#humidity");
  humidityDisplay.innerHTML = Math.round(response.data.main.humidity);
  let windDisplay = document.querySelector("#wind");
  windDisplay.innerHTML = Math.round(response.data.wind.speed);
  let todayDate = document.querySelector("#today");
  todayDate.innerHTML = `${day} ${month}/${date} at ${hour}:${minute}`;
}
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

let units = "imperial";
let apiKey = "eb6bcf966cb5441d483acafc8350d5e6";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Miami&appid=${apiKey}&units=${units}`;

axios.get(apiUrl).then(displayMain);
