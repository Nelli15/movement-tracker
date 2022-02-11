import { getFirestore } from "firebase-admin/firestore";

module.exports = ({ environment }) => async (change, context) => {
  /* Accepts an invite to a movement, invites are also accepted by send invite, if the user is already an app user.*/
  //get firestore
  var db = getFirestore();

  // get data from before and after
  var beforeData = change.before.data();
  var afterData = change.after.data();
  // if no style data create some
  if (!beforeData.style) {
    beforeData.style = { backgroundColor: "#ffffff"};
  }
  // if background color missing, make it white
  if (!beforeData.style.backgroundColor) {
    beforeData.style.backgroundColor = "#ffffff";
  }

  // check if change marked the invite accepted
  if (
    afterData.accepted === true &&
    afterData.accepted !== beforeData.accepted
  ) {
    // invite marked accepted
    // get the app-user ref 
    var userRef = change.before.ref.parent.parent;
    // get the movement doc ref
    var movementRoleRef = db
      .collection(`/movements/${beforeData.movId}/users`)
      .doc(`${context.params.uid}`);
    // get the ref of the invite
    var movementInviteRef = db
      .collection(`/movements/${beforeData.movId}/invites`)
      .doc(`${beforeData.email}`);

      // create a transaction to process the acceptance
    return db.runTransaction(async transaction => {
      // get the app-user data
      let userSnap = await transaction.get(userRef).catch(err => {
        console.error(new Error("Oops, something went wrong: " + err));
      });
      var user = userSnap.data();
      // get the invite data
      let inviteSnap = await transaction.get(movementInviteRef).catch(err => {
        console.error(new Error("Oops, something went wrong: " + err));
      });

      // check if the invite still exists
      if (inviteSnap.exists) {
        console.log({
          name: user.name,
          email: user.email,
          role: beforeData.role.id,
          photoURL: user.photoURL,
          uid: context.params.uid
        })
        // add a user to the movement with the data from before the change and the most recent user data
        transaction.set(movementRoleRef, {
          name: user.name,
          email: user.email,
          role: beforeData.role.id,
          photoURL: user.photoURL,
          uid: context.params.uid
        });
        // delete the invite doc
        transaction.delete(movementInviteRef);
        return true;
      } else {
        // transaction.delete(notificationRef)
        transaction.delete(movementInviteRef);
        return false;
      }
    });
  }
  return true;
};
