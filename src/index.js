import { tempCity } from "./setAppLayout.js";
import { weatherCitInfo } from "./setAppLayout.js";
import { windText } from "./setAppLayout.js";
import { humText } from "./setAppLayout.js";
import { imgInfo } from "./setAppLayout.js";
import { labelContentBox } from "./setAppLayout.js";
import { apiKey } from "./dataJsonInfo.js";
import { apiUrl } from "./dataJsonInfo.js";
import { searchInputElement } from "./setAppLayout.js";
import { searchBtn } from "./setAppLayout.js";
import { Content } from "./setAppLayout.js";

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
