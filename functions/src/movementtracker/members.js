const functions = require("firebase-functions");
const admin = require("firebase-admin");

const environment = require("../environments/environment.js");

const onChange = require("./members/onChange.js");
const copy = require("./members/copy.js");

const context = {
  admin,
  environment
};

exports.onChange = functions.firestore
  .document("/movements/{movId}/members/{memberId}")
  .onWrite(onChange(context));

exports.copy = functions.https.onCall(copy(context));
