// Scripts for firebase and firebase messaging
// eslint-disable-next-line no-undef
importScripts("https://www.gstatic.com/firebasejs/10.11.0/firebase-app-compat.js");
// eslint-disable-next-line no-undef
importScripts("https://www.gstatic.com/firebasejs/10.11.0/firebase-messaging-compat.js");

// if ('serviceWorker' in navigator) {
//     navigator.serviceWorker.register('../firebase-messaging-sw.js')
//         .then(function (registration) {
//             console.log('Registration successful, scope is:', registration.scope);
//         }).catch(function (err) {
//             console.log('Service worker registration failed, error:', err);
//         });
// }
// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
    apiKey: "AIzaSyAg6CyHRHm96FQo6b60omi56Zzi6izwxlw",
    authDomain: "youpt-605fa.firebaseapp.com",
    projectId: "youpt-605fa",
    storageBucket: "youpt-605fa.appspot.com",
    messagingSenderId: "337137767170",
    appId: "1:337137767170:web:6b3ad8d202786951a1a81b"
};
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
    console.log("Received background message ", payload);

    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload?.notification?.body,
    };

    // eslint-disable-next-line no-restricted-globals
    self.registration.showNotification(
        notificationTitle,
        notificationOptions,
    );
});
