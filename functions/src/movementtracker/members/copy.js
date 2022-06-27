import { getFirestore } from "firebase-admin/firestore";
import { updateTimestamp } from "../../scripts/updateTimestamp";

module.exports = ({ environment }) => async (data, context) => {
  // context.app will be undefined if the request doesn't include a valid
  // App Check token.
  // if (context.app == undefined && process.env.FUNCTIONS_EMULATOR !== "true") {
  //   console.error(
  //     "failed-precondition",
  //     "The function must be called from an App Check verified app."
  //   );
  // }
  const movRef = getFirestore().doc(`/movements/${data.movId}`);
  const membersCol = movRef.collection(`members`);
  const memberRef = membersCol.doc(data.memberId);
  const treesCol = movRef.collection("trees");
  const newMemberRef = membersCol.doc();

  let batch = getFirestore().batch();

  let memberDoc = await memberRef.get();
  let trees = memberDoc.get("trees");
  let promises = [];
  for (let ii in trees) {
    // console.log(trees[ii]);
    promises.push(
      treesCol
        .doc(trees[ii])
        .collection("components")
        .doc("parents")
        .get()
    );
  }

  batch.set(newMemberRef, {
    ...memberDoc.data(),
    id: newMemberRef.id,
    name: "Copy of " + memberDoc.get("name")
  });

  let treeDocs = await Promise.all(promises);
  for (let ii in treeDocs) {
    await treeDocs[ii];
    batch.update(treeDocs[ii].ref, {
      [newMemberRef.id]: treeDocs[ii].get(memberRef.id)
    });
  }

  return batch
    .commit()
    .then(() => {
      console.log("Batch successfully committed!");
      return updateTimestamp(movRef)
    })
    .catch(error => {
      console.log("Batch failed: ", error);
    });
};
