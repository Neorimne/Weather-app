import React from "react";
import { Box, Divider, IconButton, makeStyles, Paper } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { CitiesDataType } from "../../../redux/citiesReducer";

type SearchFieldPropsType = {
  value: string;
  cities: Array<CitiesDataType> | undefined;
  handleInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  clickHandler: () => void;
  onKeyClickHandler: (e: React.KeyboardEvent<HTMLInputElement>) => void;
};

const useStyles = makeStyles({
  root: {
    padding: "2px 0px",
    display: "flex",
    alignItems: "center",
    width: "100%",
    backgroundColor: "white",
  },
  inputWrapper: {
    marginLeft: "10px",
    flex: 1,
  },
  input: {
    width: "90%",
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 5,
    backgroundColor: "black",
  },
});

const SearchField = ({
  value,
  handleInput,
  clickHandler,
  cities,
  onKeyClickHandler,
}: SearchFieldPropsType) => {
  const classes = useStyles();
  return (
    <Paper className={classes.root}>
      <Box className={classes.inputWrapper}>
        <input
          placeholder="Search Forecast"
          className={classes.input}
          value={value}
          onChange={handleInput}
          list={"myInput"}
          onKeyDown={onKeyClickHandler}
        ></input>
        <datalist id="myInput">
          {cities ? (
            cities.map((cityItem) => (
              <option key={cityItem.id}>
                {cityItem.city}, {cityItem.countryCode}
              </option>
            ))
          ) : (
            <option></option>
          )}
        </datalist>
      </Box>

      <Divider className={classes.divider} orientation="vertical" />
      <IconButton
        type="button"
        onClick={clickHandler}
        className={classes.iconButton}
        aria-label="search"
        color="primary"
      >
        <SearchIcon />
      </IconButton>
    </Paper>
  );
};

export default SearchField;
