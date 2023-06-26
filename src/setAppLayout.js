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

export { tempCity };
export { weatherCitInfo };
export { windText };
export { humText };
export { imgInfo };
export { labelContentBox };
export { searchInputElement };
export { searchBtn };
export { Content };
