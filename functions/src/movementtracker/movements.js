const functions = require("firebase-functions");
const admin = require("firebase-admin");
const environment = require("./../environments/environment.js");

const create = require("./movements/create.js");
const copy = require("./movements/copy.js");
const carbonCopy = require("./movements/carbonCopy-requires update.js");
const onUpdate = require("./movements/onUpdate.js");
const onDelete = require("./movements/onDelete.js");

const context = {
  admin,
  environment
};

exports.create = functions.https.onCall(create(context));

exports.copy = functions.https.onCall(copy(context));

exports.carbonCopy = functions.https.onCall(carbonCopy(context));

exports.onUpdate = functions.firestore
  .document("/movements/{movId}")
  .onUpdate(onUpdate(context));

exports.onDelete = functions.firestore
  .document("/movements/{movId}")
  .onDelete(onDelete(context));

// new functions for members_changed
// exports.updateTrees = functions.pubsub
//   .topic('member_list_updated')
//   .onPublish(updateTrees(context))

// exports.updateStats = functions.pubsub
//   .topic('member_list_updated')
//   .onPublish(updateStats(context))

// exports.rebuildComponents = functions.https.onCall(rebuildComponents(context))
