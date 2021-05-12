import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import DeleteIcon from "@material-ui/icons/Delete";
import PauseIcon from "@material-ui/icons/Pause";

const useStyles = makeStyles((theme) => ({
  card: {
    border: "1px black solid",
    marginBottom: "12px",
  },
  details: {
    display: "flex",
    flexDirection: "column",
  },
  content: {
    flex: "1 0 auto",
  },
  cover: {
    width: 151,
  },
  controls: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  playIcon: {
    height: 38,
    width: 38,
  },
  deleteIcon: {
    textAlign: "center",
    height: 28,
    width:28,
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    color: "#ff0000"
  }
}));

export default function Audio({ fileId, path, filename, handleDeleteFile }) {
  const classes = useStyles();
  const [play, setPlay] = useState(true);

  const playAudio = (id) => {
    const audioEl = document.getElementById(id);
    audioEl.play();
    setPlay(false);
  };
  const pauseAudio = (id) => {
    const audioEl = document.getElementById(id);
    audioEl.pause();
    setPlay(true);
  };
  const audioPath = `/files/${filename}`;

  return (
    <>
      <audio
        src={audioPath}
        className="audio-element"
        id={fileId}
        controls
        hidden
      >
        Your browser does not support the <code>audio</code> element.
      </audio>
      <Card className={classes.card}>
        <div className={classes.details}>
          <CardContent className={classes.content}>
            <Typography component="h5" variant="h5">
              {filename}
            </Typography>
          </CardContent>

          <div className={classes.controls}>
            {play ? (
              <IconButton
                aria-label="play/pause"
                onClick={() => playAudio(fileId)}
              >
                <PlayArrowIcon className={classes.playIcon} />
              </IconButton>
            ) : (
              <IconButton
                aria-label="play/pause"
                onClick={() => pauseAudio(fileId)}
              >
                <PauseIcon className={classes.playIcon} />
              </IconButton>
            )}
                      <IconButton aria-label="play/pause" onClick={handleDeleteFile} >
              <DeleteIcon className={classes.deleteIcon} />
            </IconButton>
          </div>

        </div>
      </Card>
    </>
  );
}
