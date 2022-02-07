import { initializeApp, cert } from "firebase-admin/app";
const serviceAccount = require("./../../../serviceAccount-test.json");
process.env.GCLOUD_PROJECT = serviceAccount.project_id;
process.env.FIREBASE_CONFIG = require("./../../../fbConfig-test.json");
// console.log(process.env.FIREBASE_CONFIG)
process.env.FIRESTORE_EMULATOR_HOST = "localhost:8080";
process.env.FIREBASE_FIRESTORE_EMULATOR_ADDRESS = "localhost:8080";

initializeApp({
  credential: cert(serviceAccount),
  databaseURL: "https://tracking-tree.firebaseio.com",
});
