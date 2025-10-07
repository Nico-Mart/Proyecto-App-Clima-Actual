const urlBase = `https://api.openweathermap.org/data/2.5/weather`;

let API_KEY = "2d5f9cd0c1ed032a639e04ddebb65ebb";

const difflving = 273.15;

document.getElementById("serchButton").addEventListener("click", () => {
  const city = document.getElementById("cityInput").value;
  const errorMsg = document.getElementById("errorMsg");
  if (city.trim() !== "") {
    errorMsg.textContent = "";
    errorMsg.classList.remove("visible");
    fetchWeatherData(city);
  } else {
    errorMsg.textContent = "Por favor, ingrese una ciudad.";
    errorMsg.classList.add("visible");
    // Reinicia la animación shake si se vuelve a mostrar
    errorMsg.style.animation = "none";
    void errorMsg.offsetWidth; // Trigger reflow
    errorMsg.style.animation = null;
  }
});

function fetchWeatherData(city) {
  const url = `${urlBase}?q=${city}&appid=${API_KEY}&lang=es`;
  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error en la respuesta de la API");
      }
      return response.json();
    })
    .then((data) => {
      return showWeatherData(data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function showWeatherData(data) {
  const divResponseData = document.getElementById("responseData");
  divResponseData.style.display = "block"; // Mostrar el div
  const icon = data.weather[0].icon;
  const iconUrl = `https://openweathermap.org/img/wn/${icon}@4x.png`;
  divResponseData.innerHTML = `
    <h2>Clima en ${data.name}, ${data.sys.country}</h2>
    <img src="${iconUrl}" alt="icono clima" style="width:100px;height:100px;">
    <p>Temperatura: ${(data.main.temp - difflving).toFixed(2)} °C</p>
    <p>Descripción: ${data.weather[0].description}</p>
    <p>Humedad: ${data.main.humidity}%</p>
    <p>Viento: ${data.wind.speed} m/s</p>
  `;
}
