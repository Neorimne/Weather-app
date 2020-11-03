import React, { useEffect, useState } from 'react';
import style from './forecast.module.scss';
import celsiusLogo from "../../../assets/celsius.png";


const Forecast = ({searchResult, WeatherImg}) => {

    const [isFetching, setIsFetching] = useState(false);
    useEffect(() => {
        if (searchResult.status === 'succeeded') setIsFetching(true);
    }, [searchResult.status]);

    return (
        <div className={style.forecastWrapper}>
            { isFetching ? <div>
                <div className={style.city}>
                    <h2>{searchResult.data.city}</h2>
                </div>
                <div className={style.degreesWrapper}>
                    <div className={style.celsius}>
                        <div className={style.celsiusDegrees}>
                            {searchResult.data.celsius}
                            <img src={celsiusLogo} alt="Celsius" />
                        </div>
                        <div className={style.feelsLike}>
                            Feels like {searchResult.data.feelsLike} °C
                            </div>
                        <div className={style.weatherDescr}>
                            {searchResult.data.weather[0].description}
                        </div>
                        <div className={style.wind}>
                            Wind: {searchResult.data.wind} m/s
                            </div>
                    </div>
                    <div className={style.weatherImg}>
                        <img src={WeatherImg} alt="Weather ico" />
                    </div>
                </div>
            </div> : <div></div>}
        </div>
    )
}

export default Forecast;