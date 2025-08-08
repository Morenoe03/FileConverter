import React from "react";

import { AppBar, Toolbar, Typography } from "@mui/material";
import App from "./App";

function Navbar() {
  return (
    <AppBar position="fixed">
      <Toolbar>
        <img
          src="/folderPicture.jpg"
          alt="File Buddy Logo"
          style={{
            height: "32px",
            width: "32px",
            objectFit: "cover",
            borderRadius: "4px",
            marginRight: "12px",
          }}
        />
        <Typography variant="h6" component="div">
          File Converter
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
