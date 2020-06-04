importScripts("https://www.gstatic.com/firebasejs/7.14.4/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/7.14.4/firebase-messaging.js"
);

if (!firebase.apps.length) {
  var config = {
    apiKey: "AIzaSyD53LSQgZaTGd7n_g5UxM1j3Gw_K4cpNAw",
    authDomain: "genial-core-212201.firebaseapp.com",
    databaseURL: "https://genial-core-212201.firebaseio.com",
    projectId: "genial-core-212201",
    storageBucket: "genial-core-212201.appspot.com",
    messagingSenderId: "981763353916",
    appId: "1:981763353916:web:7e2e2e626040c2bf2b8239",
  };

  firebase.initializeApp(config);

  const messaging = firebase.messaging();

  messaging.setBackgroundMessageHandler(function (payload) {
    console.log(
      "[firebase-messaging-sw.js] Received background message ",
      payload
    );
    // Customize notification here
    /*var notificationTitle = payload.data.title; 
    var notificationOptions = {
      body: payload.data.body,
      icon: './images/launcher-sq-512x512.png',
      data: {
        link: payload.fcmOptions.link
      }
    };

    return self.registration.showNotification(notificationTitle,
      notificationOptions);*/
    console.log(payload);
  });
  //This is the "Offline page" service worker

  //Add this below content to your HTML page, or add the js file to your page at the very top to register service worker
  if ("serviceWorker" in navigator) {
    if (navigator.serviceWorker.controller) {
      console.log(
        "[PWA Builder] active service worker found, no need to register"
      );
    } else {
      //Register the ServiceWorker
      navigator.serviceWorker
        .register("sw.js", {
          scope: "./",
        })
        .then(function (registration) {
          firebase.messaging().useServiceWorker(registration);
          console.log(
            "Service worker has been registered for scope:" + registration.scope
          );
        });
    }
  }

  /*self.addEventListener("notificationclick", function (event) {
    event.notification.close();

    let url = event.notification.data.link;

    event.waitUntil(
      clients
        .matchAll({
          type: "window",
        })
        .then(function (clientList) {
          for (var i = 0; i < clientList.length; i++) {
            var client = clientList[i];
            if (client.url == url && "focus" in client) return client.focus();
          }
          if (clients.openWindow) return clients.openWindow(url);
        })
    );
  });*/
}
