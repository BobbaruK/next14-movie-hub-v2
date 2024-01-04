export default {
  site: "https://next14-movie-hub-v2.vercel.app/",
  scanner: {
    // exclude specific routes
    // exclude: ["/.*?pdf", ".*/amp", "en-*"],
    // run lighthouse for each URL 3 times
    samples: 1,
    // use desktop to scan
    device: "mobile",
    // enable the throttling mode
    throttle: true,
  },
  debug: true,
};
