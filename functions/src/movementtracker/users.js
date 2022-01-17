const functions = require("firebase-functions");
const admin = require("firebase-admin");
const environment = require("./../environments/environment.js");

const context = {
  admin,
  environment
};

const acceptInvite = require("./users/acceptInvite.js");
const acceptRequest = require("./users/acceptRequest.js");

const onUserFirstSignIn = require("./users/onUserFirstSignIn.js");
const sendInvite = require("./users/sendInvite.js");
const onUpdate = require("./users/onUpdate.js");
const syncMovUser = require("./users/syncMovUser.js");
const syncRoleDefinitions = require("./users/syncRoleDefinitions.js");

exports.acceptInvite = functions.firestore
  .document("/app-users/{uid}/notifications/{id}")
  .onUpdate(acceptInvite(context));

// Listen for user sign in
exports.onUserFirstSignIn = functions.auth
  .user()
  .onCreate(onUserFirstSignIn(context));

exports.sendInvite = functions.firestore
  .document("/movements/{movId}/invites/{email}")
  .onCreate(sendInvite(context));

exports.onUpdate = functions.firestore
  .document("/app-users/{uid}")
  .onUpdate(onUpdate(context));

exports.acceptRequest = functions.https.onCall(acceptRequest(context));


exports.syncMovUser = functions.firestore
  .document("/movements/{movId}/users/{uid}")
  .onWrite(syncMovUser(context));

  exports.syncRoleDefinitions = functions.firestore
  .document("/movements/{movId}/user-role-definitions/{roleId}")
  .onWrite(syncRoleDefinitions(context));