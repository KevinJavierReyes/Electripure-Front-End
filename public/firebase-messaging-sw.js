importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js');

const firebaseConfig = {
    "apiKey": "AIzaSyDRx7HiK9jki6_WNKpR2DiflthdnLNuVrE",
    "authDomain": "electripure-498d1.firebaseapp.com",
    "projectId": "electripure-498d1",
    "storageBucket": "electripure-498d1.appspot.com",
    "messagingSenderId": "179416245805",
    "appId": "1:179416245805:web:37e35d078736ad16563aa4"
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
    console.log(
      '[firebase-messaging-sw.js] Received background message ',
      payload
    );

  //   {
  //     "from": "179416245805",
  //     "collapseKey": "campaign_collapse_key_4546280129572363256",
  //     "notification": {
  //         "title": "Test 01",
  //         "body": "Contenido del test 01",
  //         "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/React.svg/1200px-React.svg.png"
  //     },
  //     "data": {
  //         "gcm.n.e": "1",
  //         "google.c.a.ts": "1678968465",
  //         "clave2": "valor2",
  //         "google.c.a.udt": "0",
  //         "clave1": "valor1",
  //         "google.c.a.c_id": "4546280129572363256",
  //         "gcm.notification.sound2": "default",
  //         "google.c.a.e": "1",
  //         "google.c.a.c_l": "Test01"
  //     }
  // }

    const notificationTitle = payload.notification.title;
    const notificationOptions = {
      body: payload.notification.body,
      icon: payload.notification.image
    };
  
    self.registration.showNotification(notificationTitle, notificationOptions);
});