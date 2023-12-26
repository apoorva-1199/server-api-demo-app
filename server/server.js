import express from "express";
import React from "react";
import ReactDOMServer from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import App from "../src/App";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import customThemeJSON from "../src/theme";

const theme = createTheme(customThemeJSON);

const app = express();

app.get("/*", (req, res) => {
    const entryPoint = ["/main.js"];

    const { pipe, abort: _abort } = ReactDOMServer.renderToPipeableStream(
        <StaticRouter location={req.url}>
            <ThemeProvider theme={theme}>
                <App />
            </ThemeProvider>
        </StaticRouter>,
        {
            bootstrapScripts: entryPoint,
            onAllReady() {
                res.statusCode = 200;
                res.setHeader("Content-type", "text/html");
                pipe(res);
            },
            onShellError() {
                res.statusCode = 500;
                res.send("<!doctype html><p>Loading...</p>");
            },
        }
    );
});

app.listen(3002, () => {
    console.log("App is running on http://localhost:3002");
});