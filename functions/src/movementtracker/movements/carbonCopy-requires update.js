import { getFirestore } from "firebase-admin/firestore";

module.exports = ({ environment }) => (data, context) => {
//   // context.app will be undefined if the request doesn't include a valid
//   // App Check token.
//   // if (context.app == undefined && process.env.FUNCTIONS_EMULATOR !== "true") {
//   //   console.error(
//   //     "failed-precondition",
//   //     "The function must be called from an App Check verified app."
//   //   );
//   // }

//   // console.log(data)
//   // console.log("Carbon Copying Movement", data);
//   const db = getFirestore();
//   const movementRef = db.doc(
//     `/${environment.schema.movements}/${
//       data.movId ? data.movId : data.movementId
//     }`
//   );
//   const newMovementRef = db.collection(environment.schema.movements).doc();
//   const newRoleRef = newMovementRef
//     .collection("/users")
//     .doc(`${context.auth.uid}`);
//   const stylesRef = movementRef.collection("/styles");
//   const newStylesRef = newMovementRef.collection("/styles");
//   const membersRef = movementRef.collection("/members");
//   const newMembersRef = newMovementRef.collection("/members");
//   const snapshotsRef = movementRef.collection("/snapshots");
//   const newSnapshotsRef = newMovementRef.collection("/snapshots");
//   const graphsRef = movementRef.collection("/graphs");
//   const newGraphsRef = newMovementRef.collection("/graphs");
//   return db
//     .runTransaction(async transaction => {
//       // This code may get re-run multiple times if there are conflicts.
//       const movementDoc = await transaction.get(movementRef);
//       if (!movementDoc.exists) {
//         console.error(new Error("Movement to be Copied doesn't exist"));
//         return false;
//       }
//       const stylesSnap = await transaction.get(stylesRef);
//       const snapshotsSnap = await transaction.get(snapshotsRef);
//       const membersSnap = await transaction.get(membersRef);
//       const graphsSnap = await transaction.get(graphsRef);
//       const movementData = movementDoc.data();
//       transaction.set(newMovementRef, {
//         name: "Copy of " + movementData.name,
//         style: movementData.style,
//         last_modified: admin.firestore.Timestamp.fromDate(new Date())
//         // log: [{
//         //   timeStamp: admin.firestore.Timestamp.fromDate(new Date()),
//         //   msg: 'Movement Created'
//         // }]
//       });

//       transaction.set(newRoleRef, {
//         name: context.auth.token.name ? context.auth.token.name : 'Anonymous',
//         email: context.auth.token.email,
//         role: "owner",
//         accepted: true,
//         uid: context.auth.uid
//       });
//       // copy styles
//       for (var doc in stylesSnap.docs) {
//         transaction.set(
//           newStylesRef.doc(stylesSnap.docs[doc].id),
//           stylesSnap.docs[doc].data()
//         );
//       }
//       // copy members
//       for (doc in membersSnap.docs) {
//         transaction.set(
//           newMembersRef.doc(membersSnap.docs[doc].id),
//           membersSnap.docs[doc].data()
//         );
//       }
//       // copy snapshots
//       for (doc in snapshotsSnap.docs) {
//         transaction.set(
//           newSnapshotsRef.doc(snapshotsSnap.docs[doc].id),
//           snapshotsSnap.docs[doc].data()
//         );
//       }
//       // copy graphs
//       for (doc in graphsSnap.docs) {
//         transaction.set(
//           newGraphsRef.doc(graphsSnap.docs[doc].id),
//           graphsSnap.docs[doc].data()
//         );
//       }
//       // console.log('Transaction successfully committed!')
//       // console.log(newMovementRef.id)
//       // console.log("New Movement Exists at: ", newMovementRef.id);
//       return true;
//     })
//     .catch(error => {
//       console.log("Transaction failed: ", error);
//     });
};
