"use strict";

require("dotenv").config();

require("./db");

var authRoute = require("./routes/auth");

var express = require("express");

var cors = require("cors");

var app = express();
var port = process.env.PORT;
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoute);
app.listen(port, function () {
  return console.log("App listening on port ".concat(port, "!"));
});