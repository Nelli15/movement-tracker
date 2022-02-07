import { initializeApp, applicationDefault } from "firebase-admin/app";

initializeApp({
  credential: applicationDefault(),
  databaseURL: "https://tracking-tree.firebaseio.com",
});

exports.mt = require("./movementtracker");
exports.users = require("./users.js");
