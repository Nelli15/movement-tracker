const functions = require('firebase-functions')
const admin = require('firebase-admin')
const environment = require('./../environments/environment.js')
const serviceAccount = require('./../../test-serviceAccount.json')
process.env.GCLOUD_PROJECT = serviceAccount.project_id
process.env.FIREBASE_CONFIG = {
  apiKey: "AIzaSyB5TEdUxGoyvSlfUIFKjf-JTCbQ4FC1NFQ",
  authDomain: "mt-testing-548bd.firebaseapp.com",
  projectId: "mt-testing-548bd",
  storageBucket: "mt-testing-548bd.appspot.com",
  messagingSenderId: "360577965898",
  appId: "1:360577965898:web:de87cb25eac2493decebb3"
}
process.env.FIRESTORE_EMULATOR_HOST = "localhost:8080";
process.env.FIREBASE_FIRESTORE_EMULATOR_ADDRESS = "localhost:8080";

if (!admin.apps.length) {
  admin.initializeApp(
    Object.assign(environment.firebase, {
      credential: admin.credential.cert(serviceAccount),
      databaseURL: 'https://tracking-tree.firebaseio.com'
    })
  )
}

module.exports = admin