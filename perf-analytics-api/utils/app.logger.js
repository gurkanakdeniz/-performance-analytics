const SimpleNodeLogger = require("simple-node-logger"),
  opts = {
    logFilePath: "perfanalyticsapi.log",
    timestampFormat: "YYYY-MM-DD HH:mm:ss.SSS"
  },
  log = SimpleNodeLogger.createSimpleLogger(opts);

exports.doit = function(object) {
  log.info("=== LOG BEGIN ===");
  log.info(object);
  log.info("=== LOG END===");
};
