var express = require("express");
var router = express.Router();

var controller = require("../controllers/analytic.controller");

router.post("/data", controller.data);
router.get("/data", controller.find);
router.get("/dashboard", controller.dashboard);

module.exports = router;
