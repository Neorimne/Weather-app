import Axios from "axios";
import { WEATHER_API } from "../config";
const getWeatherData = async (city: string) => {
  let result;
  const config = {
    params: {
      q: city,
      lang: "it",
    },
    headers: {
      "x-rapidapi-host": WEATHER_API.HOST,
      "x-rapidapi-key": WEATHER_API.KEY,
    },
  };
  try {
    result = await Axios.get(
      `https://community-open-weather-map.p.rapidapi.com/weather`,
      config
    );
  } catch (error) {
    console.log(error);
    if (error.response.status === 404) {
      return error.response;
    }
  }

  if (result && result.status === 200) {
    return {
      celsius: Math.round(result.data.main.temp - 273.15),
      feelsLike: Math.round(result.data.main.feels_like - 273.15),
      city: result.data.name,
      weather: result.data.weather,
      wind: result.data.wind.speed,
    };
  }
};

export default getWeatherData;
