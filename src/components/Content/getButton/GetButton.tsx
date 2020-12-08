import React from "react";
import style from "./getButton.module.scss";

type ButtonPropsType = {
  getForecast: () => void;
};

const GetButton = ({ getForecast }: ButtonPropsType) => {
  return (
    <div className={style.buttonWrapper}>
      <button className={style.button} onClick={getForecast}>
        <span>Get forecast! </span>
      </button>
    </div>
  );
};

export default GetButton;
