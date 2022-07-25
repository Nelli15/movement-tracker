// import * as functions from "firebase-functions";

import { initializeApp, applicationDefault } from "firebase-admin/app";

initializeApp({
  credential: applicationDefault(),
  databaseURL: "https://tracking-tree.firebaseio.com",
});

exports.mt = require("./movementtracker");
exports.users = require("./users.js");

// const converter = require("./movementtracker/converter");
// exports.converter = functions
//   .runWith({
//     // Ensure the function has enough memory and time
//     // to process large files
//     timeoutSeconds: 540,
//     memory: "4GB",
//   })
//   .firestore.document("/forceupdate/true")
//   .onCreate(converter());
