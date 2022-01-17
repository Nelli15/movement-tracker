const functions = require("firebase-functions");
const admin = require("firebase-admin");
const environment = require("./../environments/environment.js");

const onChange = require("./styles/onChange.js");

const context = {
  admin,
  environment
};

exports.onChange = functions.firestore
  .document("/movements/{movId}/styles/{styleId}")
  .onWrite(onChange(context));
