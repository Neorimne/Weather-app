import React from "react";
import style from "./forecast.module.scss";
import celsiusLogo from "../../../assets/celsius.png";
import { IState } from "../../../redux/searchDataReducer";

type ForecastPropType = {
  searchResult: IState;
  WeatherImg: any;
};

const Forecast = ({ searchResult, WeatherImg }: ForecastPropType) => {
  if (searchResult.data) {
    return (
      <div className={style.forecastWrapper}>
        (
        <div>
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
        </div>
      </div>
    );
  } else {
    return <></>;
  }
};

export default Forecast;
