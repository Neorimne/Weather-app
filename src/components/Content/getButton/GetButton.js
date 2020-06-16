import React from 'react';
import style from './getButton.module.scss';

const GetButton = (props) => {
    return (
        <div className={style.buttonWrapper}>
            <button className={style.button} onClick={props.getForecast} ><span>Get forecast! </span></button>
        </div>
    )
}

export default GetButton;