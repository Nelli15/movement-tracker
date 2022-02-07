import * as functions from "firebase-functions";
const environment = require("./../environments/environment.js");

const onChange = require("./styles/onChange.js");

const context = {
  environment,
};

exports.onChange = functions.firestore
  .document("/movements/{movId}/styles/{styleId}")
  .onWrite(onChange(context));
