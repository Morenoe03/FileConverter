import { useState } from "react";
import FileConverter from "./FileConverter";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";

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
      <FileConverter />
    </ThemeProvider>
  );
}

export default App;
