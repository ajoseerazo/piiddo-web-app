const withSass = require("@zeit/next-sass");
const withPWA = require("next-pwa");
const withCSS = require("@zeit/next-css");
// const withPurgeCss = require('next-purgecss')
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

module.exports = withCSS(
  withSass(
    withPWA({
      pwa: {
        disable: process.env.NODE_ENV === "production" ? false : true,
        dest: "public",
      },
      webpack(config, options) {
        config.optimization.minimizer.push(new OptimizeCSSAssetsPlugin({}));

        config.module.rules.push({
          test: /\.(eot|woff|woff2|ttf|svg|png|jpg|gif)$/,
          use: {
            loader: 'url-loader',
            options: {
              limit: 100000,
              name: '[name].[ext]'
            }
          }
        })

        return config;
      }
    })
  )
);
