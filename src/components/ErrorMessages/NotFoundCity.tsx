import React from "react";
import {
  Grid,
  Grow,
  makeStyles,
  Paper,
  Typography,
  useTheme,
} from "@material-ui/core";

type NotFoundCityPropType = {
  checked: boolean;
};

const NotFoundCity = ({ checked }: NotFoundCityPropType) => {
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
  });
  const classes = useStyles();

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
              Città non trovata!
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </Grow>
  );
};

export default NotFoundCity;
