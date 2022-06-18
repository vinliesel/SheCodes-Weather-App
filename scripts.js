function displayMain(response) {
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
  let iconDisplay = document.querySelector("#icon");
  iconDisplay.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconDisplay.setAttribute("alt", response.data.weather[0].description);
  let sunrise = new Date(response.data.sys.sunrise * 1000);
  let sunriseHour = sunrise.getHours();
  let sunriseMinute = sunrise.getMinutes();
  let sunset = new Date(response.data.sys.sunset * 1000);
  let sunsetHour = sunset.getHours();
  let sunsetMinute = sunset.getMinutes();
  let sunriseDisplay = document.querySelector("#sunrise");
  sunriseDisplay.innerHTML = `${sunriseHour}:${sunriseMinute}`;
  let sunsetDisplay = document.querySelector("#sunset");
  sunsetDisplay.innerHTML = `${sunsetHour}:${sunsetMinute}`;
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

function displaySubmit(event) {
  event.preventDefault();
  let searchedCity = document.querySelector("#searched-city");
  search(searchedCity.value);
}

function search(city) {
  let units = "imperial";
  let apiKey = "eb6bcf966cb5441d483acafc8350d5e6";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(displayMain);
}

let searchForm = document.querySelector("#city-search-form");
searchForm.addEventListener("submit", displaySubmit);

function geoLocate() {
  navigator.geolocation.getCurrentPosition(locate);
}
function locate(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "eb6bcf966cb5441d483acafc8350d5e6";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;

  axios.get(apiUrl).then(displayMain);
}

let locationButton = document.querySelector("button");
locationButton.addEventListener("click", geoLocate);
