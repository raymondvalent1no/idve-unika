import React, { useState, useEffect } from "react";
import { TextField, Button, Typography, Paper } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import FileBase from "react-file-base64";
import { useHistory } from "react-router-dom";
import useStyles from "./styles";
import { createPost, updatePost } from "../../actions/posts";

const Form = ({ currentId, setCurrentId }) => {
  const [postData, setPostData] = useState({
    ide: "",
    deskripsi: "",
    tags: "",
    selectedFile: "",
  });
  const post = useSelector((state) =>
    currentId
      ? state.posts.posts.find((deskripsi) => deskripsi._id === currentId)
      : null
  );
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();
  const user = JSON.parse(localStorage.getItem("profile"));
  useEffect(() => {
    if (post) setPostData(post);
  }, [post]);

  const clear = () => {
    setCurrentId(0);
    setPostData({
      ide: "",
      deskripsi: "",
      tags: "",
      selectedFile: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (currentId === 0) {
      dispatch(createPost({ ...postData, name: user?.result?.name }, history));

      clear();
    } else {
      dispatch(
        updatePost(currentId, { ...postData, name: user?.result?.name })
      );
      clear();
    }
  };

  if (!user?.result?.name) {
    return null;
  }
  if (user?.result?.name) {
    return (
      <Paper className={classes.paper} elevation={6}>
        <form
          autoComplete="off"
          noValidate
          className={`${classes.root} ${classes.form}`}
          onSubmit={handleSubmit}
        >
          <Typography variant="h6">
            {currentId ? `Edit "${post.ide}"` : "Usulan Ide"}
          </Typography>

          <TextField
            name="ide"
            variant="outlined"
            label="Ide"
            fullWidth
            value={postData.ide}
            onChange={(e) => setPostData({ ...postData, ide: e.target.value })}
          />
          <TextField
            name="deskripsi"
            variant="outlined"
            label="Deskripsi"
            fullWidth
            multiline
            rows={4}
            value={postData.deskripsi}
            onChange={(e) =>
              setPostData({ ...postData, deskripsi: e.target.value })
            }
          />
          <TextField
            name="tags"
            variant="outlined"
            label="Tags (dipisah koma)"
            fullWidth
            value={postData.tags}
            onChange={(e) =>
              setPostData({ ...postData, tags: e.target.value.split(",") })
            }
          />
          <div className={classes.fileInput}>
            <FileBase
              type="file"
              multiple={false}
              onDone={({ base64 }) =>
                setPostData({ ...postData, selectedFile: base64 })
              }
            />
          </div>
          <Button
            className={classes.buttonSubmit}
            variant="contained"
            color="primary"
            size="large"
            type="submit"
            fullWidth
          >
            Submit
          </Button>
          <Button
            variant="contained"
            color="secondary"
            size="small"
            onClick={clear}
            fullWidth
          >
            Clear
          </Button>
        </form>
      </Paper>
    );
  }
};

export default Form;
