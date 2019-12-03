import React from 'react'
import Document, { Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
  render() {
    return (
      <html>
        <Head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
          <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous" />
          <link href="https://fonts.googleapis.com/css?family=Roboto|Poppins|Cardo|Lato|Montserrat:400,700|Open+Sans+Condensed:300,700|Open+Sans:300,400,600|Raleway:800,700,600,500,400,300,200,100|Lato:800,700,600,500,400,300,200,100" rel="stylesheet" />
          <link rel="stylesheet" id="font-awesome-css" href="//maxcdn.bootstrapcdn.com/font-awesome/4.6.1/css/font-awesome.min.css?ver=4.9.4" type="text/css" media="all" />
          <link rel="stylesheet" href="/_next/static/style.css" />
          <meta charset="utf-8" />
          <title> Veket | Hazle regalos a tu familia en Venezuela, estés donde estés y pagando con tu moneda local</title>
          <meta name="description" content="Envia tortas, flores, chocolates y regalos personalizados a tus amigos y familiares. Puedes hacerlo incluso desde el exterior!" />
          <meta itemProp="name" content="" />
          <meta itemProp="description" content="Envia tortas, flores, chocolates y regalos personalizados a tus amigos y familiares. Puedes hacerlo incluso desde el exterior!" />
          <meta name="twitter:card" content="summary" />
          <meta name="twitter:title" content="" />
          <meta name="twitter:description" content="Envia tortas, flores, chocolates y regalos personalizados a tus amigos y familiares. Puedes hacerlo incluso desde el exterior!" />
          <meta name="twitter:image" content="https://regaloenvenezuela.com/static/images/sharing2.png" />
          
          <meta name="og:title" content="" />
          <meta name="og:description" content="Envia tortas, flores, chocolates y regalos personalizados a tus amigos y familiares. Puedes hacerlo incluso desde el exterior!" />
          <meta name="og:url" content="www.regaloenvenezuela.com" />
          <meta name="og:site_name" content="" />
          <meta name="og:locale" content="es_VE" />
          <meta name="og:type" content="website" />
          <meta property="og:image" content="https://regaloenvenezuela.com/static/images/sharing2.png" />

          <script async src="https://www.googletagmanager.com/gtag/js?id=UA-122147735-1"></script>
          <script  dangerouslySetInnerHTML={{__html:
            `window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'UA-122147735-1');`
           }} />

           <script type="text/javascript" src="https://cdn.jsdelivr.net/gh/space10-community/conversational-form@0.9.83/dist/conversational-form.min.js" crossorigin></script>
           <script src="https://www.gstatic.com/firebasejs/5.5.0/firebase.js"></script>

           <script dangerouslySetInnerHTML={{__html: `
            // Initialize Firebase
            var config = {
              apiKey: "AIzaSyAHDVaye0JeWsF1ZASXgbCqT8vTJMSEdFc",
              authDomain: "regalo-en-venezuela.firebaseapp.com",
              databaseURL: "https://regalo-en-venezuela.firebaseio.com",
              projectId: "regalo-en-venezuela",
              storageBucket: "",
              messagingSenderId: "603482897484"
            };
            firebase.initializeApp(config);
            `}} />

          <script type="text/javascript" dangerouslySetInnerHTML={{__html: `
          (function() {
          window.__insp = window.__insp || [];
          __insp.push(['wid', 1434067058]);
          var ldinsp = function(){
          if(typeof window.__inspld != "undefined") return; window.__inspld = 1; var insp = document.createElement('script'); insp.type = 'text/javascript'; insp.async = true; insp.id = "inspsync"; insp.src = ('https:' == document.location.protocol ? 'https' : 'http') + '://cdn.inspectlet.com/inspectlet.js?wid=1434067058&r=' + Math.floor(new Date().getTime()/3600000); var x = document.getElementsByTagName('script')[0]; x.parentNode.insertBefore(insp, x); };
          setTimeout(ldinsp, 0);
          })(); `}} />
        </Head>
        <body>
          <noscript>
            You need to enable JavaScript to run this app.
          </noscript>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}
