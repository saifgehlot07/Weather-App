"use Strict";

// Elemet Selection.
const ctx = document.getElementById("weather__chart");
const windSpeed = document.getElementById("wind-speed");
const humidity = document.getElementById("humidity");
const pressure = document.getElementById("pressure");
const cityName = document.getElementById("city");
const stateName = document.getElementById("state");
const currentTimeData = document.getElementById("current-time");
const weatherType = document.getElementById("weather-type");
const celciusData = document.getElementById("celcius");
const feelsLike = document.getElementById("feels-like");
const sunriseData = document.getElementById("sunrise");
const sunsetData = document.getElementById("sunset");
const searchWeather = document.getElementById("search");
const API_KEY = "cdebb052c677cf0c147cc942b56bbd0d";

// Chart.js Library.
const myChart = new Chart(ctx, {
  type: "line",
  data: {
    labels: ["Min. temp", "Max. temp"],
    datasets: [
      {
        label: "temperature",
        data: [],
        borderWidth: 2,
      },
    ],
  },
  options: {
    scales: {
      y: {
        beginAtZero: true,
        max: 30,
      },
    },
  },
});

// Showing Weather Data On Page From API.
const showWeatherData = (data) => {
  const sunriseUnixTime = data.sys.sunrise;
  const sunsetUnixTime = data.sys.sunset;
  const tempMin = data.main.temp_min;
  const tempMax = data.main.temp_max;

  windSpeed.innerHTML = `${data.wind.speed} m/s`;
  pressure.innerHTML = `${data.main.pressure} hpa`;
  humidity.innerHTML = `${data.main.humidity}%`;
  celciusData.innerHTML = `${parseInt(data.main.temp)}°C`;
  cityName.innerHTML = `${data.name}, ${data.sys.country}`;
  weatherType.innerHTML = `${data.weather[0].main}`;
  feelsLike.innerHTML = `${data.main.feels_like}°C`;
  sunriseData.innerHTML = `${new Date(sunriseUnixTime * 1000)
    .toLocaleTimeString()
    .substring(0, 4)} AM`;
  sunsetData.innerHTML = `${new Date(sunsetUnixTime * 1000)
    .toLocaleTimeString()
    .substring(0, 4)} PM`;

  myChart.data.datasets[0].data = [tempMin, tempMax];
  myChart.update();
};

// Fetching API From OpenWeather Website.
const fetchFromApi = (place) => {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${place}&units=metric&appid=${API_KEY}`
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      showWeatherData(data);
      fetchOneCallApi(data);
    });
};

// // Fetching One Call API From OpenWeather Website.
// const fetchOneCallApi = (data) => {
//   fetch(
//     `https://api.openweathermap.org/data/3.0/onecall?lat=${data.coord.lat}&lon=${data.coord.lon}&exclude=hourly,minutly&appid=${API_KEY}`
//   )
//     .then((response) => response.json())
//     .then((data) => {
//       console.log(data);
//     });
// };

// Displaying Data When the User Inserts Value Of Any Place And Hits Enter.
searchWeather.addEventListener("keydown", (e) => {
  if (e.key == "Enter") {
    const place = e.target.value;
    fetchFromApi(place);
  }
});

// LocalStorage.
localStorage.removeItem(fetchFromApi(), showWeatherData());
