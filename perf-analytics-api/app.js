const createError = require("http-errors");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const dotenv = require("dotenv");
const cors = require("cors");

var favicon = require("serve-favicon");
const appLogger = require("./utils/app.logger");
dotenv.config();

mongoose.connect(
  process.env.MONGO,
  { useNewUrlParser: true, useUnifiedTopology: true },
  function(err, res) {
    try {
      appLogger.doit("Connected to Database");
    } catch (err) {
      throw err;
    }
  }
);

const indexRouter = require("./routes/index");
const analyticRouter = require("./routes/analytic");

app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname)));
app.use(favicon(__dirname + "/styles/icon/favicon.ico"));
app.set("view engine", "jade");

// const whitelist = ["http://localhost:3001"];
const corsOptions = {
  origin: function(origin, callback) {
    callback(null, true);

    // if (!origin || whitelist.indexOf(origin) !== -1) {
    //   callback(null, true);
    // } else {
    //   callback(new Error("Not allowed by CORS"));
    // }
  },

  credentials: true
};

app.use(cors(corsOptions));

app.use("/", indexRouter);
app.use("/analytic", analyticRouter);

appLogger.doit("Application is running with no problems...");

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
