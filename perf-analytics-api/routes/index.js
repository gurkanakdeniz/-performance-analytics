var express = require("express");
var path = require("path");
var router = express.Router();

router.get("/", function(req, res, next) {
  res.sendFile(path.join(__dirname + "/../views/index.html"));
});

router.get("/page1", function(req, res, next) {
  res.sendFile(path.join(__dirname + "/../views/page1.html"));
});

router.get("/page2", function(req, res, next) {
  res.sendFile(path.join(__dirname + "/../views/page2.html"));
});

module.exports = router;
