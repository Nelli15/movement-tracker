import { getFirestore, FieldValue } from "firebase-admin/firestore";
import { updateTimestamp } from "../../scripts/updateTimestamp";
const membersHelpers = require("../../scripts/membersHelpers.js");

module.exports = ({ environment }) => async (change, context) => {
// responds to a change in a member
// if deleted then delete the member is removed from all trees and from the list of members
// if created or updated then update the display data, the member list, the parents doc of the relevant trees

  const movRef = change.before.ref.parent.parent;
  const memberList = movRef.collection("lists").doc("members");
  let treeCol = change.after.ref.parent.parent.collection("trees");

  const before = change.before.exists ? change.before.data() : null;
  const after = change.after.exists ? change.after.data() : null;

  if (change.before.exists) {
    before.id = change.before.exists ? change.before.id : null;
  }
  if (change.after.exists) {
    after.id = change.after.exists ? change.after.id : null;
  }

  // check if this is the update caused by the update of the display and return
  if (
    before &&
    after &&
    JSON.stringify(before.display) !== JSON.stringify(after.display)
  )
    return;

  // respond to a deleted member
  if (!after) {
    // member deleted, delete the member from parent docs
    let trees = before.trees;

    let promises = [];

    // delete the member from all the tree/parents docs
    for (let id of trees) {
      let treeRef = treeCol
        .doc(id)
        .collection("components")
        .doc("parents");
      let treeDoc = await treeRef.get();
      // console.log(treeRef.path, treeDoc.exists);
      if (treeDoc.exists) {
        promises.push(
          treeRef
            .update({ [change.before.id]: FieldValue.delete() })
            .catch(err => console.error(err))
        );
      }
    }

    let memberDoc = await memberList.get();
    if(memberDoc.exists) {
    // delete the member from the list of all members
    promises.push(
      memberList
        .update({ [change.after.id]: FieldValue.delete() })
        .catch(err => console.log(err))
    );
    }

    // return once all the updates are finished
    return Promise.all(promises);
  }

  // respond to a new member or member change
  if (after) {
    // ensure all the relevant member data is valid
    let member = {
      name: after.name ? after.name : "",
      mods: after.mods ? after.mods : [],
      role: after.role ? after.role : "",
      notes: after.notes ? after.notes : "",
      id: after ? after.id : before.id,
      display: after.display ? after.display : {},
      customFields: after.customFields ? after.customFields : {}
    };

    // Get all the styles related to the member
    let stylesRef = change.after.ref.parent.parent
      .collection("lists")
      .doc("styles");
    let stylesDoc = await stylesRef.get().catch(err => console.error(err));
    let styles = stylesDoc.data();
    // console.log(styles);

    // let styles = await membersHelpers.getMemberStylesData(after, movRef, []);

    // Compute the display data for the member
    member = await membersHelpers.getDisplayData(member, styles);

    // update the display data
    let promises = [change.after.ref.update(member)];

    // update the member list if the member is not there already or if the name changed
    if (!before || before.name !== after.name) {
      promises.push(
        memberList.set(
          { [after.id]: { id: after.id, name: after.name } },
          { merge: true }
        )
      );
    }

    // update the parents doc with style data
    let stylesList = [];
    if (
      !before ||
      JSON.stringify(before.role) !== JSON.stringify(after.role) ||
      JSON.stringify(before.mods) !== JSON.stringify(after.mods)
    ) {
      stylesList = [after.role, ...after.mods];
    }

    // console.log(stylesList);

    if (stylesList.length > 0) {
      let trees = [...(before ? before.trees : []), ...after.trees];
      trees = [...new Set(trees)];

      // console.log(trees);
      for (let id of trees) {
        // console.log(
        //   "setting: ",
        //   treeCol
        //     .doc(id)
        //     .collection("components")
        //     .doc("parents").path,
        //   " to ",
        //   { [change.before.id + ".styles"]: stylesList }
        // );
        let treeRef = treeCol
          .doc(id)
          .collection("components")
          .doc("parents");
        let treeDoc = await treeRef.get();
        // console.log(treeRef.path, treeDoc.exists);
        if (treeDoc.exists) {
          promises.push(
            treeCol
              .doc(id)
              .collection("components")
              .doc("parents")
              .update({ [change.before.id + ".styles"]: stylesList })
              .catch(err => console.error(err))
          );
        }
      }
    }

    // return once the pending processes are finished
    return Promise.all(promises).then(() => updateTimestamp(movRef)).catch(err => console.log(err));
  }
};
