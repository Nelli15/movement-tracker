
const functions = require("firebase-functions");
exports.users = require("./users.js");
exports.movements = require("./movements.js");
exports.members = require("./members.js");
exports.snapshots = require("./snapshots.js");
exports.styles = require("./styles.js");
exports.trees = require("./trees.js");

exports.convertMovements = functions.https.onRequest(async (req, res) => {
    let movId = 'FTwJSGQTN5yRd3iN3DFr'
    let movRef = db.doc(`/movements/${movId}`);
    // Get a new write batch
    var batch = db.batch();
    // TODO: update movement
    let movDoc = await movRef.get()
    batch.set(movRef, {
        last_modified: movDoc.get('last_modified'),
        name: movDoc.get('name'),
        style: movDoc.get('style')
    })
    // TODO: clean up members
    let membersSnap = await movRef.collection('members').get()
    for(let doc of membersSnap.docs) {
        batch.set(doc.id, {
        customFields: {},
        display: {
            background: doc.get('background'),
            color: doc.get('color'),
            label: doc.get('label'),
            outline: doc.get('outline'),
            shape: doc.get('shape') ? doc.get('shape') : (doc.get('round') ? 'round':'not-round'),
            underline: doc.get('underline')
        },
        id: doc.get('id'),
        mods: doc.get('overridingStyles'),
        name: doc.get('name'),
        notes: doc.get('notes'),
        role: doc.get('baseStyle'),
        // trees: need to calculate
         })
    }
// TODO: create Role definitions
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
    // copy roles
    let rolesSnap = await movRef.collection('roles').get()
    for(let doc of rolesSnap.docs) {
        batch.set(movRef.collection('users').doc(doc.uid), {
            email: doc.get('email'),
            name: doc.get('name'),
            role: doc.get('role'),
            photoURL: doc.get('photoURL'),
            uid: doc.get('uid')
        })
    }
    
// TODO: update styles
     let stylesSnap = await movRef.collection('styles').get()
    for(let doc of stylesSnap.docs) {
        batch.set(doc.id, {last_modified: movDoc.last_modified, name: movDoc.name, style: movDoc.style })
    }
    
    // {
    //     label,
    //     desc,
    //     icon,
    //     style:{
    //         background,
    //         color,
    //         outline,
    //         prepend?,
    //         shape,
    //         underline,
    //         backgroundOverride?,
    //         colorOverride?,
    //         outlineOverride?,
    //         shapeOverride?,
    //         underlineOverride?,
    //     },
    //     target,
    //     type,
    //     condition,
    // }

    // TODO: trees
    // one for each 
    // {
    //     id,
    //     label
    // }
    // TODO: build trees/components
    // TODO: snapshots
    // TODO: invites
    // TODO: graphs

    // Commit the batch
    batch.commit().then(() => {
        // ...
    });
})