console.log("Weather Forecasting");

const accessKey = "cd30f1a9ce633ffb26c52f75891bed55";
const baseURL = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
    console.log(city)
    var data = await callingApi(city);
    
    if (data!="") {

      document.querySelector(".city").innerHTML = data.name;
      document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°c";
      document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
      document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

      if (data.weather[0].main == "Clouds") {
        weatherIcon.src = "images/clouds.png";
      } else if (data.weather[0].main == "Haze") {
        weatherIcon.src = "images/drizzle.png";
      } else if (data.weather[0].main == "Clear") {
        weatherIcon.src = "images/clear.png";
      } else if (data.weather[0].main == "Humidity") {
        weatherIcon.src = "images/humidity.png";
      } else if (data.weather[0].main == "Mist") {
        weatherIcon.src = "images/mist.png";
      } else if (data.weather[0].main == "Rain") {
        weatherIcon.src = "images/rain.png";
      } else if (data.weather[0].main == "Snow") {
        weatherIcon.src = "images/snow.png";
      } 
    } 
    if (data === "") {
    console.log("City not found. Please enter a valid city name.");
    weatherIcon.src = "images/computer.png";
    document.querySelector(".city").innerHTML = "-";
    document.querySelector(".temp").innerHTML = "-°c";
    document.querySelector(".humidity").innerHTML = "-%";
    document.querySelector(".wind").innerHTML ="- km/h";
    }
    async function callingApi(city){
        const response = await fetch(baseURL + city + `&appid=${accessKey}`);
        if (response.ok) {
            const data = await response.json();
            return data;
        }
        return "";
    }
}
searchBox.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      checkWeather(searchBox.value);
    }
});

