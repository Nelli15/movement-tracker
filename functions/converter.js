
const _delete = require("./src/scripts/delete.js");
const membersHelpers = require("./src/scripts/membersHelpers.js");

module.exports = ({ environment }) => async (req, res) => {
  const buildTree = async (members, parentKey) => {
    // Takes a list of members and a parentKey and returns a tree of children for that parent along with all subsequent grand children
    let children = [],
      ii;
    if (members[parentKey]) {
      // Loop through each of the children for the current parent
      for (ii in members[parentKey]) {
        if (members[parentKey][ii].type !== "subtree") {
          // Construct the next child to be added to the tree
          const data = {
            id: members[parentKey][ii].id,
            children:
              members[parentKey][ii].type !== "shadow"
                ? await buildTree(members, members[parentKey][ii].id)
                : [],
            type: members[parentKey][ii].type,
            parent: members[parentKey][ii].parent,
            key: parentKey + "-" + members[parentKey][ii].id
          };

          // Add the new child to the tree
          children.push(data);
        } else {
          // import the tree doc and add it to the children
          let doc = await db
            .collection(environment.schema.movements)
            .doc(
              context.params.movId
                ? context.params.movId
                : context.params.movementId
            )
            .collection("trees")
            .doc(members[parentKey][ii].id)
            .collection("components")
            .doc("tree")
            .get()
            .catch(err => console.error(err));
          let subTree = doc.data().tree;

          let markAsSubTree = el => {
            el.subTree = members[parentKey][ii].id;
            el.key = members[parentKey][ii].id + "-" + parentKey + "-" + el.id;
            if (el.children) {
              for (let subEl in el.children) {
                markAsSubTree(el.children[subEl]);
              }
            }
            return;
          };
          for (let ind in subTree) {
            markAsSubTree(subTree[ind]);
          }
          children = [...children, ...subTree];
        }
      }
    }
    return children;
  };

  const groupMembersByParent = members => {
    // takes an array of members and returns them grouped by their parent key
    const membersByParent = {};
    for (const ii in members) {
      if (members[ii].parent) {
        if (!membersByParent[members[ii].parent]) {
          membersByParent[members[ii].parent] = [];
        }
        membersByParent[members[ii].parent].push({
          parent: members[ii].parent,
          id: ii,
          type: "normal"
        });
      }
      if (members[ii].shadow) {
        for (const jj in members[ii].shadow) {
          if (!membersByParent[members[ii].shadow[jj]]) {
            membersByParent[members[ii].shadow[jj]] = [];
          }
          membersByParent[members[ii].shadow[jj]].push({
            parent: members[ii].shadow[jj],
            id: ii,
            type: "shadow"
          });
        }
      }

      if (members[ii].subTreeParent) {
        if (!membersByParent[members[ii].subTreeParent]) {
          membersByParent[members[ii].subTreeParent] = [];
        }
        membersByParent[members[ii].subTreeParent].push({
          parent: members[ii].subTreeParent,
          id: ii,
          type: "subtree"
        });
      }
    }
    return membersByParent;
  };
  let BATCH_SIZE
  let addToBatch = async (batch, ref, data) => {
    if(BATCH_SIZE > 499) {
      await batch.commit()
      BATCH_SIZE = 0
      batch = db.batch()
    } 
    BATCH_SIZE++
    await batch.set(ref, data)
    return batch
  }
  BATCH_SIZE = 0
  
  let db = getFirestore()
  // Get a new write batch
  let batch = db.batch();

  // app-users
  let appUsers = {}
  let usersSnap = await db.collection('users').get()
  for(let doc of usersSnap.docs) {
    let userData = doc.data()
    let user = {
      name: userData.name ? userData.name : null,
      email: userData.email,
      photoURL: userData.photoURL ? userData.photoURL : userData.photoUrl ? userData.photoUrl : null,
      uid: doc.id
    }
    appUsers[doc.id] = user
    batch = await addToBatch(batch, db.collection('app-users').doc(doc.id), user)
  }
  await batch.commit();
  let movements = await db.collection('movements').get()
  for (let MovementSnap of movements.docs){
  let movId = MovementSnap.id
  let movRef = db.doc(`/movements/${movId}`);
  // Get a new write batch
  batch = db.batch();
  // update movement
  let movDoc = await movRef.get()
  batch = await addToBatch(batch,movRef, {
      id: movId,
      last_modified: movDoc.get('last_modified') ? movDoc.get('last_modified') : new Date(),
      name: movDoc.get('name'),
      style: movDoc.get('style'),
  })
    // update styles
  let styleList = {}
  let stylesSnap = await movRef.collection('styles').get()
  for(let doc of stylesSnap.docs) {
    let styleData = doc.data()
    let style = {
      label: styleData.label ? styleData.label : '',
      target: styleData.target ? styleData.target : 0,
      desc: styleData.desc ? styleData.desc : ''
    }
    
    switch (styleData.type) {
      case 'base':
        style.type = 'role'
        style.style= styleData.style? styleData.style : {}
        break;
      case 'override':
        style.type = 'mod'
        style.icon = styleData.icon ? styleData.icon : ''
        style.style= styleData.style? styleData.style : {}
        break;
      case 'calc':
        style.type = 'complex'
        style.condition = styleData.condition
        break;
      case 'calculated':
        style.type = 'calc'
        style.condition = styleData.condition
        style.unit = styleData.unit ? styleData.unit : ''
        break;
    }
    batch = await addToBatch(batch,movRef.collection('styles').doc(doc.id), style)
    styleList[doc.id] = style
    batch = await addToBatch(batch,movRef.collection('lists').doc('styles'), styleList)
  }
  // clean up members
  let membersSnap = await movRef.collection('members').get()
  let members = {}
  const treeRef  = movRef.collection('components').doc('trees')
  const treeDoc = await treeRef.get()
  const treeData = treeDoc.data()
  const flattenJSON = (obj = {}, res = {}) => {
    for(key in obj){
        if(typeof obj[key] === 'string'){
          res[obj[key]] = true;
        } else {
          flattenJSON(obj[key], res);
        };
    };
    return res;
  };
  const mainTree = treeData ? flattenJSON(treeData.tree) : []
  const noParents = treeData ? flattenJSON(treeData.noParents) : []
  let mainTreeParents = {}, noParentsParents = {}
  for(let doc of membersSnap.docs) {
    let trees = []
    
    // search the trees for the member Id
    if(mainTree[doc.id]) trees.push("main-tree")
    if(noParents[doc.id]) trees.push('noParents')
    let member = {
      customFields: {},
      id: doc.id,
      mods: doc.get('overrideStyles') ? doc.get('overrideStyles') : doc.get('mods') ? doc.get('mods') : undefined,
      name: doc.get('name'),
      notes: doc.get('notes') ? doc.get('notes') : '',
      role: doc.get('baseStyle') ? doc.get('baseStyle') : doc.get('role') ? doc.get('role') : undefined,
      trees
    }
    member = await membersHelpers.getDisplayData(member, styleList);
    members[doc.id] = member
    if(doc.get('parent') === 'root' || mainTree[doc.get('parent')]) mainTreeParents[doc.id] = { parent: doc.get('parent'), shadow: mainTree[doc.get('alt')] ? [doc.get('alt')] : null, styles: [member.role, ...member.mods]}
    if(doc.get('parent') === 'No Parent' || noParents[doc.get('parent')]) noParentsParents[doc.id] = { parent: doc.get('parent') === 'No Parent' ? 'root' : doc.get('parent'), shadow: noParents[doc.get('alt')] ? [doc.get('alt')] : null, styles: [member.role, ...member.mods]}
    // add the member to the parent docs
    batch = await addToBatch(batch, movRef.collection('members').doc(doc.id), member)
    let memberList = {}
    for(let id in members) {
      memberList[id] = {id, name: members[id].name}
    }
    batch = await addToBatch(batch, movRef.collection('lists').doc('members'), memberList)
  }
  // create Role definitions
  const roleDefinitionsCol = movRef.collection("/user-role-definitions");
  batch = await addToBatch(batch, roleDefinitionsCol.doc("owner"), {
    id: 'owner',
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

  batch = await addToBatch(batch, roleDefinitionsCol.doc("superEditor"), {
    id: 'superEditor',
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

  batch = await addToBatch(batch, roleDefinitionsCol.doc("editor"), {
    id: 'editor',
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

  batch = await addToBatch(batch, roleDefinitionsCol.doc("viewer"), {
    id: 'viewer',
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

  batch = await addToBatch(batch, roleDefinitionsCol.doc("overseer"), {
    id: 'overseer',
    label: "Overseer",
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
  // copy user roles
  let rolesSnap = await movRef.collection('roles').get()
  for(let doc of rolesSnap.docs) {
    let user = {
          email: doc.get('email'),
          name: appUsers[doc.id] && appUsers[doc.id].name ? appUsers[doc.id].name : doc.get('name') ? doc.get('name') : null,
          role: doc.get('role'),
          photoURL: appUsers[doc.id] && appUsers[doc.id].photoURL ? appUsers[doc.id].photoURL : doc.get('photoURL') ? doc.get('photoURL') : null,
          uid: doc.id,
          roleSortCriteria: [],
          hide: doc.get('hide') ? doc.get('hide') : false
      }
      for (let criteria of doc.get('roleSortCriteria') ? doc.get('roleSortCriteria') : []) {
        user.roleSortCriteria.push(criteria.id ? criteria.id : criteria)
      }
      batch = await addToBatch(batch,movRef.collection('users').doc(doc.id), user)
  }

  // trees

  let mainTreeDoc = movRef.collection("trees").doc("main-tree");
  let statsRef = await movRef.collection("components").doc("stats").get()
  let statsDoc = statsRef.data()
  batch = await addToBatch(batch,mainTreeDoc, {
    id: "main-tree",
    label: "Main Tree"
  });
  //filter for only parents on the main tree 
  batch = await addToBatch(batch, movRef.collection('lists').doc('trees'), {"main-tree": {"id": "main-tree", "label": "Main Tree"}, "noParents": {"id": "noParents", "label": "No Parents"}})
  batch = await addToBatch(batch, mainTreeDoc.collection("components").doc("parents"), mainTreeParents);
  let mainTreeComp = await buildTree(groupMembersByParent(mainTreeParents), "root")
  batch = await addToBatch(batch, mainTreeDoc.collection("components").doc("tree"), {tree: mainTreeComp})
  let stats = {}
  for(let stat in statsDoc) {
    if(stat === 'noParentsTotal') { continue}
    if(stat === 'noParentTotal') { continue}
    if(stat === 'treeTotal') { 
      stats['treeTotal'] = {
        id: 'treeTotal',
        desc: "Number of members on the Tree",
        label: 'Total on Tree',
        total: statsDoc[stat].total ? statsDoc[stat].total : 0,
      }
      continue
    }
    stats[stat] = {
      id: stat,
      desc: statsDoc[stat].desc,
      label: statsDoc[stat].label,
      target: statsDoc[stat].target ? statsDoc[stat].target : 0,
      total: statsDoc[stat].total ? statsDoc[stat].total : 0,
      unit: statsDoc[stat].unit ? statsDoc[stat].unit : null,
      members: statsDoc[stat].members
    }
  }
  batch = await addToBatch(batch, mainTreeDoc.collection("components").doc("stats"), stats);

  let noParentTreeDoc = movRef.collection("trees").doc("noParents");
  batch = await addToBatch(batch, noParentTreeDoc, {
    id: "noParents",
    label: "No Parents"
  });
  batch = await addToBatch(batch, noParentTreeDoc.collection("components").doc("parents"), noParentsParents);
  let noParentsTreeComp = await buildTree(groupMembersByParent(noParentsParents), "root")
  batch = await addToBatch(batch, noParentTreeDoc.collection("components").doc("tree"), {tree: noParentsTreeComp})
  stats = {}
  for(let stat in statsDoc) {
    if(stat === 'treeTotal') { 
      continue
    }
    if(stat === 'noParentTotal' || stat === 'noParentsTotal') {
      stats['treeTotal'] = {
        id: 'treeTotal',
        desc: "Number of members on the Tree",
        label: 'Total on Tree',
        total: statsDoc[stat].total ? statsDoc[stat].total : 0,
      }
      continue
    }
    stats[stat] = {
      id: stat,
      desc: statsDoc[stat].desc,
      label: statsDoc[stat].label,
      target: statsDoc[stat].target ? statsDoc[stat].target : 0,
      total: statsDoc[stat].noParentTotal ? statsDoc[stat].noParentTotal : 0,
      unit: statsDoc[stat].unit ? statsDoc[stat].unit : null,
      members: statsDoc[stat].noParentMembers
    }
  }
  batch = await addToBatch(batch, noParentTreeDoc.collection("components").doc("stats"), stats);

  // TODO: snapshots
  let snapshots = await movRef.collection("snapshots").get();
  for (let snapInd in snapshots.docs) {
    let snap = snapshots.docs[snapInd]
    if(snap.id === 'now') {
      await snap.ref.delete()
      continue
    }
    let members = {}
    const mainTree = flattenJSON(snap.get('tree'))
    const noParents = flattenJSON(snap.get('noParents'))
    // update snapshot doc
    batch = await addToBatch(batch, snap.ref, {
      title: snap.get('title') ? snap.get('title') : 'Untitled Snapshot',
      color: snap.get('color') ? snap.get('color') : movDoc.get('style.color') ? movDoc.get('style.color') : 'white', 
      backgroundColor: snap.get('backgroundColor') ? snap.get('backgroundColor') : movDoc.get('style.backgroundColor'), 
      date: snap.get('date') ? snap.get('date') : new Date(), 
      createdBy: snap.get('createdBy') ? { 
        displayName: snap.get('createdBy.displayName'), 
        uid: snap.get('createdBy.uid'),
        email: snap.get('createdBy.email'),
        photoURL: snap.get('createdBy.photoURL')} : {
          displayName: "MT System",
          email: "movementtrackerapp@gmail.com",
          photoURL: "/app-logo-128x128.png",
          uid: "system"
    }})
    
    // if members doesn't exist, extract members from trees
    if(!snap.get('members')) {
      // members doesn't exist, need to extract from tree
      const getMembers = (members) => {
        if(!members) return []
        let children = [];
        const flattenMembers = members.map(m => {
          if (m.children && m.children.length) {
            children = [...children, ...m.children];
          }
          delete m.children
          return m;
        });

        return flattenMembers.concat(children.length ? getMembers(children) : children);
      };
      const arrayToObject = (array) =>
   array.reduce((obj, item) => {
     obj[item.id] = item
     return obj
   }, {})
      members = arrayToObject([...getMembers(snap.get('tree')), ...getMembers(snap.get('noParents'))])
    } else {
      members = snap.get('members')
    }

    // extract and combine the styles from the style stats
    let stats = [...snap.get('baseStyleStats') ? snap.get('baseStyleStats') : []].concat(snap.get('overrideStyleStats') ? snap.get('overrideStyleStats'): []).concat(snap.get('calcStats') ? snap.get('calcStats') : [])
    if (snap.get('baseStyles')){
      let baseStyles = snap.get('baseStyles')
      for(let ii in baseStyles) {
        let ind = stats.findIndex((el, ind) => { return el.id === baseStyles[ii].id})
        
        stats[ind] = {...baseStyles[ii], ...stats[ind]}
        delete stats[ind].name
        delete stats[ind].value
      }
    }
    if (snap.get('overrideStyles')){
      let overrideStyles = snap.get('overrideStyles')
      for(let ii in overrideStyles) {
        let ind = stats.findIndex((el, ind) => { return el.id === overrideStyles[ii].id})
        
        stats[ind] = {...overrideStyles[ii], ...stats[ind]}
        delete stats[ind].name
        delete stats[ind].value
      }
    }
    if (snap.get('calcStyles')){
      let calcStyles = snap.get('calcStyles')
      for(let ii in calcStyles) {
        let ind = stats.findIndex((el, ind) => { return el.id === calcStyles[ii].id})
        
        stats[ind] = {...calcStyles[ii], ...stats[ind]}
        delete stats[ind].name
        delete stats[ind].value
      }
    }

    let styles = {}

    // extract and combine the tree stats from the style stats
    let noParentStats = {}
    let mainTreeStats = {}

    for (let ii in stats) {
      let stat = stats[ii]
      if(!stat) continue
      let style = { label: stat.label, desc: stat.desc ? stat.desc : '', target: stat.target ?  stat.target : 0,}
      switch (stat.type) {
      case 'base':
        style.type = 'role'
        style.style = stat.style ? stat.style : {}
        break;
      case 'override':
        style.type = 'mod'
        style.icon = stat.icon ? stat.icon : null
        style.style = stat.style ? stat.style : {}
        break;
      case 'calc':
        style.type = 'complex'
        style.condition = stat.condition ? stat.condition : {}
        break;
      case 'calculated':
        style.type = 'calc'
        style.unit = stat.unit ? stat.unit : null
        style.condition = stat.condition ? stat.condition : {}
        break;
    }
      styles[stat.id] = style
      mainTreeStats[stat.id] = {id: stat.id, label: stat.label, type: stat.type, total: stat.total ? stat.total : 0, members: stat.members ? stat.members : {}, desc: stat.desc ? stat.desc : ''}
      noParentStats[stat.id] = {id: stat.id, label: stat.label, type: stat.type, total: stat.noParentTotal ? stat.noParentTotal : 0, members: stat.noParentMembers ? stat.noParentMembers : {}, desc: stat.desc ?stat.desc :''}
      // add styles
      batch = await addToBatch(batch, snap.ref.collection('styles').doc(stat.id), styles[stat.id])
    }

    // add trees
    batch = await addToBatch(batch, snap.ref.collection('trees').doc('main-tree'), {"id": "main-tree", "label": "Main Tree"})
    batch = await addToBatch(batch, snap.ref.collection('trees').doc('noParents'), {"id": "noParents", "label": "No Parents"})
      // add stats
      batch = await addToBatch(batch, snap.ref.collection('trees').doc('main-tree').collection('components').doc('stats'), {...mainTreeStats, treeTotal: {label: 'Total on Tree', desc: "Number of Members in this Tree", total: snap.get('totals.treeTotal.total') ? snap.get('totals.treeTotal.total') : 0}})
      batch = await addToBatch(batch, snap.ref.collection('trees').doc('noParents').collection('components').doc('stats'), {...noParentStats, treeTotal: {label: 'Total on Tree', desc: "Number of Members in this Tree", total: snap.get('totals.noParentTotal.total') ? snap.get('totals.noParentTotal.total') : 0}})
      // add parents
     let mainTreeParents = {}, noParentsParents = {}
      for(let ii in members) {
        let member = members[ii]
        // if((member.parent === 'root' || mainTree[member.parent]) && !(member.baseStyle ? member.baseStyle : member.role ? member.role : undefined)) console.log(MovementSnap.id, snap.id, member, snap.get('baseStyleStats')[0].id)
        if(member.parent === 'root' || mainTree[member.parent]) mainTreeParents[member.id] = { parent: member.parent, shadow: mainTree[member.alt] ? [member.alt] : null, styles: [member.baseStyle ? member.baseStyle : member.role ? member.role : snap.get('baseStyleStats')[0].id ? snap.get('baseStyleStats')[0].id : null, ...member.overrideStyles ? member.overrideStyles : member.mods ? member.mods : undefined,]}
        if(member.parent === 'No Parent' || noParents[member.parent]) noParentsParents[member.id] = { parent: member.parent === 'No Parent' ? 'root' : member.parent, shadow: noParents[member.alt] ? [member.alt] : null, styles: [member.baseStyle ? member.baseStyle : member.role ? member.role : snap.get('baseStyleStats')[0].id ? snap.get('baseStyleStats')[0].id : null, ...member.overrideStyles ? member.overrideStyles : member.mods ? member.mods : undefined,]}
      }
      batch = await addToBatch(batch, snap.ref.collection('trees').doc('main-tree').collection('components').doc('parents'), mainTreeParents)
      batch = await addToBatch(batch, snap.ref.collection('trees').doc('noParents').collection('components').doc('parents'), noParentsParents)

      // add tree
      let mainTreeComp = await buildTree(groupMembersByParent(mainTreeParents), "root")
      let noParentTreeComp = await buildTree(groupMembersByParent(noParentsParents), "root")
      batch = await addToBatch(batch, snap.ref.collection('trees').doc('main-tree').collection('components').doc('tree'), { tree: mainTreeComp})
      batch = await addToBatch(batch, snap.ref.collection('trees').doc('noParents').collection('components').doc('tree'), {tree: noParentTreeComp})

    // add members
    let membersList = {}
    for(let id in members) {
      if(Object.keys(members[id]).length <= 1) continue 
      if(JSON.stringify(members[id]) === '{}' || id === 'No Parent' || id === 'root') continue
      membersList[id] = {name: members[id].name, id}
      let trees = []
    
      // search the trees for the member Id
      if(mainTree[id]) trees.push("main-tree")
      if(noParents[id]) trees.push('noParents')
      
      let memberData = {
        id,
        name: members[id].name,
        customFields: {},
        role: members[id].baseStyle ? members[id].baseStyle : members[id].role ? members[id].role : '',
        mods: members[id].overrideStyles ? members[id].overrideStyles : [],
        notes: members[id].notes ? members[id].notes : '' ,
        trees
      }
      memberData = await membersHelpers.getDisplayData(memberData, styles);
      batch = await addToBatch(batch, snap.ref.collection('members').doc(id), memberData)
    }
    // add lists
      // add members
      batch = await addToBatch(batch, snap.ref.collection('lists').doc('members'), membersList)
      // add styles
      batch = await addToBatch(batch, snap.ref.collection('lists').doc('styles'), styles)
      // add trees
      batch = await addToBatch(batch, snap.ref.collection('lists').doc('trees'), {
        'main-tree': {
          id: 'main-tree',
          label: 'Main Tree'
        },
        noParents: {
          id: 'noParents',
          label: 'No Parents'
        }
      })
  }

  // Cleanup unused docs
  await _delete.deleteCollection(db, movRef.collection("components").path, 50)
  await _delete.deleteCollection(db, movRef.collection("roles").path, 50);
  
  // Commit the batch
  await batch.commit();
}
await _delete.deleteCollection(db, db.collection("users").path, 50);
}