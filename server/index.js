const express = require("express");
const app = express();

const morgan = require("morgan");
app.use(morgan("dev"));

const path = require("path");
app.use(express.json());
app.use(express.static(path.join(__dirname, "../public")));

const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api", require("./apiRoutes"));

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./path/to/index.html"));
});

app.use((err, req, res, next) => {
  if (process.env.NODE_ENV !== "test") console.error(err.stack);
  res.status(err.status || 500).send(err.message || "Internal server error");
});

module.exports = app;
