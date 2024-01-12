// import { ThemeProvider, createTheme } from '@mui/material/styles';
// import customThemeJSON from "../src/theme";
import express from "express";
import path from "path";
import fs from "fs";
import React from "react";
import Helmet from "react-helmet";
import { renderToString } from "react-dom/server";
import { StaticRouter, matchPath } from "react-router-dom";
import routeList from "../src/RouteList";
//import App from "../src/App";
import AppRoutes from '../src/Routes';

const app = express();

app.use("/static", express.static(path.resolve("./build/static")));

const distPath = path.resolve("./build");
const indexPath = `${distPath}/index.html`;

//const theme = createTheme(customThemeJSON);


app.get("/api/classDetails", (req, res) => {
    const classDetails = require("./jsons/classDetails");
    console.log(classDetails);
    res.send(classDetails.default);
});

app.get("*", (req, res) => {
    // handle favicon.ico, it matches my weak route /:id
    if (req.url === "/favicon.ico") {
        return res.status(404).send("Favicon not found!");
    }

    // set up our initial context passed through the router
    const context = { initialState: {} };

    // find the route that matches
    // then fire off any getInitialState function if it exists
    const dataPromises = routeList
        .map(route => {
            const match = matchPath(route, req.url);
            if (match && route.component.getInitialState) {
                return route.component.getInitialState(match.params);
            } else {
                return null;
            }
        })
        .filter(p => p !== null);

    // wait for all data to be fetched before we do ssr
    Promise.all(dataPromises).then(initialStateList => {
        context.initialState = initialStateList[0];
        // we pass the data result into SSR on the StaticRouter context
        const ssr = (
            <StaticRouter context={context} location={req.url}>
                <AppRoutes />
            </StaticRouter>
        );
        const dom = renderToString(ssr);
        // site title
        const helmet = Helmet.renderStatic();

        fs.readFile(indexPath, "utf8", (err, data) => {
            if (err) {
                return res.status(500).send("Index file not found!");
            }
            res.writeHead(200, { "Content-Type": "text/html" });
            res.end(htmlTemplate(data, dom, helmet, context.initialState));
        });
    });
});


app.listen(3002, () => {
    console.log("App is running on http://localhost:3002");
});


function htmlTemplate(data, dom, helmet, initialState) {
    return data
        .replace('<div id="root"></div>', `<div id="root">${dom}</div>`)
        .replace(/<title>.*?<\/title>/g, helmet.title.toString())
        .replace('"__INITIAL_STATE__"', JSON.stringify(initialState));
}



