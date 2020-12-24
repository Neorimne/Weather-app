import React from "react";
import { IState } from "../../../redux/searchDataReducer";
import {
  Grid,
  Grow,
  makeStyles,
  Paper,
  Typography,
  useTheme,
} from "@material-ui/core";

type ForecastPropType = {
  searchResult: IState;
  WeatherImg: string | undefined;
  checked: boolean;
};

const Forecast = ({ searchResult, WeatherImg, checked }: ForecastPropType) => {
  const theme = useTheme();
  const useStyles = makeStyles({
    root: {
      backgroundColor: "rgba(66, 66, 66, 0.1)",
      padding: "0px 10px",
    },
    cityWrapper: {
      textAlign: "center",
    },
    cityTextWrapper: {
      [theme.breakpoints.down("xs")]: {
        fontSize: "32px",
      },
    },
    degreesWrapper: {},
    celsiusWrapper: {
      fontSize: "8vw",
      [theme.breakpoints.down("xs")]: {
        fontSize: "32px",
        textAlign: "center",
      },
      [theme.breakpoints.up("sm")]: {
        fontSize: "12vw",
      },
    },
    imgWrapper: {
      textAlign: "center",
    },
    img: {
      maxWidth: "100%",
      height: "auto",
    },
    weatherInfoWrapper: {
      padding: "0px 10px",
      [theme.breakpoints.down("xs")]: {
        fontSize: "32px",
        textAlign: "center",
      },
    },
  });
  const classes = useStyles();

  if (searchResult.data) {
    return (
      <Grow in={checked} timeout={1000}>
        <Paper className={classes.root} elevation={3} variant="outlined">
          <Grid container alignItems="center">
            <Grid item className={classes.cityWrapper} xs={12}>
              <Typography
                variant="h2"
                color="textPrimary"
                className={classes.cityTextWrapper}
              >
                {searchResult.data.city}
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
              className={classes.degreesWrapper}
              container
              alignItems="center"
            >
              <Grid item xs={12} sm={6}>
                <Typography
                  className={classes.celsiusWrapper}
                  color="textPrimary"
                >
                  {searchResult.data.celsius}°C
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6} className={classes.imgWrapper}>
                <img
                  src={WeatherImg}
                  alt="Weather ico"
                  className={classes.img}
                />
              </Grid>
            </Grid>
            <Grid item className={classes.weatherInfoWrapper} xs={12}>
              <Typography paragraph color="textPrimary">
                Feels like {searchResult.data.feelsLike} °C
              </Typography>
              <Typography paragraph color="textPrimary">
                {searchResult.data.weather[0].description}
              </Typography>
              <Typography paragraph color="textPrimary">
                Wind: {searchResult.data.wind} m/s
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      </Grow>
    );
  } else {
    return <></>;
  }
};

export default Forecast;
