import React, { useEffect, useState } from "react";
import SearchField from "./SearchField/SearchField";
import Forecast from "./Forecast/Forecast";
import { useSelector } from "react-redux";
import { getSearchData } from "../../redux/searchDataReducer";
import LanguageIcon from "@material-ui/icons/Language";

import cloudsLogo from "../../assets/clouds.png";
import mistLogo from "../../assets/mist.png";
import rainLogo from "../../assets/rain.png";
import sunLogo from "../../assets/sun.png";
import snowLogo from "../../assets/snow.png";

import { Grid, makeStyles, Typography, useTheme } from "@material-ui/core";

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
    forecastWrapper: {},
    languageIcon: {
      color: "white",
    },
  });

  const classes = useStyles();

  const searchResult = useSelector(getSearchData);

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
        WeatherImg = sunLogo;
    }
  }

  // Transition

  const [checked, setChecked] = useState(true);

  useEffect(() => {
    if (searchResult.status === "succeeded") {
      setChecked(true);
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
        <Grid
          item
          xs={12}
          sm={4}
          justify="center"
          className={classes.searchFieldWrapper}
        >
          <SearchField setChecked={setChecked} />
        </Grid>
        <Grid item xs={6} sm={4} className={classes.languageIconWrapper}>
          <LanguageIcon className={classes.languageIcon} />
        </Grid>
      </Grid>
      <Grid item className={classes.forecastWrapper} xs={12} sm={10}>
        <Forecast
          searchResult={searchResult}
          WeatherImg={WeatherImg}
          checked={checked}
        />
      </Grid>
    </Grid>
  );
};

export default Content;
