const wxTemp = document.querySelector(".js-wxTemp"),
  wxFeelsLike = document.querySelector(".js-wxFeelsLike"),
  wxLocation = document.querySelector(".js-wxLocation"),
  wxHumidity = document.querySelector(".js-wxHumidity"),
  wxWind = document.querySelector(".js-wxWind"),
  wxIcon = document.querySelector(".js-wxIcon"),
  img = wxIcon.querySelector("img");

const API_KEY = "a7e977fc9c18d838ab0f23543a04ec8e";
const COORDS = "coords";

function getWeather(lat, lon) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (json) {
      const place = json.name;
      const country = json.sys.country;
      const temp = json.main.temp;
      const feelsLike = json.main.feels_like;
      const humidity = json.main.humidity;
      const windSpeed = json.wind.speed;
      const icon = json.weather[0].icon;
      const iconURL = `http://openweathermap.org/img/wn/${icon}@2x.png`;
      img.setAttribute("src", iconURL);

      wxLocation.innerHTML = `${place}, ${country}`;
      wxTemp.innerHTML = `${temp} °C`;
      wxFeelsLike.innerHTML = `RealFeel</br> ${feelsLike} °C`;
      wxHumidity.innerHTML = `Humidity</br> ${humidity} %`;
      wxWind.innerHTML = `WindSpeed</br> ${windSpeed} m/s`;
    });
}

function saveCoords(coordsObj) {
  localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSuccess(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const coordsObj = {
    latitude,
    longitude,
  };
  saveCoords(coordsObj);
  getWeather(latitude, longitude);
}

function handleGeoError() {
  console.log("no location");
}

function askForCoords() {
  navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
}

function loadCoords() {
  const loadedCoords = localStorage.getItem(COORDS);
  if (loadedCoords === null) {
    askForCoords();
  } else {
    const parseCoords = JSON.parse(loadedCoords);
    getWeather(parseCoords.latitude, parseCoords.longitude);
  }
}

function init() {
  loadCoords();
}

init();
