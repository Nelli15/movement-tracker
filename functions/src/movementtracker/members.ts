import * as functions from "firebase-functions";

const environment = require("../environments/environment.js");

const onChange = require("./members/onChange.js");
const copy = require("./members/copy.js");

const context = {
  environment,
};

exports.onChange = functions.firestore
  .document("/movements/{movId}/members/{memberId}")
  .onWrite(onChange(context));

exports.copy = functions.https.onCall(copy(context));
