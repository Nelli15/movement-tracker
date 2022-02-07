import { getFirestore, FieldValue } from "firebase-admin/firestore";

const membersHelpers = require("../../scripts/membersHelpers.js");

module.exports = ({ environment }) => async (change, context) => {
  // const topicName = 'style_changed'

  const before = change.before.exists ? change.before.data() : null;
  const after = change.after.exists ? change.after.data() : null;
  if (change.before.exists) {
    before.id = change.before.exists ? change.before.id : null;
  }
  if (change.after.exists) {
    after.id = change.after.exists ? change.after.id : null;
  }

  let stylesRef = change.after.ref.parent.parent
    .collection("lists")
    .doc("styles");

  if (!after) {
    //delete

    let stylesDoc = await stylesRef.get();
    if(stylesDoc.exists) {
    // Delete the style from the style list
    await stylesRef
      .update({
        [change.after.id]: FieldValue.delete()
      })
      .catch(err => console.error(err));
    }
    // Get the User files and remove the style from the role sort criteria
    return change.after.ref.parent.parent
      .collection("users")
      .where("roleSortCriteria", "array-contains", change.before.id)
      .get()
      .then(querySnap => {
        querySnap.forEach(doc => {
          return doc.ref
            .update({
              roleSortCriteria: FieldValue.arrayRemove(
                change.data()
              )
            })
            .catch(err => console.error(err));
        });
        return true;
      })
      .catch(err => console.error(err));
  } else {
    // create/update

    // Add/update style to style list
    await stylesRef
      .set({ [change.after.id]: after }, { merge: true })
      .catch(err => console.error(err));

    // get all the related members
    let members = {};
    let styles = {};

    if (after.type === "base") {
      let snap = await change.after.ref.parent.parent
        .collection("members")
        .where("role", "==", change.after.id)
        .get()
        .catch(err => console.error(err));

      for (let ind in snap.docs) {
        members[snap.docs[ind].ref.id] = {
          ...snap.docs[ind].data(),
          id: snap.docs[ind].ref.id
        };
      }
    }

    if (after.type === "override") {
      let snap = await change.after.ref.parent.parent
        .collection("members")
        .where("mods", "array-contains", change.after.id)
        .get()
        .catch(err => console.error(err));

      for (let ind in snap.docs) {
        members[snap.docs[ind].ref.id] = {
          ...snap.docs[ind].data(),
          id: snap.docs[ind].ref.id
        };
      }
    }

    // Get all the styles related to the member
    if (after.type === "base" || after.type === "override") {
      let stylesDoc = await stylesRef.get().catch(err => console.error(err));
      styles = stylesDoc.data();
    }

    // console.log(members);
    let promises = [];
    for (let ii in members) {
      // ensure all the relevant member data is valid
      let member = {
        name: members[ii].name ? members[ii].name : "",
        mods: members[ii].mods ? members[ii].mods : [],
        role: members[ii].role ? members[ii].role : "",
        notes: members[ii].notes ? members[ii].notes : "",
        id: members[ii] ? members[ii].id : before.id,
        display: members[ii].display ? members[ii].display : {},
        customFields: members[ii].customFields ? members[ii].customFields : {}
      };

      // Compute the display data for the member
      member = await membersHelpers.getDisplayData(member, styles);

      // update the display data
      // console.log(members, member.id);
      promises.push([
        change.after.ref.parent.parent
          .collection("members")
          .doc(member.id)
          .set(member, { merge: true })
      ]);
    }
    return Promise.all(promises).catch(err => console.error(err));
  }
};
