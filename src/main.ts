import { z } from 'zod';
import './index.css';
import { camelCasefyObj } from './lib/camelCasefyObj';
import { safeQuerySelector } from './lib/safeQuerySelector';
import { transformToError } from './lib/transformToError';

const images = {
  clear: './assets/sun.png',
  rain: './assets/raining.png',
  clouds: './assets/cloud.png',
  mist: './assets/fog.png',
};

const WeatherSchema = z.object({
  coord: z.object({
    lon: z.number(),
    lat: z.number(),
  }),
  weather: z.array(z.object({
    id: z.number(),
    main: z.string().toLowerCase(),
    description: z.string(),
    icon: z.string(),
  }).transform(val => ({
    ...val,
    weatherImgSrc: val.main in images ? images[val.main as keyof typeof images] : val.main
  })
  )),
  main: z.object({
    temp: z.number(),
    feelsLike: z.number().optional(),
    tempMin: z.number(),
    tempMax: z.number(),
    pressure: z.number(),
    humidity: z.number(),
  }),
  wind: z.object({
    speed: z.number(),
    deg: z.number(),
  }),
});

class WeatherApp {
  #city = ''

  #searchBtn = safeQuerySelector(document.querySelector('button#btn-search'));
  #searchInput = safeQuerySelector(document.querySelector('input#input-search'));
  #tempCity = safeQuerySelector(document.querySelector('#temp-city'));
  #weatherCityInfo = safeQuerySelector(document.querySelector('#weather-city-info'));
  #windText = safeQuerySelector(document.querySelector('#wind'));
  #humText = safeQuerySelector(document.querySelector('#hum'));
  #imgInfo = safeQuerySelector(document.querySelector<HTMLImageElement>('.img-info'));

  #errorMessageElement = safeQuerySelector(document.querySelector('#error-message'))
  #errorTimeout: ReturnType<typeof setTimeout> | null = null

  private constructor() {
    this.#searchBtn.addEventListener("click", this.#updateWeatherEl.bind(this));
  }

  async #updateWeatherEl() {
    this.#clearErrorMessage()


    this.#city = this.#searchInput.value;
    try {
      const {
        main: { temp, humidity },
        weather: [{ main: weatherInfo, weatherImgSrc }],
        wind: { speed },
      } = await this.#getWeather()

      this.#tempCity.innerHTML = `${Math.round(temp)}<i class='fa-solid fa-temperature-low'></i>`;
      this.#weatherCityInfo.textContent = weatherInfo;
      this.#windText.innerHTML = `<i class="fa-solid fa-wind"></i>${speed}m/s`;
      this.#humText.innerHTML = `<i class="fa-sharp fa-solid fa-droplet"></i>${humidity}%`;

      this.#imgInfo.src = weatherImgSrc;

    } catch (e) {
      console.log('Error: ', e);
      this.#displayErrorMessage('An error occurred. Please try again later.')
    }
  }

  async #getWeather() {
    const params = new URLSearchParams({
      units: 'metric',
      q: this.#city,
      appid: import.meta.env.VITE_WEATHER_API_KEY,
    });
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?${params}`);
      const weather = await response.json();

      const camelCasedWeather = camelCasefyObj(weather);
      console.log("🚀 ~ file: main.ts:97 ~ WeatherApp ~ #getWeather ~ camelCasedWeather:", camelCasedWeather)
      const validatedWeather = WeatherSchema.parse(camelCasedWeather);
      return validatedWeather;
    } catch (error) {
      console.error('Weather validation failed: ', error);
      throw transformToError(error);
    }
  }

  #displayErrorMessage(message: string) {
    this.#errorMessageElement.textContent = message;

    const TIME_TO_CLEAR = 5_000

    this.#errorTimeout = setTimeout(() => {
      this.#clearErrorMessage();
    }, TIME_TO_CLEAR);
  }

  #clearErrorMessage() {
    if (this.#errorTimeout) {
      clearTimeout(this.#errorTimeout);
    }

    this.#errorMessageElement.textContent = '';
  }

  static init() {
    return new WeatherApp()
  }
}

WeatherApp.init()
