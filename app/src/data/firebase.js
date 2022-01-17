import { initializeApp } from '@firebase/app';

import {
  initializeFirestore,
  enableIndexedDbPersistence
} from '@firebase/firestore';

import { getFunctions, connectFunctionsEmulator } from 'firebase/functions';
import { getAnalytics } from 'firebase/analytics';
import {
  connectAuthEmulator,
  initializeAuth,
  browserSessionPersistence,
  browserPopupRedirectResolver
} from '@firebase/auth';
import { getDatabase, connectDatabaseEmulator } from 'firebase/database';
// import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";

const firestoreSettings = {};

// const shouldUseEmulator = window.location.hostname === 'localhost' // or other logic to determine when to use
// // Emulate RTDB
// if (shouldUseEmulator) {
//   config.databaseURL = `http://localhost:9000?ns=${config.projectId}`
//   console.debug(`Using RTDB emulator: ${config.databaseURL}`)
// }


const firebaseApp = initializeApp(require('./../../../fbConfig.json'));
// const appCheckSiteKey = '6Lf2kcMbAAAAAMXGC0d4_EMUmT9Dzq2fxIJPu7rm'
// const appCheck = initializeAppCheck(firebaseApp, { isTokenAutoRefreshEnabled: true, provider: ReCaptchaV3Provider })
const authApp = initializeAuth(firebaseApp, {
  persistence: browserSessionPersistence,
  popupRedirectResolver: browserPopupRedirectResolver
});
const dbApp = getDatabase(firebaseApp)

if (location.hostname === 'localhost') {
  firestoreSettings.host = 'localhost:8080';
  firestoreSettings.ssl = false;
  firestoreSettings.experimentalAutoDetectLongPolling = true;
  connectFunctionsEmulator(getFunctions(firebaseApp), 'localhost', '5001');
  connectAuthEmulator(authApp, 'http://127.0.0.1:9099');
  connectDatabaseEmulator(dbApp, 'localhost', '9000')
}

const db = initializeFirestore(firebaseApp, firestoreSettings);
const funcs = getFunctions();
const analytics = getAnalytics();


if (process.env.PROD) {
  enableIndexedDbPersistence(db).catch(function(err) {
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
}

export const $firebase = firebaseApp;
export const $auth = authApp;

export default {
  $firebase,
  $auth
};
