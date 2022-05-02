const mongoose = require("mongoose");

const performanceAnalyticsSchema = mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    endpoint: { type: String, default: "" },
    ttfb: { type: Number, default: 0 },
    fcp: { type: Number, default: 0 },
    dom: { type: Number, default: 0 },
    window: { type: Number, default: 0 },
    ip: { type: String, default: "" },
    created_date: { type: Date, default: Date.now }
  },
  { collection: "perfanalyticinfo" }
);

module.exports = mongoose.model("perf", performanceAnalyticsSchema);
