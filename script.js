const search = document.querySelector(".searchTerm");
const btn = document.querySelector(".searchButton");
const weatherCondition = document.querySelector(".weatherCondition");
const place = document.querySelector(".place");
const temperature = document.querySelector(".temperature");
const dateTime = document.querySelector(".date");
const humidity = document.querySelector("#humidity");
const sunset = document.querySelector("#sunset");
const pressure = document.querySelector("#pressure");
const windSpeed = document.querySelector("#wind");
const addIcon = document.getElementById("select");

function adddWeatherIcon(icon) {
  if (icon === "Haze") {
    addIcon.className = "wi wi-fog";
  } else if (icon === "Clear") {
    addIcon.className = "wi wi-day-sunny";
  } else if (icon === "Mist") {
    addIcon.className = "wi wi-dust";
  } else if (icon === "Clouds") {
    addIcon.className = "wi wi-day-cloudy";
  } else {
    addIcon.className = "wi wi-stars";
  }
}

btn.addEventListener("click", function () {
  const city = search.value;
  const currentTime = new Date().toLocaleString();
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=ec6644915aaf9a6a0ff0b0d54b105333`
  )
    .then((response) => {
      if (response.status >= 200 && response.status <= 299) {
        return response.json();
      } else {
        throw new Error(`Status : ${response.status} - City not Found`);
      }
    })
    .then((data) => {
      let date = new Date(data.sys.sunset * 1000);
      let sunsetTime = `${date.getHours()}:${date.getMinutes()}`;
      temperature.innerHTML = `<span>${data.main.temp}&deg;C</span>`;
      weatherCondition.innerHTML = `${data.weather[0].description}`;
      place.innerHTML = `${data.name}, ${data.sys.country}`;
      dateTime.innerHTML = `${currentTime}`;
      sunset.innerHTML = `${sunsetTime} <br /> Sunset`;
      humidity.innerHTML = `${data.main.humidity} <br /> Humidity`;
      pressure.innerHTML = `${data.main.pressure} <br /> Pressure`;
      windSpeed.innerHTML = `${data.wind.speed} <br /> Wind`;
      adddWeatherIcon(data.weather[0].main);
    })
    .catch((error) => {
      alert(error.message);
    });
});
