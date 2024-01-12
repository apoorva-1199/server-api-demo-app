import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import customThemeJSON from "../src/theme";

const theme = createTheme(customThemeJSON);

ReactDOM.hydrateRoot(
  document,
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode >
);