
import  Axios  from 'axios';
const getWeatherData = async (searchData) => {
    const config = {
        method: 'get',
        url: `https://community-open-weather-map.p.rapidapi.com/weather?q=${searchData}`,
        headers: {
            "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com",
            "x-rapidapi-key": "4607821390msh1351d2de9664f2fp1e94e4jsnf5fabbe9678d",
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