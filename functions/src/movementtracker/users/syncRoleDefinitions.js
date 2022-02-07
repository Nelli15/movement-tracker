import { getDatabase } from "firebase-admin/database";

module.exports = ({ environment }) => async (change, context) => {
  let db = getDatabase();
  let movId = context.params.movId;
  let roleId = context.params.roleId;
  let after = change.after.exists ? change.after.data() : {};
  let roleRef = db.ref(`movements/${movId}/user-role-definitions/${roleId}`)
  if(change.after.exists) {
    return roleRef.set(after)
  } else {
    return roleRef.set(null)
  }
};
