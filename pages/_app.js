// pages/_app.js
import React from "react";
import { Provider } from "react-redux";
import App from "next/app";
import Router from "next/router";
import { fromJS } from "immutable";
import Head from "next/head";
import NProgress from "nprogress";
import "../src/shop-styles.scss";
import "../src/styles.scss";
import { wrapper } from "../src/redux/store";

/*const makeStore = (initialState, options) => {
  return createStore(
    rootReducer,
    fromJS(initialState),
    applyMiddleware(...[thunk])
  );
};*/

Router.events.on("routeChangeStart", (url) => {
  console.log(`Loading: ${url}`);
  NProgress.start();
});

Router.events.on("routeChangeComplete", (url) => {
  if (url === "/") {
    window.scrollTo(0, 0);
  }
  NProgress.done();
});
Router.events.on("routeChangeError", () => NProgress.done());

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;

    return (
      <>
        <Head>
          <link rel="stylesheet" type="text/css" href="/nprogress.css" />
        </Head>

        <Component {...pageProps} />
      </>
    );
  }
}

export default wrapper.withRedux(MyApp);
