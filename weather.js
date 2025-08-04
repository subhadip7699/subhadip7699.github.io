
const userlocation = document.getElementById("userlocation"),
  converter = document.getElementById("converter"),
  weathericon = document.querySelector(".weathericon"),
  temperature = document.querySelector(".temperature"),
  feelslike = document.querySelector(".feelslike"),
  description = document.querySelector(".description"),
  Hvalue = document.getElementById("Hvalue"),
  Wvalue = document.getElementById("Wvalue"),
  SRValue = document.getElementById("SRValue"),
  SSValue = document.getElementById("SSValue"),
  Cvalue = document.getElementById("Cvalue"),
  UVvalue = document.getElementById("UVvalue"),
  Pvalue = document.getElementById("Pvalue"),
  forecast = document.querySelector(".forecast");


const WEATHER_API_ENDPOINT = "https://api.openweathermap.org/data/2.5/weather";
const WEATHER_ONECALL_ENDPOINT = "https://api.openweathermap.org/data/2.5/onecall";
const API_KEY = "0647dc1a664b158fb07e452e60b92a4b";

function finduserlocation() {
  const cityName = userlocation.value.trim() || "London"; // fallback to London
  fetch(`${WEATHER_API_ENDPOINT}?q=${cityName}&appid=${API_KEY}&units=metric`)
    .then((response) => response.json())
    .then((data) => {
      if (data.cod !== 200) {
        alert(data.message);
        return;
      }

      console.log(data);

      
      document.querySelector(".temperature").textContent = `${data.main.temp}°C`;
      document.querySelector(".feelslike").textContent = `Feels like: ${data.main.feels_like}°C`;
      document.querySelector(".description").textContent = data.weather[0].description;
      weathericon.innerHTML = `<img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png"/>`;

      Hvalue.textContent = `${data.main.humidity}%`;
      Wvalue.textContent = `${data.wind.speed} m/s`;
      Pvalue.textContent = `${data.main.pressure} hPa`;
      Cvalue.textContent = `${data.clouds.all}%`;

      const sunrise = new Date(data.sys.sunrise * 1000).toLocaleTimeString();
      const sunset = new Date(data.sys.sunset * 1000).toLocaleTimeString();
      SRValue.textContent = sunrise + " ";
      SSValue.textContent = sunset + " ";

      fetch(`${WEATHER_ONECALL_ENDPOINT}?lat=${data.coord.lat}&lon=${data.coord.lon}&exclude=current,minutely,hourly,alerts&appid=${API_KEY}&units=metric`)
        .then((res) => res.json())
        .then((forecastData) => {
          console.log("Forecast Data:", forecastData);

          
          forecast.innerHTML = "";

          forecastData.daily.slice(1, 7).forEach(day => {
            const dayName = new Date(day.dt * 1000).toLocaleDateString('en-US', { weekday: 'short' });
            const dayCard = `
              <div class="day">
                <h4>${dayName}</h4>
                <img src="https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" alt="">
                <p>${day.weather[0].description}</p>
                <p>Max: ${day.temp.max}°C</p>
                <p>Min: ${day.temp.min}°C</p>
              </div>
            `;
            forecast.innerHTML += dayCard;
          });

          
          UVvalue.textContent = `${forecastData.current.uvi}`;
        })
        .catch(err => console.error("One Call error:", err));
    })
    .catch(err => console.error("Weather API error:", err));
}
