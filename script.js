const apiKey = "60c6cb9a322bf029bab97caa1a7a9055";

const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityInput");
const cityName = document.getElementById("cityName");
const temp = document.getElementById("temp");
const condition = document.getElementById("condition");
const icon = document.getElementById("icon");
const error = document.getElementById("error");
const cityList = document.getElementById("cityList");

let history = JSON.parse(localStorage.getItem("history")) || [];

// Page load par history show karo
history.forEach(function (city) {
  addCityToList(city);
});

// Search Button
searchBtn.addEventListener("click", function () {
  let city = cityInput.value.trim();

  if (city !== "") {
    getWeather(city);
    cityInput.value = "";
  }
});

// Enter key
cityInput.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    let city = cityInput.value.trim();

    if (city !== "") {
      getWeather(city);
      cityInput.value = "";
    }
  }
});

// Weather Fetch
async function getWeather(city) {
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    let response = await fetch(url);

    if (!response.ok) {
      throw new Error("City not found");
    }

    let data = await response.json();

    cityName.textContent = data.name;
    temp.textContent = `🌡️ ${data.main.temp} °C`;
    condition.textContent = data.weather[0].main;
    icon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

    error.textContent = "";

    // Duplicate history mat add karo
    if (!history.includes(data.name)) {
      history.push(data.name);

      localStorage.setItem("history", JSON.stringify(history));

      addCityToList(data.name);
    }
  } catch (err) {
    cityName.textContent = "";
    temp.textContent = "";
    condition.textContent = "";
    icon.src = "";
    error.textContent = "❌ City not found";
  }
}

// History me city add karo
function addCityToList(city) {
  let li = document.createElement("li");

  li.textContent = city;

  li.style.cursor = "pointer";

  li.addEventListener("click", function () {
    getWeather(city);
  });

  cityList.appendChild(li);
}
