import React from "react";
import { Paper, Typography } from "@material-ui/core";
import Post from "../Posts/Posts";
import useStyles from "./styles";

const About = () => {
  const classes = useStyles();
  return (
    <Paper style={{ padding: "20px", borderRadius: "15px" }} elevation={6}>
      <div className={classes.card}>
        <div className={classes.section}>
          <Typography variant="h3" component="h2">
            IDVE Unika
          </Typography>
          <Typography
            gutterBottom
            variant="h6"
            color="textSecondary"
            component="h2"
          ></Typography>
          <Typography gutterBottom variant="h6" component="p">
            Suatu website yang dapat menampung aspirasi dari ide mahasiswa
            mengenai event yang akan diselenggarakan. Kemudian, ide event yang
            disalurkan mahasiswa mungkin saja dapat diselenggarakan /
            direalisasikan apabila memperoleh banyak dukungan. Mahasiswa dapat
            memberikan ide nya melalui website ini, dimana nantinya akan
            menyediakan fitur seperti form pengisian ide, mulai dari judul ide,
            deskripsi event, tags, dan juga dapat melampirkan file foto. Setelah
            form disubmit, maka akan muncul ide event di sebelah kiri form
            pengisian dimana dapat di like (sebagai bentuk dukungan) atau juga
            dapat di delete.
          </Typography>
          <Post />
          <Typography variant="h6"></Typography>
          <Typography variant="body1"></Typography>
        </div>
      </div>
    </Paper>
  );
};
export default About;
