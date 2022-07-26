import { FirebaseError } from "firebase-admin";
import { Change, EventContext } from "firebase-functions/v1";
import {
  getFirestore,
  FieldValue,
  DocumentSnapshot,
  DocumentData,
} from "firebase-admin/firestore";
import {
  MembersByParent,
  MembersObj,
  MemberWithParentData,
  SubTreeParentData,
  TreeNode,
} from "../../models/members";

function isMember(
  member: MemberWithParentData | SubTreeParentData
): member is MemberWithParentData {
  return (member as MemberWithParentData).parent !== undefined;
}

module.exports =
  ({ environment }: { environment: any }) =>
  async (change: Change<DocumentSnapshot>, context: EventContext) => {
    const db = getFirestore();
    if (!change.after.exists) return;

    let beforeData = change.before.exists
      ? change.before.data() !== undefined
        ? (change.before.data() as DocumentData)
        : {}
      : {};
    let afterData = change.after.exists
      ? change.after.data() !== undefined
        ? (change.after.data() as DocumentData)
        : {}
      : {};
    const treeDocRef = db
      .collection(environment.schema.movements)
      .doc(
        context.params.movId ? context.params.movId : context.params.movementId
      )
      .collection("trees")
      .doc(context.params.treeId);
    let members = Object.keys({ ...beforeData, ...afterData });

    let treeDoc = await treeDocRef.get();
    //check if tree has been deleted
    if (!treeDoc.exists) return;
    // get update Id from treeDoc
    let updateId: string = treeDoc.get("updateId");
    //  compare subtree update Id to current tree updateId and return if same
    // loop through all members to check if they have changed
    for (let memberId of members) {
      if (!afterData[memberId]) {
        break;
      } else if (
        afterData[memberId].type === "subtree" &&
        beforeData[memberId] !== afterData[memberId]
      ) {
        //member is subtree and has changed
        if (updateId === afterData[memberId].updateId) {
          // update Id is same as subtree updateId
          return true;
        }
      }
    }

    const treeStructRef = treeDocRef.collection("components").doc("tree");
    const parentsDoc = change.after;

    const buildTree = async (
      members: MembersByParent,
      parentKey: string | undefined
    ) => {
      // Takes a list of members and a parentKey and returns a tree of children for that parent along with all subsequent grand children
      let children: TreeNode[] = [],
        ii: string;
      if (parentKey && members[parentKey]) {
        // Loop through each of the children for the current parent
        for (ii in members[parentKey]) {
          // console.log(members[parentKey][ii].type);
          if (members[parentKey][ii].type !== "subtree") {
            // Construct the next child to be added to the tree
            const data = {
              id: members[parentKey][ii].id,
              children:
                members[parentKey][ii].type !== "shadow" &&
                members[parentKey][ii] &&
                members[parentKey][ii].id
                  ? await buildTree(members, members[parentKey][ii].id)
                  : [],
              type: members[parentKey][ii].type,
              parent: members[parentKey][ii].parent,
              key: parentKey + "-" + members[parentKey][ii].id,
            };
            // console.log(data);

            // Add the new child to the tree
            children.push(data);
          } else {
            // import the tree doc and add it to the children
            if (members[parentKey][ii].id) {
              let doc = await db
                .collection(environment.schema.movements)
                .doc(
                  context.params.movId
                    ? context.params.movId
                    : context.params.movementId
                )
                .collection("trees")
                .doc(members[parentKey][ii].id!)
                .collection("components")
                .doc("tree")
                .get()
                .catch((err: FirebaseError) => console.error(err));
              if (!doc) {
                // tree no longer exists. Remove Tree from imports
                change.after.ref.update({
                  [members[parentKey][ii].id!]: FieldValue.delete(),
                });
                continue;
              }
              let subTree = doc.data()!.tree;

              let markAsSubTree = (el: any) => {
                el.subTree = members[parentKey][ii].id;
                el.key =
                  members[parentKey][ii].id + "-" + parentKey + "-" + el.id;
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
      }
      return children;
    };

    const groupMembersByParent = (members: MembersObj) => {
      // takes an array of members and returns them grouped by their parent key
      const membersByParent: MembersByParent = {};
      for (const ii in members) {
        let member = members[ii];
        if (isMember(member) && member.parent) {
          if (!membersByParent[member.parent]) {
            membersByParent[member.parent] = [];
          }
          membersByParent[member.parent].push({
            parent: member.parent,
            id: ii,
            type: "normal",
          });
        }
        if (isMember(member) && member.shadow) {
          for (const jj in member.shadow) {
            if (!membersByParent[member.shadow[jj]]) {
              membersByParent[member.shadow[jj]] = [];
            }
            membersByParent[member.shadow[jj]].push({
              parent: member.shadow[jj],
              id: ii,
              type: "shadow",
            });
          }
        }

        if (!isMember(member) && member.subTreeParent) {
          if (!membersByParent[member.subTreeParent]) {
            membersByParent[member.subTreeParent] = [];
          }
          membersByParent[member.subTreeParent].push({
            parent: member.subTreeParent,
            id: ii,
            type: "subtree",
          });
        }
      }
      return membersByParent;
    };
    //check the change doesn't cause a loop
    if (change.after.exists) {
      for (let memberKey of members) {
        if (
          afterData[memberKey] &&
          beforeData[memberKey] &&
          beforeData[memberKey].parent !== afterData[memberKey].parent
        ) {
          console.log(memberKey, "changed");
          let parent = memberKey;
          while (true) {
            if (parent == "root") break;
            else if (afterData[parent].parent === memberKey) {
              console.log("loop found");
              return parentsDoc.ref.update({
                [`${memberKey}.parent`]: beforeData[memberKey].parent
                  ? beforeData[memberKey].parent
                  : null,
              });
            }

            parent = afterData[parent].parent;
          }
        }
      }
    }

    // Filter for only members with a parent that exists in the tree, delete others
    // fix for #24
    //loop through members
    let treeMembers: MembersObj =
      parentsDoc.data() !== undefined
        ? (parentsDoc.data() as DocumentData)
        : {};
    let membersToDelete: { [index: string]: FieldValue } = {};
    for (let memberId in treeMembers) {
      const member = treeMembers[memberId];
      let currentMember = treeMembers[memberId];
      if (isMember(member)) {
        // find the members that don't reach root
        while (true) {
          let parentId = isMember(currentMember)
            ? currentMember.parent
            : undefined;
          // if the current member has no parent field then delete them from the tree
          if (parentId == undefined) {
            membersToDelete[memberId] = FieldValue.delete();
            break;
          }
          // if the current member is a root member then check next member
          if (parentId === "root") break;
          // if the current member has a parent that isn't in the tree delete them from the tree
          currentMember = treeMembers[parentId];
          if (!currentMember) {
            membersToDelete[memberId] = FieldValue.delete();
            break;
          }
        }
      }
    }
    // save the changes
    if (Object.keys(membersToDelete).length > 0) {
      db.collection(environment.schema.movements)
        .doc(
          context.params.movId
            ? context.params.movId
            : context.params.movementId
        )
        .collection("trees")
        .doc(context.params.treeId)
        .collection("components")
        .doc("parents")
        .update(membersToDelete);
      // update the member doc trees field
      for (let id in membersToDelete) {
        // membersToDelete[id]
        let memberUpdateVal: { [index: string]: FieldValue } = {
          trees: FieldValue.arrayRemove(context.params.treeId),
        };
        db.collection(environment.schema.movements)
          .doc(
            context.params.movId
              ? context.params.movId
              : context.params.movementId
          )
          .collection("members")
          .doc(id)
          .update(memberUpdateVal);
      }
    }
    // update the tree
    await treeStructRef.set({
      tree: await buildTree(
        groupMembersByParent(
          parentsDoc.data() !== undefined
            ? (parentsDoc.data() as DocumentData)
            : {}
        ),
        "root"
      ),
    });

    // update the tree doc with a new updateId
    let newUpdateId = Date.now();
    treeDocRef.update({ updateId: newUpdateId });

    // trigger update of other trees.
    let trees = treeDoc.get("importedBy") ? treeDoc.get("importedBy") : [];
    let promises = [];
    for (let tree of trees) {
      // get doc of tree to update
      // add an update number to the subtree on the tree parents doc
      promises.push(
        db
          .collection(environment.schema.movements)
          .doc(
            context.params.movId
              ? context.params.movId
              : context.params.movementId
          )
          .collection("trees")
          .doc(tree)
          .collection("components")
          .doc("parents")
          .update({ [context.params.treeId.updateId]: newUpdateId })
      );
    }
    return Promise.all(promises);
  };
