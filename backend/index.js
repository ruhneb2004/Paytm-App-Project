const express = require("express");

// there was a User import here
const app = express();

app.use(express.json());

const cors = require("cors");

app.use(cors());

const mainRouter = require("./routes/index");

const port = 3000;

app.use("/api/v1", mainRouter);

app.listen(port);
