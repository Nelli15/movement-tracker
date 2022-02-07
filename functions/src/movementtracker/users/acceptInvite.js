import { getFirestore } from "firebase-admin/firestore";

module.exports = ({ environment }) => async (change, context) => {
  var db = getFirestore();
  // console.log(context)

  var beforeData = change.before.data();
  var afterData = change.after.data();
  if (!beforeData.style) {
    beforeData.style = {};
  }
  if (!beforeData.style.backgroundColor) {
    beforeData.style.backgroundColor = "#ffffff";
  }

  if (
    afterData.accepted === true &&
    afterData.accepted !== beforeData.accepted
  ) {
    var userRef = change.before.ref.parent.parent;
    var movementRoleRef = db
      .collection(`/movements/${beforeData.movId}/users`)
      .doc(`${context.params.uid}`);
    // var notificationRef = db
    //   .collection(`/users/${context.params.uid}/notifications`)
    //   .doc(`${context.params.id}`)
    var movementInviteRef = db
      .collection(`/movements/${beforeData.movId}/invites`)
      .doc(`${beforeData.email}`);
    beforeData.accepted = true;
    return db.runTransaction(async transaction => {
      let snap = await transaction.get(userRef).catch(err => {
        console.error(new Error("Oops, something went wrong: " + err));
      });
      var user = snap.data();
      snap = await transaction.get(movementInviteRef).catch(err => {
        console.error(new Error("Oops, something went wrong: " + err));
      });
      if (snap.exists) {
        transaction.set(movementRoleRef, {
          name: user.name,
          email: user.email,
          role: beforeData.role,
          photoURL: user.photoURL,
          uid: context.params.uid
        });
        // transaction.update(userRef, { movements: FieldValue.arrayUnion({ name: beforeData.movementName, id: beforeData.movId, style: { backgroundColor: beforeData.style.backgroundColor } }) })
        // transaction.delete(notificationRef)
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
