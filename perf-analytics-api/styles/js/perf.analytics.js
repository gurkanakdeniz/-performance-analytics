const perfAnalyticsSetup = perfAnalyticsApi => {
  if (!perfAnalyticsApi) {
    return;
  }

  const isPerformanceSupported = () => {
    return window.performance && !!window.performance.timing;
  };

  if (!isPerformanceSupported()) {
    return;
  }

  window.performanceAnalytics = {
    metrics: {
      endpoint: null,
      ttfb: 0,
      fcp: 0,
      dom: 0,
      window: 0
    }
  };

  const path = () => {
    return (
      window.location.protocol +
      "//" +
      window.location.hostname +
      (window.location.port ? ":" + window.location.port : "") +
      (window.location.pathname ? window.location.pathname : "")
    );
  };

  const toSecond = val => val / 1000;

  const analytics = () => window.performanceAnalytics;

  const performanceInfo = () => window.performance;

  const endpointInfo = () => path();

  const round = val => Math.round(val * 10000) / 10000;

  const ttfbInfo = timing =>
    round(toSecond(timing.responseStart - timing.requestStart));

  const domLoadInfo = timing =>
    round(toSecond(timing.domContentLoadedEventEnd - timing.navigationStart));

  const windowLoadInfo = timing =>
    round(toSecond(new Date().valueOf() - timing.navigationStart));

  const fcpInfo = () =>
    performanceInfo()
      .getEntries()
      .forEach(
        entry =>
          (analytics().metrics["fcp"] = round(
            analytics().metrics["fcp"] +
              toSecond(entry.startTime + entry.duration)
          ))
      );

  /*new PerformanceObserver(list => {
        let entries = list.getEntries().forEach(function(entry) {
          const time = Math.round(entry.startTime + entry.duration);
          window.performanceAnalytics.metrics["fcp"] =
            window.performanceAnalytics.metrics["fcp"] + second(time);
          // console.log(entry);
        });

        console.log(performanceAnalytics().metrics);
      }).observe({
        entryTypes: [
          "element",
          "event",
          "first-input",
          "largest-contentful-paint",
          "layout-shift",
          "longtask",
          "mark",
          "measure",
          "navigation",
          "paint",
          "resource"
        ]
      });*/

  const calculatePerfAnalytics = () => {
    const timing = performanceInfo().timing;
    const { metrics } = analytics();
    metrics.endpoint = endpointInfo();
    metrics.ttfb = ttfbInfo(timing);
    metrics.dom = domLoadInfo(timing);
    metrics.window = windowLoadInfo(timing);
    fcpInfo();

    let performanceMetrics = analytics().metrics;
    navigator.sendBeacon(perfAnalyticsApi, JSON.stringify(performanceMetrics));
    console.log(performanceMetrics);
  };

  if (window.addEventListener) {
    window.addEventListener("load", calculatePerfAnalytics, false);
  } else if (window.attachEvent) {
    window.attachEvent("onload", calculatePerfAnalytics);
  }
};
