const withSass = require("@zeit/next-sass");
const withPWA = require("next-pwa");
const withCSS = require("@zeit/next-css");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

module.exports = withCSS(
  withSass(
    withPWA({
      pwa: {
        // disable: process.env.NODE_ENV === "production" ? false : true,
        dest: "public",
      },
      webpack(config, options) {
        config.optimization.minimizer = [];
        config.optimization.minimizer.push(new OptimizeCSSAssetsPlugin({}));

        return config;
      },
    })
  )
);
