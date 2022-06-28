function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastDisplay = document.querySelector("#forecast");
  let forecastHTML = ``;
  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `
    <div class="row day1Temps">
        <div class="col-6 day1">${formatDay(forecastDay.dt)}</div>
        <div class="col-2">
          <ul>
            <li>High</li>
            <li>
              <em><strong class="forecast-day-high">${Math.round(
                forecastDay.temp.max
              )}ºF</strong></em>
            </li>
          </ul>
        </div>
        <div class="col-2">
          <ul>
            <li>Low</li>
            <li>
              <em><strong class="forecast-day-low">${Math.round(
                forecastDay.temp.min
              )}ºF</strong></em>
            </li>
          </ul>
        </div>
       <div class="col-2 forecast-emoji">
          <img src="http://openweathermap.org/img/wn/${
            forecastDay.weather[0].icon
          }@2x.png"
          alt="" width=35 />
        </div>
      </div>
  `;
    }
  });

  forecastDisplay.innerHTML = forecastHTML;
}

function getForecastData(coordinates) {
  let apiKey = "eb6bcf966cb5441d483acafc8350d5e6";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayForecast);
}

function displayMain(response) {
  let tempDisplay = document.querySelector("#main-temp");
  tempDisplay.innerHTML = Math.round(response.data.main.temp);
  let cityDisplay = document.querySelector("#main-city");
  cityDisplay.innerHTML = response.data.name;
  let descriptionDisplay = document.querySelector("#description");
  descriptionDisplay.innerHTML = response.data.weather[0].description;

  let funDescription = document.querySelector("#fun-description");
  if (
    response.data.weather[0].description === "clear sky" ||
    "few clouds" ||
    "few clouds: 11-25%" ||
    "scattered clouds: 25-50%" ||
    "scattered clouds" ||
    "broken clouds" ||
    "broken clouds: 51-84%" ||
    "overcast clouds" ||
    "overcast clouds: 85-100%" ||
    "fog"
  ) {
    funDescription.innerHTML = "Enjoy the day and wear your sunscreen!";
  } else if (
    response.data.weather[0].description === "thunderstorm" ||
    "thunderstorm with light rain" ||
    "thunderstorm with rain" ||
    "thunderstorm with heavy rain" ||
    "light thunderstorm" ||
    "heavy thunderstorm" ||
    "ragged thunderstorm" ||
    "thunderstorm with light drizzle" ||
    "thunderstorm with drizzle" ||
    "thunderstorm with heavy drizzle"
  ) {
    funDescription.innerHTML = "When thunder roars, go indoors.";
  } else if (
    response.data.weather[0].description === "mist" ||
    "light intensity drizzle" ||
    "drizzle" ||
    "heavy intensity drizzle" ||
    "light intensity drizzle rain" ||
    "drizzle rain" ||
    "heavy intensity drizzle rain" ||
    "shower rain and drizzle " ||
    "heavy shower rain and drizzle" ||
    "shower drizzle" ||
    "mist"
  ) {
    funDescription.innerHTML = "Wear your raincoat.";
  } else if (
    response.data.weather[0].description === "rain" ||
    "light rain" ||
    "moderate rain" ||
    "heavy intensity rain" ||
    "very heavy rain" ||
    "extreme rain" ||
    "freezing rain" ||
    "light intensity shower rain" ||
    "shower rain" ||
    "heavy intensity shower rain" ||
    "ragged shower rain"
  ) {
    funDescription.innerHTML = "Don't forget your umbrella.";
  } else if (
    response.data.weather[0].description === "light snow" ||
    "snow" ||
    "heavy snow" ||
    "sleet" ||
    "light shower sleet" ||
    "shower sleet" ||
    "light rain and snow" ||
    "rain and snow" ||
    "light shower snow" ||
    "shower snow" ||
    "heavy shower snow" ||
    "squalls"
  ) {
    funDescription.innerHTML = "Bundle up and stay warm.";
  } else if (
    response.data.weather[0].description === "smoke" ||
    "haze" ||
    "sand/dust whirls" ||
    "sand" ||
    "sand" ||
    "volcanic ash"
  ) {
    funDescription.innerHTML = "Mask up or stay safe inside";
  }

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
  if (sunriseMinute < 10) {
    sunriseMinute = `0${sunriseMinute}`;
  }
  let sunset = new Date(response.data.sys.sunset * 1000);
  let sunsetHour = sunset.getHours();
  let sunsetMinute = sunset.getMinutes();
  if (sunsetMinute < 10) {
    sunsetMinute = `0${sunsetMinute}`;
  }
  let sunriseDisplay = document.querySelector("#sunrise");
  sunriseDisplay.innerHTML = `${sunriseHour}:${sunriseMinute}`;
  let sunsetDisplay = document.querySelector("#sunset");
  sunsetDisplay.innerHTML = `${sunsetHour}:${sunsetMinute}`;

  fahrenheitTemp = response.data.main.temp;
  feelsLikeFahrenheitTemp = response.data.main.feels_like;

  getForecastData(response.data.coord);
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

function displayMetric(event) {
  event.preventDefault();
  let celsiusTemp = ((fahrenheitTemp - 32) * 5) / 9;
  let tempDisplay = document.querySelector("#main-temp");
  tempDisplay.innerHTML = Math.round(celsiusTemp);
  let celsiusFeelsLike = ((feelsLikeFahrenheitTemp - 32) * 5) / 9;
  let feelsLikeDisplay = document.querySelector("#feels-like");
  feelsLikeDisplay.innerHTML = Math.round(celsiusFeelsLike);
  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");
}

function displayImperial(event) {
  event.preventDefault();
  let tempDisplay = document.querySelector("#main-temp");
  tempDisplay.innerHTML = Math.round(fahrenheitTemp);
  let feelsLikeDisplay = document.querySelector("#feels-like");
  feelsLikeDisplay.innerHTML = Math.round(feelsLikeFahrenheitTemp);
  fahrenheitLink.classList.add("active");
  celsiusLink.classList.remove("active");
}

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

let fahrenheitTemp = null;
let feelsLikeFahrenheitTemp = null;

let searchForm = document.querySelector("#city-search-form");
searchForm.addEventListener("submit", displaySubmit);

let locationButton = document.querySelector("button");
locationButton.addEventListener("click", geoLocate);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayMetric);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayImperial);
