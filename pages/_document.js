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
      <html>
        <Head>
          <meta charSet="utf-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, user-scalable=no"
          />
          <link
            rel="stylesheet"
            href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
            integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh"
            crossOrigin="anonymous"
          />
          <link
            href="https://fonts.googleapis.com/css?family=Poppins:400,500,600,700,900|Open+Sans+Condensed:300,700|Open+Sans:300,400,600|Raleway:800,700,600,500,400,300,200,100|Lato:800,700,600,500,400,300,200,100"
            rel="stylesheet"
          />
          <link
            rel="stylesheet"
            id="font-awesome-css"
            href="//maxcdn.bootstrapcdn.com/font-awesome/4.6.1/css/font-awesome.min.css?ver=4.9.4"
            type="text/css"
            media="all"
          />
          <link rel="stylesheet" href="/_next/static/style.css" />
          <meta charset="utf-8" />
          <title>
            {" "}
            Piiddo | Compra lo que quieras y te lo llevamos en minutos
          </title>
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
            content="https://regaloenvenezuela.com/static/images/sharing2.png"
          />

          <meta name="og:title" content="" />
          <meta
            name="og:description"
            content="Compra lo que quieras y te lo llevamos en minutos"
          />
          <meta name="og:url" content="www.regaloenvenezuela.com" />
          <meta name="og:site_name" content="" />
          <meta name="og:locale" content="es_VE" />
          <meta name="og:type" content="website" />
          <meta
            property="og:image"
            content="https://regaloenvenezuela.com/static/images/sharing2.png"
          />

          <script
            async
            src="https://www.googletagmanager.com/gtag/js?id=UA-122147735-1"
          ></script>
          <script
            dangerouslySetInnerHTML={{
              __html: `window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'UA-122147735-1');`,
            }}
          />

          <script
            type="text/javascript"
            src="https://cdn.jsdelivr.net/gh/space10-community/conversational-form@0.9.83/dist/conversational-form.min.js"
            crossOrigin
          ></script>

          <script
            type="text/javascript"
            src="https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyAX1z89iahv9s6jVeH1dixt0Ey0hZW9teo&libraries=places"
          />
          
          <script
            type="text/javascript"
            dangerouslySetInnerHTML={{
              __html: `
          (function() {
          window.__insp = window.__insp || [];
          __insp.push(['wid', 1434067058]);
          var ldinsp = function(){
          if(typeof window.__inspld != "undefined") return; window.__inspld = 1; var insp = document.createElement('script'); insp.type = 'text/javascript'; insp.async = true; insp.id = "inspsync"; insp.src = ('https:' == document.location.protocol ? 'https' : 'http') + '://cdn.inspectlet.com/inspectlet.js?wid=1434067058&r=' + Math.floor(new Date().getTime()/3600000); var x = document.getElementsByTagName('script')[0]; x.parentNode.insertBefore(insp, x); };
          setTimeout(ldinsp, 0);
          })(); `,
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
