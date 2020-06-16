
import  Axios  from 'axios';
import { API_HOST, API_KEY } from '../config';
const getWeatherData = async (searchData) => {
    const config = {
        method: 'get',
        url: `https://community-open-weather-map.p.rapidapi.com/weather?q=${searchData}`,
        headers: {
            "x-rapidapi-host": API_HOST,
            "x-rapidapi-key": API_KEY,
        }
    };
    
    const result = await Axios(config);
    return{
        celsius: Math.round(result.data.main.temp - 273.15),
        feelsLike: Math.round(result.data.main.feels_like - 273.15),
        city: result.data.name,
        weather: result.data.weather,
        wind: result.data.wind.speed

    };
};

export default getWeatherData;