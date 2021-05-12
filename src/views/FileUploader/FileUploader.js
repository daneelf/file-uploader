import { useState } from "react";
import axios from "axios";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import { API_BASE_URL, UPLOAD_FILE_PATH } from "../../constants";
import Main from "../../containers/Main";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

const useStyles = makeStyles({
  container: {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
  card: {
    minWidth: 275,
  },
  uploadForm: {
    display: "flex",
    flexFlow: "column",
  },
  uploadBtn: {
    backgroundColor: "#220073",
    color: "#fff",
    "&:hover,&:disabled": {
      backgroundColor: "#220073db",
    },
    margin: "15px 0",
  },
  disabled: {
    backgroundColor: "#d5d5d5",
    color: "#fff",
  },
  link: {
    color: "#ff00e5"
  }
});

const FileUploader = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setIsLoading] = useState(false);
  const [open, setIsOpen] = useState(false);
  const [statusText, setStatusText] = useState("");
  const [statusCode, setStatusCode] = useState("");
  const classes = useStyles();

  const onChangeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const onClickHandler = () => {
    const data = new FormData();
    data.append("file", selectedFile);
    setIsLoading(true);
    axios
      .post(`${API_BASE_URL}${UPLOAD_FILE_PATH}`, data)
      .then((res) => {
        setIsLoading(false);
        setStatusCode(res.status);
        setStatusText(res.data);
        setIsOpen(true);
      })
      .catch((error) => {
        setIsLoading(false);
        setIsOpen(true);
        setStatusText(error.message);
        setSelectedFile(null);
      });
  };

  const handleCloseSnackBar = () => {
    setIsOpen(false);
  };

  const errorMessage = (statusCode, message) => {
    if (statusCode === 200) {
      return (
        <p>
          {message} Find your files <a className={classes.link} href="list">here</a>
        </p>
      );
    } else {
      return message;
    }
  };

  return (
    <Main>
      <Box className={classes.container}>
        <Card className={classes.card} variant="outlined">
          <CardContent>
            <form method="post" action="#" id="#">
              <div className={classes.uploadForm}>
                <label>Upload Your File </label>
                <input
                  disabled={loading}
                  type="file"
                  name="file"
                  accept="audio/mp3,audio/wav,audio/ogg,audio/,audio/*;"
                  onChange={onChangeHandler}
                />
                <Button
                  size="large"
                  className={loading ? classes.disabled : classes.uploadBtn}
                  onClick={onClickHandler}
                  disabled={loading}
                >
                  {loading ? `Uploading....` : `Upload`}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </Box>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        open={open}
        autoHideDuration={6000}
        onClose={handleCloseSnackBar}
        message={errorMessage(statusCode, statusText)}
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
      ></Snackbar>
    </Main>
  );
};

export default FileUploader;
