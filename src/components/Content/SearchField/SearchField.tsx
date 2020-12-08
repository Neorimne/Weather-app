import style from "./searchField.module.scss";
import React from "react";

type SearchFieldPropsType = {
  value: string;
  handleInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const SearchField = ({ value, handleInput }: SearchFieldPropsType) => {
  return (
    <div className={style.flexbox}>
      <div className={style.search}>
        <div>
          <input
            type="text"
            name="searchField"
            value={value}
            onChange={handleInput}
            required
          />
        </div>
      </div>
    </div>
  );
};

export default SearchField;
