import { DocumentSnapshot, getFirestore } from "firebase-admin/firestore";
import { Change, EventContext } from "firebase-functions";
import { MembersObj } from "../../models/members";
import { StatsObj, StylesObj } from "../../models/styles";
import {
  calcStats,
  calcComplexStats,
  calcCalculatedStats,
} from "../../scripts/movementHelpers.js";

module.exports =
  ({ environment }: { environment: any }) =>
  async (change: Change<DocumentSnapshot>, context: EventContext) => {
    const db = getFirestore();

    const before = change.before.exists ? change.before.data() : null;
    const after = change.after.exists ? change.after.data() : null;

    if (change.before.exists && before !== null && before !== undefined) {
      before.id = change.before.exists ? change.before.id : null;
    }
    if (change.after.exists && after !== null && after !== undefined) {
      after.id = change.after.exists ? change.after.id : null;
    }

    let stylesDoc = await change.after.ref.parent
      .parent!.parent.parent!.collection("lists")
      .doc("styles")
      .get();

    let styles: StylesObj = stylesDoc.data() ? stylesDoc.data()! : {};
    let stats: StatsObj = {};
    for (var key in styles) {
      if (!key) {
        delete styles[key];
      } else {
        styles[key].id = key;
      }
    }

    // get all the members in the tree to check for changes
    let members: MembersObj = {};
    let subTrees: MembersObj = {};
    for (let ind in after) {
      // console.log(after[ind]);
      if (!after[ind].subTreeParent && ind !== "id") {
        members[ind] = { ...after[ind], id: ind };
      } else {
        subTrees[ind] = { id: ind, subTreeParent: after[ind].subTreeParent };
      }
    }

    // calculate totals
    stats.treeTotal = {
      id: "treeTotal",
      total: Object.keys(members).length - 1,
      members: {},
    };
    // console.log(stats);

    // calculate roles and mods
    // console.log(Object.keys(members).length)
    stats = { ...stats, ...calcStats(styles, members) };
    // console.log(stats);

    // calculate complex
    stats = { ...stats, ...calcComplexStats(styles, members) };
    // console.log(stats);

    // calculate calculated stats
    stats = { ...stats, ...calcCalculatedStats(styles, stats) };
    // console.log(stats);

    // add stats from sub trees
    stats.imports = Object.keys(subTrees);

    // save the stats
    return await db
      .collection(environment.schema.movements)
      .doc(
        context.params.movId ? context.params.movId : context.params.movementId
      )
      .collection("trees")
      .doc(context.params.treeId)
      .collection("components")
      .doc("stats")
      .set(stats);
  };
