const functions = require("firebase-functions");
const admin = require("firebase-admin");

const environment = require("../environments/environment.js");

const rebuildTree = require("./trees/rebuildTree.js");
const updateStats = require("./trees/updateStats.js");
const onChange = require("./trees/onChange.js");

const context = {
  admin,
  environment
};

exports.rebuildTree = functions.firestore
  .document("/movements/{movId}/trees/{treeId}/components/parents")
  .onWrite(rebuildTree(context));

exports.updateStats = functions.firestore
  .document("/movements/{movId}/trees/{treeId}/components/parents")
  .onWrite(updateStats(context));

exports.onChange = functions.firestore
  .document("/movements/{movId}/trees/{treeId}")
  .onWrite(onChange(context));
