import React from "react";
import { Paper, Typography } from "@material-ui/core";

import useStyles from "./styles";

const Contact = () => {
  const classes = useStyles();
  return (
    <Paper style={{ padding: "20px", borderRadius: "15px" }} elevation={6}>
      <div className={classes.card}>
        <div className={classes.section}>
          <Typography variant="h3" component="h2">
            Contact Unika
          </Typography>

          <Typography gutterBottom variant="h5" component="p" to="/">
            Unika: www.unika.ac.id
          </Typography>
        </div>
      </div>
      <div className={classes.card}>
        <div className={classes.section}>
          <Typography variant="h3" component="h2">
            Contact Me
          </Typography>

          <Typography gutterBottom variant="h5" component="p">
            Email: raymondvalentino007@gmail.com
          </Typography>
        </div>
      </div>
    </Paper>
  );
};
export default Contact;
