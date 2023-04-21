"use strict";

const express = require("express");

const PORT = 3000;
const HOST = "0.0.0.0";

const app = express();

app.get("/", (_req, res) => {
    res.send("Hello, zero-downtime deployment world");
});

app.get("/health", (_req, res) => {
    res.send("Everything's good!");
});

app.listen(PORT, HOST, () => {
    console.log(`Running on http://${HOST}:${PORT}`);
});
