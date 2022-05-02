const requestIp = require("request-ip");
const service = require("../services/analytic.service");
const logger = require("../utils/app.logger");
const moment = require("moment");

exports.data = async function(req, res, next) {
  try {
    let data =
      Object.prototype.toString.call(req.body) === "[object String]"
        ? JSON.parse(req.body)
        : req.body;
    service.saveData(data, requestIp.getClientIp(req).toString());

    return res.status(200).json("OK");
  } catch (e) {
    logger.doit(
      "Something went wrong for guest's IP: " +
        requestIp.getClientIp(req).toString() +
        " ,Error Message: " +
        e.message
    );
    return res.status(500).json({ message: e.message });
  }
};

exports.find = async function(req, res, next) {
  try {
    let response = await getData(req);
    return res.status(200).json(response);
  } catch (e) {
    logger.doit(
      "Something went wrong for guest's IP: " +
        requestIp.getClientIp(req).toString() +
        " ,Error Message: " +
        e.message
    );
    return res.status(500).json({ message: e.message });
  }
};

exports.dashboard = async function(req, res, next) {
  try {
    let data = await getData(req);
    let response = {};
    let ttfb = { title: "TTFB", data: {} };
    let fcp = { title: "FCP", data: {} };
    let dom = { title: "DOM Load", data: {} };
    let window = { title: "Window Load", data: {} };

    if (data) {
      data.forEach(item => {
        var stroke = "#" + Math.floor(Math.random() * 16777215).toString(16);
        var itemDate = moment(item.created_date)
          .utc()
          .format("YYYY-MM-DD HH:mm");

        prepareDashboardData(ttfb, item.endpoint, itemDate, item.ttfb, stroke);
        prepareDashboardData(fcp, item.endpoint, itemDate, item.fcp, stroke);
        prepareDashboardData(dom, item.endpoint, itemDate, item.dom, stroke);
        prepareDashboardData(
          window,
          item.endpoint,
          itemDate,
          item.window,
          stroke
        );
      });

      response = {
        ttfb: ttfb,
        fcp: fcp,
        dom: dom,
        window: window
      };
    }

    return res.status(200).json(response);
  } catch (e) {
    logger.doit(
      "Something went wrong for guest's IP: " +
        requestIp.getClientIp(req).toString() +
        " ,Error Message: " +
        e.message
    );
    return res.status(500).json({ message: e.message });
  }
};

function prepareDashboardData(obj, itemEndpoint, itemDate, duration, stroke) {
  if (!obj.data[itemEndpoint]) {
    obj.data[itemEndpoint] = {
      name: itemEndpoint,
      stroke: stroke,
      data: []
    };
  }

  obj.data[itemEndpoint].data.push({
    duration: duration,
    date: itemDate
  });
}

async function getData(req) {
  let startDate = !req.query.startDate
    ? moment()
        .subtract(30, "minutes")
        .toDate()
    : new Date(req.query.startDate);

  let endDate = !req.query.endDate
    ? moment().toDate()
    : new Date(req.query.endDate);

  return service.getData(startDate, endDate);
}
