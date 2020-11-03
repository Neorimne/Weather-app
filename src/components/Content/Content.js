import React, { useState } from 'react';
import SearchField from './SearchField/SearchField';
import GetButton from './getButton/GetButton';
import style from './content.module.scss';
import Forecast from './Forecast/Forecast';
import { useDispatch, useSelector } from 'react-redux';
import { getData, getSearchData } from '../../redux/searchDataReducer';

import cloudsLogo from "../../assets/clouds.png";
import mistLogo from "../../assets/mist.png";
import rainLogo from "../../assets/rain.png";
import sunLogo from "../../assets/sun.png";



const Content = () => {

    const dispatch = useDispatch();
    const [searchInput, setSearchInput] = useState('');
    const searchResult = useSelector(getSearchData);

   let WeatherImg;
   if (searchResult.status === "succeeded") {
     switch (searchResult.data.weather[0].main) {
         case "Thunderstorm":
         case "Rain":
             WeatherImg = rainLogo;
             break;
         case "Fog":
         case "Mist":
             WeatherImg = mistLogo;
             break;
         case "Clear":
         case "Haze":
             WeatherImg = sunLogo;
             break;
         case "Clouds":
             WeatherImg = cloudsLogo;
             break;
         default:
             WeatherImg = sunLogo;
       }
    };
    const handleInput = (e) => {
        setSearchInput(e.target.value);
    };
    const clickHandler = () => {
        if (searchInput){
            dispatch(getData(searchInput))
            setSearchInput('');
        }
        else setSearchInput('You should type your location here!');
    };
    return (
        <div className={style.contentWrapper}>
            <div className={style.inputWrapper}>
                <SearchField value={searchInput} 
                handleInput={handleInput}
                 />
                <GetButton getForecast={clickHandler} />
            </div>
            <div className={style.content}>  
             <Forecast searchResult={searchResult} WeatherImg={WeatherImg} />
            </div>
        </div>
    )
};

export default Content;