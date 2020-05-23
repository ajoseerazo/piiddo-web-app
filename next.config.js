const withSass = require("@zeit/next-sass");
const withPWA = require("next-pwa");

module.exports = withSass(
  withPWA({
    pwa: {
      dest: "public",
    },
  })
);
