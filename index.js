function formatDate(timestamp) {
  let now = new Date(timestamp);
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
let day = days[now.getDay()];
return `${day} ${formatHours(timestamp)}`;
currentDate.innerHTML = `${day} ${hours}:${minutes}`;

function formatHours(timestamp) {
  let now = new Date(timestamp);
  let currentDate = document.querySelector("#current-date");

  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }

  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
}
return `${hours}:${minutes}`;

function showWeather(response) {
  console.log(response.data.weather[0].icon);
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temp").innerHTML = Math.round(
    response.data.main.temp
  );

  celsiusTemperature = response.data.main.temp;

  document.querySelector("#humidity").innerHTML = Math.round(
    response.data.main.humidity
  );
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
  dataElemement.innerHTML = formatDate(response.data.dt * 1000);

  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}
function showForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = null;
  let forecast = null;
  let forecast = response.data.list[0];
  for (let index = 0; index < 6; index++) {
    forecast = response.data.list[index];
    forecastElement.innerHTML = `<div class="card col-2" id="forecast">
                        <div class="card-body">

                            <h5 class="card-title">${fortmatHours(
                              forecast.dt * 1000
                            )}</h5>
                            <h6 class="card-subtitle mb-2 text-muted"> <img
                                    src="http://openweathermap.org/img/wn/${
                                      forecast.weather[0].icon
                                    }@2x.png" /></h6>
                            <p class="card-text"> <span class="temperature">${Math.round(
                              forecast.main.temp_max
                            )}°C / ${Math.round(
      forecast.main.temp_min
    )}°C</span></p>

                        </div>
                    </div>`;
  }
}

function searchCity(city) {
  let apiKey = "cc0c04c662ada3cd15e0c73cbe9dece0";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
  apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showForecast);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-text-input").value;
  searchCity(city);

  let searchInput = document.querySelector("#search-text-input");
  console.log(searchInput.value);
  let h2 = document.querySelector("h2");
  h2.innerHTML = `${searchInput.value}`;
}
let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

function searchLocation(position) {
  let apiKey = "cc0c04c662ada3cd15e0c73cbe9dece0";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}
// celsius and fahrenheit

function ShowFahrenheitTemperature(event) {
  event.preventDefault();
  let tempElement = document.querySelector("#temp");

  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  tempElement.innerHTML = Math.round(fahrenheitTemperature);
}

function ShowCelsiusTemperature(event) {
  event.preventDefault();

  let tempElement = document.querySelector("#temp");
  tempElement.innerHTML = Math.round(celsiusTemperature);
}

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", ShowFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", ShowCelsiusTemperature);

// end celsius and fahrenheit

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}
let currentLocation = document.querySelector("#current-location");
currentLocation.addEventListener("click", getCurrentLocation);

searchCity("New York");
