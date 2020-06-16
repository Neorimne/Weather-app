import React, { useState, useEffect  } from 'react';
import SearchField from './SearchField/SearchField';
import GetButton from './getButton/GetButton';
import style from './content.module.scss';
import Forecast from './Forecast/Forecast';



const Content = (props) => {
    const [isFetching, setIsFetching] = useState(props.searchData.isFetching);
    const [searchInput, setSearchInput] = useState('');
    
    useEffect (() => {
        setIsFetching(props.searchData.isFetching)
    }, [props.searchData.isFetching]);

    const handleInput = (e) => {
        setSearchInput(e.target.value);
        props.setIsFetching(true);
    }
    const getData = () => {
        if (searchInput){
            props.getData(searchInput);
            setSearchInput('');
        }
        else setSearchInput('You should type your location here!');
    }
    
    return (
        <div className={style.contentWrapper}>
            <div className={style.inputWrapper}>
                <SearchField value={searchInput} 
                handleInput={handleInput}
                 />
                <GetButton getForecast={getData} />
            </div>
            <div className={style.content}>  
             <Forecast searchResult={props.searchData} />
            </div>
        </div>
    )
};

export default Content;