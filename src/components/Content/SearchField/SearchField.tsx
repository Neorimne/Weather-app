import React, { useEffect, useState } from "react";
import {
  Box,
  ClickAwayListener,
  Divider,
  IconButton,
  makeStyles,
  Paper,
  Tooltip,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { citiesSelector, getCitiesData } from "../../../redux/citiesReducer";
import { useDispatch, useSelector } from "react-redux";
import { getData } from "../../../redux/searchDataReducer";

type SearchFieldPropsType = {
  setChecked: (value: React.SetStateAction<boolean>) => void;
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

const SearchField = ({ setChecked }: SearchFieldPropsType) => {
  const classes = useStyles();

  const dispatch = useDispatch();
  const [searchInput, setSearchInput] = useState("");

  const cities = useSelector(citiesSelector);

  useEffect(() => {
    if (searchInput) {
      dispatch(getCitiesData(searchInput));
    }
  }, [searchInput, dispatch]);

  const [tooltipOpen, setTooltipOpen] = React.useState(false);
  const TooltipCloseHandler = () => {
    setTooltipOpen(false);
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setSearchInput(e.target.value);
    setChecked(false);
    setTooltipOpen(false);
  };
  const onKeyClickHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && searchInput) {
      e.preventDefault();
      dispatch(getData(searchInput));
      setSearchInput("");
    } else if (e.key === "Enter" && !searchInput) setTooltipOpen(true);
  };
  const clickHandler = () => {
    if (searchInput) {
      dispatch(getData(searchInput));
      setSearchInput("");
    } else setTooltipOpen(true);
  };

  return (
    <ClickAwayListener onClickAway={TooltipCloseHandler}>
      <Tooltip
        title="You should type location here!"
        arrow
        open={tooltipOpen}
        disableFocusListener
        disableHoverListener
        disableTouchListener
      >
        <Paper className={classes.root}>
          <Box className={classes.inputWrapper}>
            <input
              placeholder="Search Forecast"
              className={classes.input}
              value={searchInput}
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
      </Tooltip>
    </ClickAwayListener>
  );
};

export default SearchField;
