import { Chip, makeStyles, useTheme } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getData, getRecentCities } from "../../redux/searchDataReducer";

type RecentPlacesPropsType = {
  searchResultStatus: string;
};

const RecentPlaces = ({ searchResultStatus }: RecentPlacesPropsType) => {
  const [recentCities, setRecentCities] = useState<Array<string | null>>([]);
  const cities = useSelector(getRecentCities);

  useEffect(() => {
    if (searchResultStatus === "idle") {
      let citiesFromStorage: Array<string> = [];
      let keys = Object.keys(localStorage);
      for (let key of keys) {
        citiesFromStorage.push(key);
      }
      setRecentCities(citiesFromStorage);
    }
  }, [searchResultStatus]);

  useEffect(() => {
    if (searchResultStatus === "succeeded") {
      setRecentCities(cities);
    }
  }, [cities, searchResultStatus]);

  const theme = useTheme();
  const useStyles = makeStyles({
    root: {
      display: "flex",
      marginBottom: "10px",
      justifyContent: "center",
      flexWrap: "wrap",
      "& > *": {
        margin: theme.spacing(0.5),
      },
    },
  });
  const classes = useStyles();

  const dispatch = useDispatch();

  const clickHandler = (event: React.MouseEvent) => {
    if (event.currentTarget.textContent)
      dispatch(getData(event.currentTarget.textContent));
  };

  const removeHandler = (city: string | null) => {
    if (city) {
      localStorage.removeItem(city);
      setRecentCities(recentCities.filter((cityItem) => cityItem !== city));
    }
  };

  return (
    <div className={classes.root}>
      {recentCities.map((city, index) => {
        return (
          <Chip
            label={city}
            variant="outlined"
            onClick={clickHandler}
            onDelete={() => {
              removeHandler(city);
            }}
            key={index}
          />
        );
      })}
    </div>
  );
};

export default RecentPlaces;
