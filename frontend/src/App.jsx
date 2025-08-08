import { useState } from "react";
import FileConverter from "./FileConverter";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import Navbar from "./Navbar";

const theme = createTheme({
  palette: {
    background: {
      default: "#f0f0f0",
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Navbar />
      <FileConverter />
    </ThemeProvider>
  );
}

export default App;
