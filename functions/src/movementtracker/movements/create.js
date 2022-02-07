import { getFirestore, Timestamp } from "firebase-admin/firestore";

module.exports = ({ environment }) => async (data, context) => {
  // context.app will be undefined if the request doesn't include a valid
  // App Check token.
  // if (context.app == undefined && process.env.FUNCTIONS_EMULATOR !== "true") {
  //   console.error(
  //     "failed-precondition",
  //     "The function must be called from an App Check verified app."
  //   );
  // }

  var db = getFirestore();
  // console.log(context.auth)
  const newMovement = {
    name: "Untitled Movement",
    style: { backgroundColor: "#ffffff" },
    last_modified: Timestamp.fromDate(new Date())
  };

  // Get a new write batch
  const batch = db.batch();

  // create the movement document
  const movementDoc = db.collection(environment.schema.movements).doc();
  batch.set(movementDoc, newMovement);

  // var treeDoc = movementDoc.collection('/trees').doc('/tree')
  // batch.set(treeDoc, {root:[],'No Parent':[]})

  const roleDoc = movementDoc.collection("/users/").doc(context.auth.uid);
  batch.set(roleDoc, {
    name: context.auth.token.name ? context.auth.token.name : "",
    email: context.auth.token.email,
    role: "owner",
    accepted: true,
    uid: context.auth.uid
  });

  const roleDefinitionsCol = movementDoc.collection("/user-role-definitions");
  batch.set(roleDefinitionsCol.doc("owner"), {
    label: "Owner",
    rules: {
      snapshots_view: true,
      snapshots_update: true,
      events_create: true,
      members_create: true,
      members_export: true,
      members_edit: true,
      members_delete: true,
      members_view: true,
      subTrees_add: true,
      subTrees_remove: true,
      movement_edit: true,
      movement_copy: true,
      movement_carbonCopy: true,
      movement_delete: true,
      trends_view: true,
      trends_movementGraphs_create: true,
      trends_movementGraphs_delete: true,
      trends_movementGraphs_view: true,
      access_view: true,
      access_users_revoke: true,
      access_users_invite: true,
      access_userRoles_create: true,
      access_userRoles_delete: true,
      access_userRoles_edit: true,
      trees_create: true,
      trees_export: true,
      trees_delete: true,
      trees_view: true,
      settings_view: true,
      settings_calc_view: true,
      settings_calc_create: true,
      settings_calc_edit: true,
      settings_calc_delete: true,
      settings_complex_view: true,
      settings_complex_create: true,
      settings_complex_delete: true,
      settings_complex_edit: true,
      settings_mods_view: true,
      settings_mods_create: true,
      settings_mods_delete: true,
      settings_mods_edit: true,
      settings_roles_view: true,
      settings_roles_create: true,
      settings_roles_delete: true,
      settings_roles_edit: true
    }
  });
  batch.set(roleDefinitionsCol.doc("superEditor"), {
    label: "Super Editor",
    rules: {
      snapshots_view: true,
      snapshots_update: true,
      events_create: true,
      members_create: true,
      members_export: true,
      members_edit: true,
      members_delete: true,
      members_view: true,
      subTrees_add: true,
      subTrees_remove: true,
      movement_edit: true,
      movement_copy: true,
      movement_carbonCopy: true,
      movement_delete: false,
      trends_view: true,
      trends_movementGraphs_create: true,
      trends_movementGraphs_delete: true,
      trends_movementGraphs_view: true,
      access_view: true,
      access_users_revoke: true,
      access_users_invite: true,
      access_userRoles_create: true,
      access_userRoles_delete: true,
      access_userRoles_edit: true,
      trees_create: true,
      trees_export: true,
      trees_delete: true,
      trees_view: true,
      settings_view: true,
      settings_calc_view: true,
      settings_calc_create: true,
      settings_calc_edit: true,
      settings_calc_delete: true,
      settings_complex_view: true,
      settings_complex_create: true,
      settings_complex_delete: true,
      settings_complex_edit: true,
      settings_mods_view: true,
      settings_mods_create: true,
      settings_mods_delete: true,
      settings_mods_edit: true,
      settings_roles_view: true,
      settings_roles_create: true,
      settings_roles_delete: true,
      settings_roles_edit: true
    }
  });
  batch.set(roleDefinitionsCol.doc("editor"), {
    label: "Editor",
    rules: {
      snapshots_view: true,
      snapshots_update: false,
      events_create: true,
      members_create: true,
      members_export: false,
      members_edit: true,
      members_delete: false,
      members_view: true,
      subTrees_add: true,
      subTrees_remove: true,
      movement_edit: true,
      movement_copy: true,
      movement_carbonCopy: false,
      movement_delete: false,
      trends_view: true,
      trends_movementGraphs_create: false,
      trends_movementGraphs_delete: false,
      trends_movementGraphs_view: true,
      access_view: true,
      access_users_revoke: false,
      access_users_invite: false,
      access_userRoles_create: false,
      access_userRoles_delete: false,
      access_userRoles_edit: false,
      trees_create: true,
      trees_export: false,
      trees_delete: false,
      trees_view: true,
      settings_view: true,
      settings_calc_view: true,
      settings_calc_create: false,
      settings_calc_edit: false,
      settings_calc_delete: false,
      settings_complex_view: true,
      settings_complex_create: false,
      settings_complex_delete: false,
      settings_complex_edit: false,
      settings_mods_view: true,
      settings_mods_create: false,
      settings_mods_delete: false,
      settings_mods_edit: false,
      settings_roles_view: true,
      settings_roles_create: false,
      settings_roles_delete: false,
      settings_roles_edit: false
    }
  });

  batch.set(roleDefinitionsCol.doc("viewer"), {
    label: "Viewer",
    rules: {
      snapshots_view: true,
      snapshots_update: false,
      events_create: false,
      members_create: false,
      members_export: false,
      members_edit: false,
      members_delete: false,
      members_view: true,
      subTrees_add: false,
      subTrees_remove: false,
      movement_edit: false,
      movement_copy: false,
      movement_carbonCopy: false,
      movement_delete: false,
      trends_view: true,
      trends_movementGraphs_create: false,
      trends_movementGraphs_delete: false,
      trends_movementGraphs_view: false,
      access_view: true,
      access_users_revoke: false,
      access_users_invite: false,
      access_userRoles_create: false,
      access_userRoles_delete: false,
      access_userRoles_edit: false,
      trees_create: false,
      trees_export: false,
      trees_delete: false,
      trees_view: true,
      settings_view: true,
      settings_calc_view: true,
      settings_calc_create: false,
      settings_calc_edit: false,
      settings_calc_delete: false,
      settings_complex_view: true,
      settings_complex_create: false,
      settings_complex_delete: false,
      settings_complex_edit: false,
      settings_mods_view: true,
      settings_mods_create: false,
      settings_mods_delete: false,
      settings_mods_edit: false,
      settings_roles_view: true,
      settings_roles_create: false,
      settings_roles_delete: false,
      settings_roles_edit: false
    }
  });

  let mainTreeDoc = movementDoc.collection("trees").doc("main-tree");
  batch.set(mainTreeDoc, {
    id: "main-tree",
    label: "Main Tree"
  });

  batch.set(mainTreeDoc.collection("components").doc("parents"), {});
   batch.set(mainTreeDoc.collection("components").doc("tree"), {tree: []});
    batch.set(mainTreeDoc.collection("components").doc("stats"), {});

  let noParentTreeDoc = movementDoc.collection("trees").doc("noParents");
  batch.set(noParentTreeDoc, {
    id: "noParents",
    label: "No Parents"
  });

  batch.set(noParentTreeDoc.collection("components").doc("parents"), {});
  batch.set(noParentTreeDoc.collection("components").doc("tree"), {tree: []});
  batch.set(noParentTreeDoc.collection("components").doc("stats"), {});

  batch.set(movementDoc.collection("lists").doc("styles"), {});

  batch.set(movementDoc.collection("styles").doc("example-role"), {
    label: "Example Role",
    desc:
      "This is a Role. Each Member of the Movement must have a role applied to it. Create/Edit/Delete Roles in the Role tab on the Settings page.",
    type: "role",
    style: {
      background: "#ffffff",
      color: "#000000",
      outline: "#ffffff",
      shape: "not-round",
      underline: false
    }
  });
  batch.set(movementDoc.collection("styles").doc("example-mod"), {
    label: "Example Modifier",
    desc:
      "This is a Modifier (Optional). Each Member of the Movement can have multiple Modifiers applied to it. Create/Edit/Delete Modifiers in the Modifiers tab on the Settings page. The Modifiers override the default styling of a Member's Role. They provide an easy way to tag Members with simple information. Be careful when setting up your modifiers, a Member with multiple conflicting Modifiers will use the first Modifier that overrides a particular element of a Member's style. Having conflicting styles may cause a Member's style to be inconsistant and unpredictable.",
    type: "mod",
    style: {
      background: "#ffffff",
      backgroundOverride: false,
      color: "#000000",
      colorOverride: false,
      outline: "#ffffff",
      outlineOverride: false,
      shape: "not-round",
      shapeOverride: false,
      underline: false,
      underlineOverride: false,
      prepend: false
    }
  });
  batch.set(movementDoc.collection("styles").doc("example-complex"), {
    label: "Example Complex Statistic",
    desc:
      "This is a Complex Statistic. Each Role and Modifier automatically counts the number of Members with the Role or Modifier. The Compex Statistic allows you to define a theoretical Member of the Movement and then find and count the number of times that the theoretical Member exists in the Movement. Create/Edit/Delete Complex Statistics in the Complex tab on the Settings page.",
    type: "complex",
    condition: {
      class: "expression",
      elements: [
        {
          gen: "member",
          class: "condition",
          id: "example-role",
          included: true
        },
        {
          gen: "member",
          class: "condition",
          id: "example-mod",
          included: false
        }
      ],
      operator: "AND"
    }
  });
  batch.set(movementDoc.collection("styles").doc("example-calc"), {
    label: "Example Calculated Statistic",
    desc:
      "This is a Calculated Statistic. The Calculted Statistic allows you to matematically calculate statistics based on real time Role|Modifier|Complex values. Create/Edit/Delete Calculated Statistics in the Calculated tab on the Settings page.",
    type: "calc",

    condition: {
      class: "expression",
      elements: [
        {
          class: "expression",
          elements: [
            {
              class: "condition",
              id: "example-complex"
            },
            {
              class: "condition",
              id: "treeTotal"
            }
          ],
          operator: "divide"
        },
        {
          class: "number",
          value: "100"
        }
      ],
      operator: "multiply"
    }
  });

  return batch
    .commit()
    .then(async () => {
      const memberPromises = [];
      memberPromises.push(
        movementDoc
          .collection("members")
          .doc("example-member")
          .set({
            name: "Example Member",
            role: "example-role",
            mods: ["example-mod"],
            notes:
              "This is a Member of the Movement who is a first level Member of the Movement",
            trees: ["main-tree"]
          })
          .then(res => {
            return mainTreeDoc
              .collection("components")
              .doc("parents")
              .set(
                {
                  "example-member": {
                    parent: "root"
                  }
                },
                { merge: true }
              );
          })
      );

      memberPromises.push(
        movementDoc
          .collection("members")
          .doc("example-no-parent-member")
          .set({
            name: "Example No Parent Member",
            role: "example-role",
            mods: [],
            notes:
              "This is a Member of the Movement who is not a first level Member of the Movement but also doesn't have a parent who is in the Movement.",
            trees: ["noParents"]
          })
          .then(res => {
            noParentTreeDoc
              .collection("components")
              .doc("parents")
              .set(
                {
                  "example-no-parent-member": {
                    parent: "root"
                  }
                },
                { merge: true }
              );
          })
      );

      memberPromises.push(
        movementDoc
          .collection("members")
          .doc("example-parent-member")
          .set({
            name: "Example Member with Parent",
            role: "example-role",
            mods: [],
            notes:
              "This is a Member of the Movement who is connected to the Movement through another Member of the Movement (aka Parent).",
            trees: ["main-tree"]
          })
          .then(res => {
            mainTreeDoc
              .collection("components")
              .doc("parents")
              .set(
                {
                  "example-parent-member": {
                    parent: "example-member"
                  }
                },
                { merge: true }
              );
          })
      );
      return await Promise.all(memberPromises);
    })
    .then(() => {
      return {
        movId: movementDoc.id,
        success: true,
        roleDoc: roleDoc.id
      };
    })
    .catch(err => {
      console.error(new Error("Oops, something went wrong: " + err));
    });
};
