const dotenv = require("dotenv");
dotenv.config();

const repository = require("./analytic.repository");

exports.saveData = async function saveData(data, requestIp) {
  try {
    //not necessary await
    repository.save(
      data.endpoint,
      data.ttfb,
      data.fcp,
      data.dom,
      data.window,
      requestIp
    );

    return;
  } catch (e) {
    console.error(e);
    throw e;
  }
};

exports.getData = async function getData(startDate, endDate) {
  try {
    var analytics = await repository.find(startDate, endDate);
    return analytics;
  } catch (e) {
    console.error(e);
    throw e;
  }
};
