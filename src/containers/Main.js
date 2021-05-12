import React from "react";
import Box from "@material-ui/core/Box";
import NavBar from "../views/Navigation/NavBar"

export default function Main({children}) {
  return (
    <Box>
      <NavBar />
      {children}
    </Box>
  );
}
