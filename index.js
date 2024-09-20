import express from "express";
import debug from "debug";
import kafkaRouter from "./routes.js";

const app = express();
const logger = debug('node-kafka:server');

app.use(express.json());
app.use('/kafka', kafkaRouter);

app.listen(8080, () => {
    console.log("Running @ http://localhost:8080");
});