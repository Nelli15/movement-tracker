import { getFirestore } from "firebase-admin/firestore";

const _delete = require("../../scripts/delete.js");

module.exports = ({ environment }) => async (change, context) => {
  // document has been deleted, clean up all other data
  // console.log(change)
  const db = getFirestore();
  const collections = await change.ref.listCollections();
  collections.forEach(col => {
    // console.log('deleting', col.path)
    _delete.deleteCollection(db, col.path, 50);
  });
};
