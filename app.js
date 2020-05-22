const express = require("express");
const app = express();

const songsRouter = require("./routes/songs");

app.use("/", songsRouter);

app.use((err, req, res, next) => {
  console.log("Final error handler");
  err.statusCode = err.statusCode || 500;
  res.status(err.statusCode).send(err.message);
});

module.exports = app;
