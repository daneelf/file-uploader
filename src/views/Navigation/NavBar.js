import QueueMusicIcon from "@material-ui/icons/QueueMusic";
import React, { useEffect, useState } from "react";
import {useLocation} from 'react-router-dom';
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Box from "@material-ui/core/Box";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import Tooltip from "@material-ui/core/Tooltip";

const useStyles = makeStyles((theme) => ({
  navBar: {
    display: "flex",
    alignItems: "flex-end",
    flexGrow: 1,
    backgroundColor: "#3d3d3d",
    cursor: "pointer",
  },
  icon: {
    marginRight: "12px",
  },
  link: {
    color: "#fff",
  },
}));

export default function ButtonAppBar() {
  const classes = useStyles();
  const location = useLocation();
  const [isHomePagePath, setHomePagePath] = useState(false);

  useEffect(() => {
    if (location.pathname === "/") {
      setHomePagePath(true)
    }
  }, [location]);

  return (
    <Box>
      <AppBar position="static" className={classes.navBar}>
        <Toolbar>
          <Tooltip title="Your files" aria-label="files">
            <a className={classes.link} href="/list">
              <QueueMusicIcon className={classes.icon} />
            </a>
          </Tooltip>
          {!isHomePagePath && (
            <Tooltip title="Upload file" aria-label="upload">
              <a className={classes.link} href="/">
                <CloudUploadIcon className={classes.icon} />
              </a>
            </Tooltip>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
