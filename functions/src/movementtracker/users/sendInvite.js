import { getFirestore } from "firebase-admin/firestore";

module.exports =
  ({ environment }) =>
  async (inviteSnap, context) => {
    /* Checks if the user has been invited, auto accepts the invite if they have used the app before or sends an email to notify the user if they haven't */
    // get firestore
    var db = getFirestore();
    // get the invite details
    var inviteData = inviteSnap.data();
    // get the app user doc
    let appUserDoc = await db
      .collection("/app-users")
      .where("email", "==", inviteData.email.toLowerCase())
      .get()
      .catch((err) => {
        console.error(err);
      });
    // check if the user being invited exists
    if (!appUserDoc.empty) {
      // user exists
      // get the user's uid
      for (var key in appUserDoc.docs) {
        const uid = appUserDoc.docs[key].id;
        // add the user to the movement and delete the invite
        var batch = db.batch();
        const userData = appUserDoc.docs[key].data();
        // add the user to the movement
        batch.set(db.doc(`/movements/${context.params.movId}/users/${uid}`), {
          uid,
          name: userData.name,
          email: userData.email,
          photoURL: userData.photoURL,
          role: inviteData.role.id,
        });
        // delete the invite
        batch.delete(inviteSnap.ref);
        return batch.commit().catch((err) => {
          console.log(err);
        });
      }
    } else if (inviteData.email !== inviteData.email.toLowerCase()) {
      // the user doesn't exist
      // check the email is in lower case
      // console.log('emails are different')
      // the email wasn't valid, lets convert it to lower case and retry
      inviteData.email = inviteData.email.toLowerCase();
      var newInvite = db.doc(
        `/movements/${
          context.params.movId
        }/invites/${context.params.email.toLowerCase()}`
      );

      const batch = db.batch();
      // delete the old invite
      batch.delete(inviteSnap.ref);
      // add the new invite
      batch.set(newInvite, inviteData);

      return batch.commit().catch((err) => {
        console.error(new Error("Oops, something went wrong: " + err));
      });
    } else {
      // user email was valid send the invite
      return db
        .collection("mail")
        .doc()
        .set({
          to: inviteData.email,
          template: {
            name: "invite",
            data: inviteData,
          },
        })
        .then((res) => {
          return db
            .doc(
              `/movements/${
                context.params.movId
              }/invites/${context.params.email.toLowerCase()}`
            )
            .update({ sent: true })
            .catch((err) =>
              console.error("Failed to update sent field in invite", err)
            );
        })
        .catch((err) => console.error("Failed to send invite to user", err));
    }
  };
