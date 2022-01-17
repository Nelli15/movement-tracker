module.exports = ({ admin, environment }) => (data, context) => {
  // context.app will be undefined if the request doesn't include a valid
  // App Check token.

  // if (context.app == undefined && process.env.FUNCTIONS_EMULATOR !== "true") {
  //   console.error(
  //     "failed-precondition",
  //     "The function must be called from an App Check verified app."
  //   );
  // }

  const db = admin.firestore();
  // console.log("Copying Movement", data);
  const movementRef = db.doc(
    `/${environment.schema.movements}/${
      data.movId ? data.movId : data.movementId
    }`
  );

  const newMovementRef = db.collection(environment.schema.movements).doc();
  const newRoleRef = newMovementRef
    .collection("/users")
    .doc(`${context.auth.uid}`);
  const stylesRef = movementRef.collection("/styles");
  const newStylesRef = newMovementRef.collection("/styles");
  const treesRef = movementRef.collection("/trees");
  const newTreesRef = newMovementRef.collection("/trees");

  // console.log("starting transaction");
  return db
    .runTransaction(async transaction => {
      // This code may get re-run multiple times if there are conflicts.
      const movementDoc = await transaction.get(movementRef);
      if (!movementDoc.exists) {
        console.error(new Error("Movement to be Copied doesn't exist"));
        return false;
      }
      const stylesSnap = await transaction.get(stylesRef);
      const treesSnap = await transaction.get(treesRef);
      const movementData = movementDoc.data();
      transaction.set(newMovementRef, {
        name: "Copy of " + movementData.name,
        style: movementData.style,
        last_modified: admin.firestore.Timestamp.fromDate(new Date())
      });
      transaction.set(newRoleRef, {
        name: context.auth.token.name ? context.auth.token.name : 'Anonymous',
        email: context.auth.token.email,
        role: 'owner',
        uid: context.auth.uid
      });
      for (var doc in stylesSnap.docs) {
        transaction.set(
          newStylesRef.doc(stylesSnap.docs[doc].id),
          stylesSnap.docs[doc].data()
        );
      }
      for (var doc in treesSnap.docs) {console.log(treesSnap.docs[doc].data())
        transaction.set(
          newTreesRef.doc(treesSnap.docs[doc].id),
          treesSnap.docs[doc].data()
        );
      }

      // console.log("New Movement Exists at: ", newMovementRef.id);
      return true;
    })
    .catch(error => {
      console.error("Transaction failed: ", error);
    });
};
