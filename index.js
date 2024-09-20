import express from "express";
import debug from "debug";

const app = express();
const logger = debug('node-kafka:server');

app.listen(8080, () => {
    console.log("Running @ http://localhost:8080");
});