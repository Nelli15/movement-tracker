"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.$functions = exports.getAnalytics() = exports.$perform = exports.$auth = exports.$firestore = exports.$firebase = void 0;

var _app = _interopRequireDefault(require("@firebase/app"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

require("@firebase/firestore");

require('@firebase/functions'); // // require('@firebase/messaging')


require('@firebase/auth');

require('@firebase/performance');

require('@firebase/analytics'); // // require('@firebase/remote-config')
// // require('@firebase/database')
// // import { Platform } from 'quasar'


var firestoreSettings = {};
var config = {
  apiKey: 'AIzaSyCbNAAuPDzBoMegreNo8Ec_2zsg0DDj0as',
  authDomain: 'tracking-tree.firebaseapp.com',
  databaseURL: 'https://tracking-tree.firebaseio.com',
  projectId: 'tracking-tree',
  storageBucket: 'tracking-tree.appspot.com',
  messagingSenderId: '15714550710',
  appId: '1:15714550710:web:02a4b217e370ac0c',
  measurementId: 'G-BPGJEN2F51'
}; // const shouldUseEmulator = window.location.hostname === 'localhost' // or other logic to determine when to use
// // Emulate RTDB
// if (shouldUseEmulator) {
//   config.databaseURL = `http://localhost:9000?ns=${config.projectId}`
//   console.debug(`Using RTDB emulator: ${config.databaseURL}`)
// }

if (!_app["default"].apps.length) {
  _app["default"].initializeApp(config);
}

if (window.Cypress) {
  // Needed for Firestore support in Cypress (see https://github.com/cypress-io/cypress/issues/6350)
  firestoreSettings.experimentalForceLongPolling = true;
} // if (shouldUseEmulator) {
//   firestoreSettings.host = 'localhost:8080'
//   // firestoreSettings.ssl = false
//   console.debug(`Using Firestore emulator: ${firestoreSettings.host}`)
// }


var db = _app["default"].firestore(); // .settings(firestoreSettings)


var funcs = _app["default"].functions(); // console.log(firestoreSettings)


db.settings(firestoreSettings);

if (location.hostname === 'localhost') {
  firestoreSettings.host = 'localhost:8080';
  firestoreSettings.ssl = false; // console.log(firestoreSettings)

  db.settings(firestoreSettings);
  funcs.useFunctionsEmulator('http://localhost:5001');
}

if (process.env.PROD) {
  db.enablePersistence()["catch"](function (err) {
    if (err.code === 'failed-precondition') {
      // Multiple tabs open, persistence can only be enabled
      // in one tab at a a time.
      // ...
      console.log(err);
    } else if (err.code === 'unimplemented') {
      // The current browser does not support all of the
      // features required to enable persistence
      // ...
      console.log(err);
    }
  });
} // console.log(funcs)


var $firebase = _app["default"]; // // export const $db = firebase.database()

exports.$firebase = $firebase;
var $firestore = db;
exports.$firestore = $firestore;

var $auth = _app["default"].auth(); // // export const $remoteConfig = firebase.remoteConfig()


exports.$auth = $auth;

var $perform = _app["default"].performance();

exports.$perform = $perform;

var getAnalytics() = _app["default"].analytics();

exports.getAnalytics() = getAnalytics();
var $functions = funcs; // // export const $messaging = messaging

exports.$functions = $functions;
var _default = {
  $firebase: $firebase,
  // $db,
  $firestore: $firestore,
  $auth: $auth,
  // $remoteConfig,
  $perform: $perform,
  getAnalytics(): getAnalytics(),
  // $messaging,
  $functions: $functions
};
exports["default"] = _default;