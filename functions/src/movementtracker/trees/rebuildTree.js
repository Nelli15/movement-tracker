const membersHelpers = require("../../scripts/membersHelpers.js");

module.exports = ({ admin, environment }) => async (change, context) => {
  const db = admin.firestore();
  if (!change.after.exists) return;

  let beforeData = change.before.exists ? change.before.data(): {}
  let afterData = change.after.data()
  let members = Object.keys({...beforeData, ...afterData})
  let treeDoc = await treeDocRef.get()
  // TODO: get update Id from treeDoc
  
  let updateId = treeDoc.get('updateId')
  // TODO: compare subtree update Id to current tree updateId and return if same
  const treeDocRef = db
    .collection(environment.schema.movements)
    .doc(
      context.params.movId ? context.params.movId : context.params.movementId
    )
    .collection("trees")
    .doc(context.params.treeId);
  const treeStructRef = treeDocRef.collection("components").doc("tree");
  const parentsDoc = change.after;

  const buildTree = async (members, parentKey) => {
    // Takes a list of members and a parentKey and returns a tree of children for that parent along with all subsequent grand children
    let children = [],
      ii;
    if (members[parentKey]) {
      // Loop through each of the children for the current parent
      for (ii in members[parentKey]) {
        // console.log(members[parentKey][ii].type);
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
          // console.log(data);

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
          // console.log(subTree);
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
  //check the change doesn't cause a loop
  if(change.after.exists) {
  for(let memberKey of members) {
    if((afterData[memberKey] && beforeData[memberKey] && beforeData[memberKey].parent !== afterData[memberKey].parent)) {
      console.log(memberKey, 'changed')
      let parent = memberKey
      while(true) {
        if (parent == 'root') break
        else if(afterData[parent].parent === memberKey) {
          console.log('loop found')
          return parentsDoc.ref.update({ [`${memberKey}.parent`]: (beforeData[memberKey].parent ? beforeData[memberKey].parent : null) })
        } 

        parent = afterData[parent].parent
      }
    }
  }
}

  await treeStructRef.set({
    tree: await buildTree(groupMembersByParent(parentsDoc.data()), "root")
  });
  // update the tree 
  
  // trigger update of other trees.
  let trees = treeDoc.get('trees')
  for (let tree in trees) {
    // get doc of tree to update
    // add an update number to the subtree on the tree parents doc
  }
};
