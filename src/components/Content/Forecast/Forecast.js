import React from 'react';
import style from './forecast.module.scss';
import celsiusLogo from "../../../assets/celsius.png";
import cloudsLogo from "../../../assets/clouds.png";
import mistLogo from "../../../assets/mist.png";
import rainLogo from "../../../assets/rain.png";
import sunLogo from "../../../assets/sun.png";

const Forecast = (props) => {
    console.log("Props forecast: ", props);
    let Weather = [];
    let data = {}
    if (props.searchResult.data.weather) {
        console.log("Obj",  props.searchResult.data.weather[0]);
        Weather = props.searchResult.data.weather[0];
        switch (Weather.main) {
            case "Thunderstorm":
            case "Rain":
                Weather.img = rainLogo;
                break;
            case "Fog":
            case "Mist":
                Weather.img = mistLogo;
                break;
            case "Clear":
            case "Haze":
                Weather.img = sunLogo;
                break;
            case "Clouds":
                Weather.img = cloudsLogo;
                break;
            default:
                Weather.img = sunLogo;
        }
        data = props.searchResult.data;
    }

    return (
        <div className={style.forecastWrapper}>
            <div className={props.searchResult.isFetching ? style.visibleBlock : style.visibleBlockOpen}>
                <div className={style.city}>
                    <h2>{data.city}</h2>
                </div>
                <div className={style.degreesWrapper}>
                    <div className={style.celsius}>
                        <div className={style.celsiusDegrees}>
                            {data.celsius}
                            <img src={celsiusLogo} alt="Celsius" />
                        </div>
                        <div className={style.feelsLike}>
                            Feels like {data.feelsLike} °C
                            </div>
                        <div className={style.weatherDescr}>
                            {Weather.description}
                        </div>
                        <div className={style.wind}>
                            Wind: {data.wind} m/s
                            </div>
                    </div>
                    <div className={style.weatherImg}>
                        <img src={Weather.img} alt="Weather ico" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Forecast;