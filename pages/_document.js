import React from "react";
import Document, { Head, Main, NextScript } from "next/document";
import { ServerStyleSheet } from "styled-components";

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    return (
      <html lang="es">
        <Head>
          <meta charSet="utf-8" />

          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link rel="preconnect" href="https://www.google-analytics.com" />
          <link rel="preconnect" href="https://maps.googleapis.com" />

          <meta name="application-name" content="Piiddo" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta
            name="apple-mobile-web-app-status-bar-style"
            content="default"
          />
          <meta name="apple-mobile-web-app-title" content="Piiddo" />
          <meta
            name="description"
            content="Pide lo que necesites y recíbelo en tu casa en minutos"
          />
          <meta name="format-detection" content="telephone=no" />
          <meta name="mobile-web-app-capable" content="yes" />
          <meta
            name="msapplication-config"
            content="/static/icons/browserconfig.xml"
          />
          <meta name="msapplication-TileColor" content="#FFFFFF" />
          <meta name="msapplication-tap-highlight" content="no" />
          <meta name="theme-color" content="#FFFFFF" />
          <meta
            name="viewport"
            content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=0"
          />

          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/static/icons/apple-icon-180x180.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/static/icons/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/static/icons/favicon-16x16.png"
          />
          <link rel="manifest" href="/static/manifest.json" />
          <link
            rel="mask-icon"
            href="/static/icons/safari-pinned-tab.svg"
            color="#5bbad5"
          />
          <link rel="shortcut icon" href="/static/icons/favicon.ico" />

          <meta name="twitter:card" content="summary" />
          <meta name="twitter:url" content="https://piiddo.com" />
          <meta name="twitter:title" content="Piiddo" />
          <meta
            name="twitter:description"
            content="Pide lo que necesites y recíbelo en tu casa en minutos"
          />
          <meta
            name="twitter:image"
            content="https://piiddo.com/static/icons/piiddo-192x192.png"
          />
          <meta name="twitter:creator" content="@piiddo" />
          <meta property="og:type" content="website" />
          <meta property="og:title" content="Piiddo" />
          <meta
            property="og:description"
            content="Pide lo que necesites y recíbelo en tu casa en minutos"
          />
          <meta property="og:site_name" content="Piiddo" />
          <meta property="og:url" content="https://piiddo.com" />

          <meta
            property="og:image"
            content="https://piiddo.com/static/icons/piiddo-192x192.png"
          />
          <link
            href="https://fonts.googleapis.com/css?family=Poppins:400,500,600,700,900"
            rel="stylesheet"
          />
          <meta
            name="description"
            content="Compra lo que quieras y te lo llevamos en minutos"
          />
          <meta itemProp="name" content="" />
          <meta
            itemProp="description"
            content="Compra lo que quieras y te lo llevamos en minutos"
          />
          <meta name="twitter:card" content="summary" />
          <meta name="twitter:title" content="" />
          <meta
            name="twitter:description"
            content="Compra lo que quieras y te lo llevamos en minutos"
          />
          <meta
            name="twitter:image"
            content="https://piiddo.com/static/images/piiddo-512x512.png"
          />

          <meta name="og:title" content="" />
          <meta
            name="og:description"
            content="Compra lo que quieras y te lo llevamos en minutos"
          />
          <meta name="og:url" content="www.piiddo.com" />
          <meta name="og:site_name" content="" />
          <meta name="og:locale" content="es_VE" />
          <meta name="og:type" content="website" />
          <meta
            property="og:image"
            content="https://piiddo.com/static/images/piiddo-512x512.png"
          />

          <script
            async
            src="https://www.googletagmanager.com/gtag/js?id=UA-122734292-1"
          ></script>

          <script
            dangerouslySetInnerHTML={{
              __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'UA-122734292-1', {
              page_path: window.location.pathname,
            });
          `,
            }}
          />

          <script
            type="text/javascript"
            src="https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyAX1z89iahv9s6jVeH1dixt0Ey0hZW9teo&libraries=places"
            async
          />

          <script
            type="text/javascript"
            dangerouslySetInnerHTML={{
              __html: `
      (function() {
        window.__insp = window.__insp || [];
        __insp.push(["wid", 1371501116]);
        var ldinsp = function() {
          if (typeof window.__inspld != "undefined") return;
          window.__inspld = 1;
          var insp = document.createElement("script");
          insp.type = "text/javascript";
          insp.async = true;
          insp.id = "inspsync";
          insp.src =
            ("https:" == document.location.protocol ? "https" : "http") +
            "://cdn.inspectlet.com/inspectlet.js?wid=1371501116&r=" +
            Math.floor(new Date().getTime() / 3600000);
          var x = document.getElementsByTagName("script")[0];
          x.parentNode.insertBefore(insp, x);
        };
        setTimeout(ldinsp, 0);
      })();`,
            }}
          />
        </Head>
        <body>
          <noscript>You need to enable JavaScript to run this app.</noscript>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
