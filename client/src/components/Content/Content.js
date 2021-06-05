import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getPostsBySearch } from "../../actions/posts";
import {
  Container,
  Grow,
  Grid,
  Paper,
  AppBar,
  Button,
  TextField,
} from "@material-ui/core";
import { useLocation, useHistory } from "react-router-dom";
import ChipInput from "material-ui-chip-input";
import useStyles from "./styles";
import Posts from "../Posts/Posts";
import Form from "../Form/Form";
import Pagination from "../Pagination";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Content = () => {
  const [currentId, setCurrentId] = useState(0);
  const dispatch = useDispatch();
  const classes = useStyles();
  const query = useQuery();
  const history = useHistory();
  const page = query.get("page") || 1;
  const searchQuery = query.get("searchQuery");

  const [search, setSearch] = useState(""); //state search dengan judul ide
  const [tags, setTags] = useState([]); //state search dengan tags

  const searchPost = () => {
    //search -> searchterms (judul ide/tags)

    if (search.trim() || tags) {
      //dispatch actions getPostsBySearch -> dari endpoints api fetchPost (yg diinput user) di backend
      dispatch(getPostsBySearch({ search, tags: tags.join(",") }));
      history.push(
        `/posts/search?searchQuery=${search || "none"}&tags=${tags.join(",")}`
      );
    } else {
      history.push("/");
    }
  };
  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      searchPost();
    }
  };

  const handleAdd = (tag) => setTags([...tags, tag]);

  const handleDelete = (tagToDelete) =>
    setTags(tags.filter((tag) => tag !== tagToDelete));

  return (
    <Grow in>
      <Container maxWidth="xl">
        <Grid
          className={classes.gridContainer}
          container
          justify="space-between"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12} md={9} sm={6}>
            <Posts setCurrentId={setCurrentId} />
          </Grid>
          <Grid item xs={12} md={3} sm={6}>
            <AppBar
              className={classes.appBarSearch}
              position="static"
              color="inherit"
            >
              <TextField
                name="search"
                variant="outlined"
                label="Judul Ide"
                fullWidth
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyPress={handleKeyPress}
              />
              <ChipInput
                style={{ margin: "10px 0" }}
                variant="outlined"
                value={tags}
                onAdd={handleAdd}
                onDelete={handleDelete}
                label="Tags (dipisah enter)"
              />
              <Button
                className={classes.searchButton}
                onClick={searchPost}
                color="primary"
                variant="contained"
              >
                Search
              </Button>
            </AppBar>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
            {!searchQuery && !tags.length && (
              <Paper elevation={6} className={classes.pagination}>
                <Pagination page={page} />
              </Paper>
            )}
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default Content;
