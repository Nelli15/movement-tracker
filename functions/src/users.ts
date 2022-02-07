import * as functions from "firebase-functions";
const environment = require("./environments/environment.js");

const context = {
  environment,
};
const onUserFirstSignIn = require("./users/onUserFirstSignIn.js");

// Listen for user sign in
exports.onUserFirstSignIn = functions.auth
  .user()
  .onCreate(onUserFirstSignIn(context));
