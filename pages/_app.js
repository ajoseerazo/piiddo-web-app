// pages/_app.js
import React from "react";
import { Provider } from "react-redux";
import App from "next/app";
import Router from "next/router";
import { fromJS } from "immutable";
import Head from "next/head";
import NProgress from "nprogress";
import { wrapper } from "../src/redux/store";
import "bootstrap/dist/css/bootstrap.css";
import { ToastProvider } from "react-toast-notifications";

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
  window.scrollTo(0, 0);
  NProgress.done();
});
Router.events.on("routeChangeError", () => NProgress.done());

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;

    return (
      <>
        <ToastProvider>
          <Head>
            <link rel="stylesheet" type="text/css" href="/nprogress.css" />
            <title key="app_title">
              {" "}
              Piiddo | Compra lo que quieras y te lo llevamos en minutos
            </title>
            <meta
              name="description"
              content="Pide lo que necesites y recíbelo en tu casa en minutos"
              key="app_description"
            />
            <meta name="twitter:card" content="summary" />
            <meta
              name="twitter:url"
              content="https://piiddo.com"
              key="twitter_url"
            />
            <meta
              name="twitter:title"
              content="Piiddo - Delivery de comida, mercados y más"
              key="twitter_title"
            />
            <meta
              name="twitter:description"
              content="Pide lo que necesites y recíbelo en tu casa en minutos"
              key="twitter_description"
            />
            <meta
              name="twitter:creator"
              content="@piiddo"
              key="twitter_creator"
            />
            <meta
              property="og:title"
              content="Piiddo - Delivery de comida, mercados y más"
              key="og_title"
            />
            <meta
              property="og:description"
              content="Pide lo que necesites y recíbelo en tu casa en minutos"
              key="og_description"
            />
            <meta property="og:site_name" content="Piiddo" key="og_site_name" />
            <meta property="og:url" content="https://piiddo.com" key="og_url" />

            <meta
              name="twitter:image"
              content="https://piiddo.com/static/images/piiddo-512x512.png"
              key="twitter_image"
            />

            <meta
              property="fb:app_id"
              content="581544162797490"
              key="fb_app_id"
            />
            <meta property="og:locale" content="es_VE" key="og_locale" />
            <meta property="og:type" content="website" key="og_type" />
            <meta
              property="og:image"
              content="https://piiddo.com/static/images/piiddo-512x512.png"
              key="og_image"
            />
            <style
              dangerouslySetInnerHTML={{
                __html: `
            body {
              font-family: "Poppins", sans-serif !important;
              overflow-x: hidden;
            }

            .react-toast-notifications__container {
              z-index: 2000 !important;
            }
          `,
              }}
            />
          </Head>
          <Component {...pageProps} />
        </ToastProvider>
      </>
    );
  }
}

export default wrapper.withRedux(MyApp);
