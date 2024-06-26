import {initializeApp} from 'firebase/app'
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import firebase from 'firebase/compat/app';
import 'firebase/messaging';

const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID
};

initializeApp(firebaseConfig);

const messaging = getMessaging();

export const requestForToken = () => {
  console.log(process.env.REACT_APP_VAPID_KEY)
  return getToken(messaging, {vapidKey: process.env.REACT_APP_VAPID_KEY})
  .then((currentToken) => {
    if (currentToken) {
      return currentToken
    } else {
      // Show permission request UI
      console.log('No registration token available. Request permission to generate one.');
      // ...
    }
  })
  .catch(err => {
    console.log('Error', err);
  })
}

export const onMessageListener = () => {
  return new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      console.log('OnMessage Payload', payload);
      const options = {
        body: payload.notification.body
        , icon: payload.notification.icon
      }
      const notification = new Notification(payload.notification.title, options);
      resolve(payload);
    })
  })
}