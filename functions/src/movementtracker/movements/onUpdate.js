module.exports = ({ admin, environment }) => async (change, context) => {
  // If the document does not exist, it has been deleted.
  const db = admin.firestore();
  const before = change.before.data();
  const after = change.after.data();

  if (!change.after.exists) return;
  if (!before || !after) return;

  // console.log("Movement Changed: " + change.after.id);
  // if (before.last_modified !== after.last_modified) {
  //   return updateNowSnap({ movId: change.after.id })
  // }

  if (
    before.name !== after.name ||
    before.style.backgroundColor !== after.style.backgroundColor
  ) {
    return db
      .doc(`/${environment.schema.movements}/${context.params.movId}`)
      .update({
        last_modified: admin.firestore.Timestamp.fromDate(new Date())
      });
  } else {
    return true;
  }
};
