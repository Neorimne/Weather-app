import style from './searchField.module.scss'
import React from 'react';

const SearchField = (props) => {
    return (
        <div className={style.flexbox}>
            <div className={style.search}>
                <div>
                    <input type="text" name="searchField" value={props.value} onChange={props.handleInput} ref={props.ref}  required />
                </div>
            </div>
        </div>
    )
}

export default SearchField;