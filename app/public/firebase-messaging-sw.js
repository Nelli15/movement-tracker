importScripts('https://www.gstatic.com/firebasejs/7.6.1/firebase-app.js')
importScripts('https://www.gstatic.com/firebasejs/7.6.1/firebase-messaging.js')

const config = {
  apiKey: 'AIzaSyCbNAAuPDzBoMegreNo8Ec_2zsg0DDj0as',
  authDomain: 'tracking-tree.firebaseapp.com',
  databaseURL: 'https://tracking-tree.firebaseio.com',
  projectId: 'tracking-tree',
  storageBucket: 'tracking-tree.appspot.com',
  messagingSenderId: '15714550710',
  appId: '1:15714550710:web:02a4b217e370ac0c',
  measurementId: 'G-BPGJEN2F51'
}

firebase.initializeApp(config)

const messaging = firebase.messaging()

messaging.setBackgroundMessageHandler(function (payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  // Customize notification here
  const notificationTitle = 'Background Message Title';
  const notificationOptions = {
    body: 'Background Message body.',
    icon: 'app-logo-128x128.png'
  };

  return self.registration.showNotification(notificationTitle,
    notificationOptions);
})