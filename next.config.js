const withSass = require("@zeit/next-sass");
const withPWA = require("next-pwa");
const withCSS = require("@zeit/next-css");

module.exports = withCSS(
  withSass(
    withPWA({
      pwa: {
        // disable: process.env.NODE_ENV === "production" ? false : true,
        dest: "public",
      },
    })
  )
);
