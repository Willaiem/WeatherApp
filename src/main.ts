import './index.css';

const apiKey = "be5d2ef6c0eacdccf7009d7a29f6e3e9";
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const labelContentBox = document.querySelector(".label-container");
const tempCity = document.querySelector("#temp-city");
const weatherCitInfo = document.querySelector("#weather-city-info");
const windText = document.querySelector("#wind");
const humText = document.querySelector("#hum");
const imgInfo = document.querySelector(".img-info");
const searchInputElement = document.querySelector("#input-search");
const searchBtn = document.querySelector("#btn-serach");
const Content = document.querySelector(".main-content-box");

window.onload = () => {
  weatherCitInfo.classList.add("hidden-elements");
  tempCity.classList.add("hidden-elements");
  windText.classList.add("hidden-elements");
  humText.classList.add("hidden-elements");
  imgInfo.classList.add("hidden-elements");
  labelContentBox.classList.add("zoom-label-onload");
};


let inputSearchValue = document.querySelector("#input-search").value;

async function checkDataWheater(city) {
  if (city === "") {
    searchInputElement.classList.add("search-error");
    alert("City not found !");
  } else {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    let data = await response.json();

    if (!data.main) {
      alert("City not found !!");
    }
    ActiveElement();

    tempCity.innerHTML =
      Math.round(data.main.temp) +
      "<i class='fa-solid fa-temperature-low'></i>";
    weatherCitInfo.innerHTML = data.weather[0].description;
    windText.innerHTML =
      '<i class="fa-solid fa-wind"></i>' + data.wind.speed + "m/s";
    humText.innerHTML =
      '<i class="fa-sharp fa-solid fa-droplet"></i>' + data.main.humidity + "%";

    if (data.weather[0].main == "Clear") {
      imgInfo.src = "./img/sun.png";
    } else if (data.weather[0].main == "Rain") {
      imgInfo.src = "./img/raining.png";
    } else if (data.weather[0].main == "Clouds") {
      imgInfo.src = "./img/cloud.png";
    } else if (data.weather[0].main == "Mist") {
      imgInfo.src = "./img/fog.png";
    }
  }
}

const ActiveElement = () => {
  setTimeout(() => {
    weatherCitInfo.classList.remove("hidden-elements");
    tempCity.classList.remove("hidden-elements");
    windText.classList.remove("hidden-elements");
    humText.classList.remove("hidden-elements");
    imgInfo.classList.remove("hidden-elements");
  }, "200");
  Content.classList.add("active-content");
  labelContentBox.classList.remove("zoom-label-onload");
};

const TextHandler = (event) => {
  let newValue = event.target.value;
  inputSearchValue = newValue;
};

searchInputElement.addEventListener("change", TextHandler);
searchBtn.addEventListener("click", () => checkDataWheater(inputSearchValue));
