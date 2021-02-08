import React, { useCallback, useEffect, useState } from "react";
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
import {
  CitiesDataType,
  citiesSelector,
  getCitiesData,
} from "../../redux/citiesReducer";
import { useDispatch, useSelector } from "react-redux";
import { getData } from "../../redux/searchDataReducer";
import throttle from "lodash/throttle";

type SearchFieldPropsType = {
  setChecked: (value: React.SetStateAction<boolean>) => void;
};

const useStyles = makeStyles({
  root: {
    position: "relative",
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
  autocompleteItemsContainer: {
    marginTop: "1px",
    position: "absolute",
    border: "1px solid #d4d4d4",
    borderBottom: "none",
    borderTop: "none",
    zIndex: 99,
    top: "100%",
    left: "0",
    right: "0",
  },
  autocompleteItem: {
    color: "black",
    padding: "10px",
    cursor: "pointer",
    backgroundColor: "#fff",
    borderBottom: "1px solid #d4d4d4",
    "&:hover": {
      backgroundColor: "#e9e9e9",
    },
  },
});

const SearchField = ({ setChecked }: SearchFieldPropsType) => {
  const classes = useStyles();

  const dispatch = useDispatch();
  const [searchInput, setSearchInput] = useState("");
  const [cities, setCities] = useState<CitiesDataType[] | undefined>([]);

  const citiesData = useSelector(citiesSelector);

  const throttled = useCallback(
    throttle((searchInput) => {
      dispatch(getCitiesData(searchInput));
    }, 850),
    []
  );
  useEffect(() => {
    if (searchInput && searchInput.length > 2) {
      throttled(searchInput);
    }
  }, [throttled, searchInput]);

  useEffect(() => {
    setCities(citiesData);
  }, [citiesData]);

  const [tooltipOpen, setTooltipOpen] = useState(false);
  const TooltipCloseHandler = () => {
    setTooltipOpen(false);
  };

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setSearchInput(event.target.value);
    setChecked(false);
    setTooltipOpen(false);
  };
  const onKeyClickHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && searchInput) {
      event.preventDefault();
      dispatch(getData(searchInput));
      setSearchInput("");
      setCities([]);
    } else if (event.key === "Enter" && !searchInput) setTooltipOpen(true);
  };
  const clickHandler = () => {
    if (searchInput) {
      dispatch(getData(searchInput));
      setSearchInput("");
      setCities([]);
    } else setTooltipOpen(true);
  };
  const onSuggestClick = (event: React.MouseEvent) => {
    if (event.currentTarget.textContent)
      setSearchInput(event.currentTarget.textContent);
  };
  return (
    <ClickAwayListener onClickAway={TooltipCloseHandler}>
      <Tooltip
        title="Dovresti inserire località qui!"
        arrow
        open={tooltipOpen}
        disableFocusListener
        disableHoverListener
        disableTouchListener
      >
        <Paper className={classes.root}>
          <Box className={classes.inputWrapper}>
            <input
              placeholder="Cerca città!"
              className={classes.input}
              value={searchInput}
              onChange={handleInput}
              onKeyDown={onKeyClickHandler}
            ></input>
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
          <div className={classes.autocompleteItemsContainer}>
            {cities ? (
              cities.map((cityItem) => (
                <div
                  key={cityItem.id}
                  className={classes.autocompleteItem}
                  onClick={onSuggestClick}
                >
                  {cityItem.city}, {cityItem.countryCode}
                </div>
              ))
            ) : (
              <div />
            )}
          </div>
        </Paper>
      </Tooltip>
    </ClickAwayListener>
  );
};

export default SearchField;
