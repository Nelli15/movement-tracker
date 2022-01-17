const _delete = require("../../scripts/delete.js");

module.exports = ({ admin, environment }) => async (change, context) => {
   const db = admin.firestore();
   const movRef = change.before.ref.parent.parent;
  const treesList = movRef.collection("lists").doc("trees");

  const before = change.before.exists ? change.before.data() : null;
  const after = change.after.exists ? change.after.data() : null;

  if (change.before.exists) {
    before.id = change.before.exists ? change.before.id : null;
  }
  if (change.after.exists) {
    after.id = change.after.exists ? change.after.id : null;
  }

  let promises = [];

  // respond to a deleted tree
  if (!after) {
    let treesDoc = await treesList.get();
    if(treesDoc.exists) {
    promises.push(
      treesList
        .update({ [before.id]: admin.firestore.FieldValue.delete() })
        .catch(err => console.log(err))
    );
    }

  const collections = await change.before.ref.listCollections();
  collections.forEach(col => {
    _delete.deleteCollection(db, col.path, 50);
  });
  }

  // resond to an update to the tree
  if (after) {
    if (!before || before.label !== after.label) {
      promises.push(
        treesList.set(
          { [after.id]: { id: after.id, label: after.label } },
          { merge: true }
        )
      );
    }
  }
  return Promise.all(promises).catch(err => console.log(err));
};
