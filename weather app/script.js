const btn = document.getElementById("search-button");
const display = document.getElementById("weather-info");
const cache = new Map();

btn.addEventListener("click", () => {
  const city = document.getElementById("city-input").value.trim();
  if (city) {
    if (cache.has(city)) {
      displayWeather(cache.get(city), city);
    } else {
      getWeather(city);
    }
  } else {
    alert("Please enter a city name.");
  }
  display.style.display = "contents";
});

document.addEventListener("keydown", (e) => {
  const key = e.key;
  if (key == 'Enter') {
    const city = document.getElementById("city-input").value.trim();
    if (city) {
      if (cache.has(city)) {
        displayWeather(cache.get(city), city);
      } else {
        getWeather(city);
      }
    } else {
      alert("Please enter a city name.");
    }
    display.style.display = "contents";
  }
});

async function getWeather(city) {
  const apiKey = "RORpdRyq67JZ99amCIWvuCRW0EtFJhZR";
  const locationUrl = `https://api.tomorrow.io/v4/timelines?location=${city}&fields=temperature&fields=humidity&fields=uvIndex&fields=windSpeed&fields=weatherCode&timesteps=current&units=metric&apikey=${apiKey}`;

  try {
    const weatherResponse = await fetch(locationUrl);
    if (!weatherResponse.ok) {
      if (weatherResponse.status === 429) {
        throw new Error("Rate limit exceeded");
      } else {
        throw new Error("Network response was not ok");
      }
    }
    const weatherData = await weatherResponse.json();
    cache.set(city, weatherData);
    displayWeather(weatherData, city);
  } catch (error) {
    if (error.message === "Rate limit exceeded") {
      alert(
        "You have exceeded the rate limit for the API. Please try again later."
      );
    } else {
      alert("Error fetching weather data");
    }
    console.error("Fetch error:", error);
  }
}

function displayWeather(data, city) {
  const currentWeather = data.data.timelines[0].intervals[0].values;
  const weatherCode = currentWeather.weatherCode;
  const weatherDescriptions = {
    0: "Unknown",
    1000: "Clear, Sunny",
    1100: "Mostly Clear",
    1101: "Partly Cloudy",
    1102: "Mostly Cloudy",
    1001: "Cloudy",
    2000: "Fog",
    2100: "Light Fog",
    4000: "Drizzle",
    4001: "Rain",
    4200: "Light Rain",
    4201: "Heavy Rain",
    5000: "Snow",
    5001: "Flurries",
    5100: "Light Snow",
    5101: "Heavy Snow",
    6000: "Freezing Drizzle",
    6001: "Freezing Rain",
    6200: "Light Freezing Rain",
    6201: "Heavy Freezing Rain",
    7000: "Ice Pellets",
    7101: "Heavy Ice Pellets",
    7102: "Light Ice Pellets",
    8000: "Thunderstorm",
  };

  const weatherIcons = {
    Sunny: "fas fa-sun cd",
    "clear-day": "fas fa-sun clear-day cd",
    "clear-night": "fas fa-moon clear-night cn",
    "Partly Cloudy": "fas fa-cloud-sun pcd",
    "Light Rain": "fa-solid fa-cloud-rain lr",
    Drizzle: "fal fa-cloud-rain",
    Cloudy: "fas fa-cloud cloudy cloud",
    Rainy: "fas fa-cloud-rain rain",
    snow: "fas fa-snowflake snow",
  };

  const weatherDescription = weatherDescriptions[weatherCode] || "Unknown";
  const weatherIcon = weatherIcons[weatherDescription] || "fas fa-question";

  const weatherInfo = `
      <h2><i class="fa-solid fa-location-dot pin"></i>  ${city}</h2>
      <p class="temp">${currentWeather.temperature}°C</p>

      <div class="wd">
      <p><i class="${weatherIcon} icon"></i> Weather: ${weatherDescription}</p>
      <p><i class="fa-solid fa-droplet icon" style="color: #63E6BE;"></i> Humidity: ${currentWeather.humidity}%</p>
      <p><i class="fa-solid fa-wind icon"></i> Wind Speed: ${currentWeather.windSpeed} m/s</p>
      <p><i class="fa-solid fa-circle icon" style="color: #ffd642;"></i> UV Index: ${currentWeather.uvIndex}</p>
      </div>
      `;
  document.getElementById("weather-info").innerHTML = weatherInfo;
}

function handleError(data) {
  if (data.status === "404") {
    alert("City not found");
  } else {
    alert(`Error: ${data.message}`);
  }
}
