import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Main from "../../containers/Main";
import Audio from "./Audio";
import axios from "axios";
import {
  API_BASE_URL,
  GET_ALL_FILES_PATH,
  DELETE_FILE_PATH,
  DELETE_ALL_FILE_PATH,
} from "../../constants";
import Container from "@material-ui/core/Container";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  container: {
    margin: "24px auto",
  },
  deleteAllbutton: {
    margin: "12px 0",
  },
}));

const AudioList = () => {
  const classes = useStyles();
  const [filesList, setFilesList] = useState([]);
  const [open, setIsOpen] = useState(false);
  const [statusText, setStatusText] = useState("");

  useEffect(() => {
    const getFilesList = async () => {
      try {
        const { data } = await axios.get(
          `${API_BASE_URL}${GET_ALL_FILES_PATH}`
        );
        setFilesList(data);
      } catch (error) {
        return error.response;
      }
    };
    getFilesList();
  }, []);

  const handleCloseSnackBar = () => {
    setIsOpen(false);
  };

  const handleDeleteSingleFile = (id, filename) => {
    axios
      .delete(`${API_BASE_URL}${DELETE_FILE_PATH}/${id}?file=${filename}`)
      .then((res) => {
        setStatusText(res.data);
        setIsOpen(true);
      })
      .catch((error) => {
        setIsOpen(true);
        setStatusText(error.message);
      });
    updateState(id);
  };

  const handleDeleteAll = () => {
    axios
      .post(`${API_BASE_URL}${DELETE_ALL_FILE_PATH}`)
      .then((res) => {
        setStatusText(res.data);
        setIsOpen(true);
        setFilesList([]);
      })
      .catch((error) => {
        setIsOpen(true);
        setStatusText(error.message);
      });
  };

  const updateState = (id) => {
    const files = [...filesList];
    const updatedFilesList = files.filter((item, index) => {
      return item._id !== id;
    });
    setFilesList(updatedFilesList);
  };

  return (
    <Main>
      <Container maxWidth="md" className={classes.container}>
        {filesList && filesList?.length > 0 && (
          <Button
            variant="contained"
            color="secondary"
            className={classes.deleteAllbutton}
            startIcon={<DeleteForeverIcon />}
            onClick={handleDeleteAll}
          >
            Delete all
          </Button>
        )}

        {filesList && filesList?.length > 0 ? (
          filesList.map(({ _id, file_path, file_mimetype, filename }) => (
            <Audio
              key={_id}
              fileId={_id}
              filename={filename}
              path={file_path}
              handleDeleteFile={() => handleDeleteSingleFile(_id, filename)}
            />
          ))
        ) : (
          <div>No files found. Please add some.</div>
        )}
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          open={open}
          autoHideDuration={6000}
          message={statusText}
          action={
            <>
              <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleCloseSnackBar}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            </>
          }
        />
      </Container>
    </Main>
  );
};

export default AudioList;
