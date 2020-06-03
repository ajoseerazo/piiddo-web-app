class GA {
  static registerPageView = (page) => {
    if (typeof gtag !== "undefined") {
      gtag("event", "load", {
        event_category: "pageview",
        event_label: page,
      });
    }
  };
}

export default GA;
