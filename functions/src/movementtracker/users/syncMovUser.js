module.exports = ({ admin, environment }) => async (change, context) => {
  let db = admin.database();
  let movId = context.params.movId;
  let uid = context.params.uid;
  let after = change.after.exists ? change.after.data() : {};
  let userRef = db.ref(`movements/${movId}/users/${uid}`)
  if(change.after.exists) {
    return userRef.set({role: after.role})
  } else {
    return userRef.set(null)
  }
};