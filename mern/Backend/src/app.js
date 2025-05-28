const express = require("express");
const membersRouter = require("./routers/teams");
require("./mongoose/mongoose");
var cors = require('cors')

const app = new express();

app.use(express.json());
app.use(cors({
    origin: "http://localhost:8000",
    credentials: true,
}));
app.use(membersRouter);

module.exports = app;