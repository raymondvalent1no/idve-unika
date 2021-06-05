import React from "react";
import { Link } from "react-router-dom";
import { AppBar, Typography } from "@material-ui/core";
import CopyrightIcon from "@material-ui/icons/Copyright";
import useStyles from "./styles";

const Footer = () => {
  const classes = useStyles();

  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
      <CopyrightIcon fontSize="medium" />
      <Typography
        component={Link}
        to="/"
        className={classes.heading}
        variant="body2"
        align="center"
      >
        Copyright IDVE Unika - Devcamp 2021
      </Typography>
    </AppBar>
  );
};

export default Footer;
