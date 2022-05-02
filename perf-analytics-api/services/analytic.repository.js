const mongoose = require("mongoose");
const PerformanceAnalyticsModel = require("../models/performance.analytics.model.js");

function utcDate(date) {
  return new Date(
    Date.UTC(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      date.getHours(),
      date.getMinutes(),
      date.getSeconds()
    )
  );
}

exports.save = async function(endpoint, ttfb, fcp, dom, window, requestIp) {
  const model = new PerformanceAnalyticsModel({
    _id: new mongoose.Types.ObjectId(),
    endpoint: endpoint,
    ttfb: ttfb,
    fcp: fcp,
    dom: dom,
    window: window,
    ip: requestIp,
    created_date: utcDate(new Date())
  });
  // await model.save();
  model.save();
};

exports.find = async function(start, end) {
  return PerformanceAnalyticsModel.find({
    created_date: {
      $gte: utcDate(start),
      $lt: utcDate(end)
    }
  }).sort({ created_date: 1 });
};
