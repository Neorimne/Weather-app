import React, { useEffect, useState } from "react";
import SearchField from "./SearchField/SearchField";
import Forecast from "./Forecast/Forecast";
import { useDispatch, useSelector } from "react-redux";
import { getData, getSearchData } from "../redux/searchDataReducer";

import cloudsLogo from "../assets/clouds.png";
import mistLogo from "../assets/mist.png";
import rainLogo from "../assets/rain.png";
import sunLogo from "../assets/sun.png";
import snowLogo from "../assets/snow.png";

import {
  Button,
  ButtonGroup,
  Grid,
  makeStyles,
  Typography,
  useTheme,
} from "@material-ui/core";
import RecentPlaces from "./RecentPlaces/RecentPlaces";
import usePosition from "../utils/usePosition";
import getCityByGeo from "../api/getCityByGeo";

const Content = () => {
  //// Styles
  const theme = useTheme();
  const useStyles = makeStyles({
    root: {
      [theme.breakpoints.down("xs")]: {
        padding: "10px 10px",
      },
    },
    searchFieldWrapper: {
      [theme.breakpoints.down("xs")]: {
        order: 3,
        marginTop: "10px",
      },
    },
    headerWrapper: {
      padding: "10px 0px",
    },
    languageIconWrapper: {
      textAlign: "end",
    },
    headerTitleWrapper: {
      [theme.breakpoints.down("xs")]: {
        fontSize: "12px",
      },
    },

    languageIcon: {
      color: "white",
    },
  });

  const dispatch = useDispatch();

  const classes = useStyles();

  const searchResult = useSelector(getSearchData);

  const [celsiusScale, setScale] = useState(true);

  const { latitude, longitude, error }: any = usePosition();

  useEffect(() => {
    async function dispatchGeoFunction() {
      const cityByGeoData = await getCityByGeo(latitude, longitude);
      if (cityByGeoData) {
        const cityByGeo = cityByGeoData.data[0].city;
        dispatch(getData(cityByGeo));
      }
    }
    if (!error && latitude && longitude) {
      dispatchGeoFunction();
    } else if (error) {
      console.log("Error with geo: ", error);
    }
  }, [error, latitude, longitude, dispatch]);

  // Weather Icon switch

  let WeatherImg: string | undefined;
  if (searchResult.data && searchResult.status === "succeeded") {
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
      case "Snow":
        WeatherImg = snowLogo;
        break;
      default:
        WeatherImg = cloudsLogo;
    }
  }

  // Transition

  const [checkedTransition, setCheckedTransition] = useState(true);

  useEffect(() => {
    if (searchResult.status === "succeeded" || "rejected") {
      setCheckedTransition(true);
    }
  }, [searchResult.status]);

  return (
    <Grid container justify="center" className={classes.root}>
      <Grid
        item
        component="header"
        container
        alignItems="center"
        xs={12}
        sm={10}
        justify="space-between"
        className={classes.headerWrapper}
      >
        <Grid item xs={6} sm={4}>
          <Typography
            color="textPrimary"
            variant="h6"
            className={classes.headerTitleWrapper}
          >
            Previsione Meteo App
          </Typography>
        </Grid>
        <Grid item xs={12} sm={4} className={classes.searchFieldWrapper}>
          <SearchField setChecked={setCheckedTransition} />
        </Grid>
        <Grid item xs={6} sm={4} className={classes.languageIconWrapper}>
          <ButtonGroup
            color="primary"
            aria-label="outlined primary button group"
            variant="contained"
          >
            <Button
              style={celsiusScale ? { border: "2px solid blue" } : {}}
              onClick={() => {
                setScale(true);
              }}
            >
              ℃
            </Button>
            <Button
              style={!celsiusScale ? { border: "2px solid blue" } : {}}
              onClick={() => {
                setScale(false);
              }}
            >
              °F
            </Button>
          </ButtonGroup>
        </Grid>
      </Grid>
      <Grid item xs={12} sm={10}>
        <RecentPlaces searchResultStatus={searchResult.status} />
      </Grid>
      <Grid item xs={12} sm={10}>
        <Forecast
          searchResult={searchResult}
          WeatherImg={WeatherImg}
          checked={checkedTransition}
          celsiusScale={celsiusScale}
        />
      </Grid>
    </Grid>
  );
};

export default Content;
