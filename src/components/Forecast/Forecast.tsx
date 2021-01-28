import React from "react";
import { IState } from "../../redux/searchDataReducer";
import {
  Grid,
  Grow,
  makeStyles,
  Paper,
  Typography,
  useTheme,
} from "@material-ui/core";
import NotFoundCity from "../ErrorMessages/NotFoundCity";

type ForecastPropType = {
  searchResult: IState;
  WeatherImg: string | undefined;
  checked: boolean;
  celsiusScale: boolean;
};

const Forecast = ({
  searchResult,
  WeatherImg,
  checked,
  celsiusScale,
}: ForecastPropType) => {
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

  if (searchResult.data && searchResult.status === "succeeded") {
    const weatherDecription =
      searchResult.data.weather[0].description.charAt(0).toUpperCase() +
      searchResult.data.weather[0].description.slice(1);
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
            <Grid item xs={12} container alignItems="center">
              <Grid item xs={12} sm={6}>
                <Typography
                  className={classes.celsiusWrapper}
                  color="textPrimary"
                >
                  {celsiusScale
                    ? searchResult.data.celsius + " ℃"
                    : (searchResult.data.celsius * 9) / 5 + 32 + " °F"}
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
                Percepita{" "}
                {celsiusScale
                  ? searchResult.data.feelsLike + " ℃"
                  : (searchResult.data.feelsLike * 9) / 5 + 32 + " °F"}
              </Typography>
              <Typography paragraph color="textPrimary">
                {weatherDecription}
              </Typography>
              <Typography paragraph color="textPrimary">
                Vento: {searchResult.data.wind} m/s
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      </Grow>
    );
  } else if (searchResult.status === "rejected") {
    return <NotFoundCity checked={checked} />;
  } else return <></>;
};

export default Forecast;
