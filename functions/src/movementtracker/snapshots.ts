import * as functions from "firebase-functions";
const environment = require("./../environments/environment.js");

const saveSnaps = require("./snapshots/saveSnaps.js");
const updateSnap = require("./snapshots/updateSnap.js");
const updateTrendData = require("./snapshots/updateTrendData.js");

const context = {
  environment,
};

exports.monthlySaveSnaps = functions.pubsub
  .schedule("1 of month 00:01")
  .timeZone("Australia/Brisbane")
  .onRun(saveSnaps(context));

exports.updateSnap = functions.https.onCall(updateSnap(context));
// exports.updateSnap = functions.https.onCall(saveSnaps(context));

exports.onSnapStatChange = functions.firestore
  .document(
    "/movements/{movId}/snapshots/{snapId}/trees/{treeId}/components/stats"
  )
  .onWrite(updateTrendData(context));
