import { getFirestore } from "firebase-admin/firestore";
const membersHelpers = require("../../scripts/membersHelpers.js");
const movementHelpers = require("../../scripts/movementHelpers.js");

module.exports = ({ environment }) => async (change, context) => {
  const db = getFirestore();

  const before = change.before.exists ? change.before.data() : null;
  const after = change.after.exists ? change.after.data() : null;

  if (change.before.exists) {
    before.id = change.before.exists ? change.before.id : null;
  }
  if (change.after.exists) {
    after.id = change.after.exists ? change.after.id : null;
  }

  let stylesDoc = await change.after.ref.parent.parent.parent.parent
    .collection("lists")
    .doc("styles")
    .get();

  let stats = stylesDoc.data() ? stylesDoc.data() : {};
  // console.log("stats before", stats);

  // get all the members in the tree to check for changes
  let members = {};
  let subTrees = {};
  for (let ind in after) {
    // console.log(after[ind]);
    if (!after[ind].subTreeParent) {
      members[ind] = { ...after[ind], id: ind };
    } else {
      subTrees[ind] = { id: ind };
    }
  }

  // calculate totals
  stats.treeTotal = {
    id: "treeTotal",
    total: Object.keys(members).length - 1
  };
  // console.log(stats);

  // calculate roles and mods
  stats = { ...stats, ...movementHelpers.calcStats(stats, members) };
  // console.log(stats);

  // calculate complex
  stats = { ...stats, ...movementHelpers.calcComplexStats(stats, members) };
  // console.log(stats);

  // calculate calculated stats
  stats = { ...stats, ...movementHelpers.calcCalculatedStats(stats) };
  // console.log(stats);

  // add stats from sub trees
  stats.imports = Object.keys(subTrees);

  // save the stats
  const treeDocRef = db
    .collection(environment.schema.movements)
    .doc(
      context.params.movId ? context.params.movId : context.params.movementId
    )
    .collection("trees")
    .doc(context.params.treeId);
  const statsDoc = await treeDocRef
    .collection("components")
    .doc("stats")
    .set(stats);
  return true;
};
