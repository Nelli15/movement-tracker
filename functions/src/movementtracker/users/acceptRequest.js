module.exports = ({ admin, environment }) => async (data, context) => {
  var db = admin.firestore();
  var request = data.request;
  var movId = data.movId;

  var requestRef = db.doc(`/movements/${movId}/requests/${request.uid}`);
  return db.runTransaction(transaction => {
    // This code may get re-run multiple times if there are conflicts.
    return transaction
      .get(requestRef)
      .then(requestDoc => {
        if (!requestDoc.exists) {
          throw new Error("Document does not exist!");
        }

        var role = requestDoc.data();
        role.role = request.role.id;
        var roleRef = db.doc(`/movements/${movId}/users/${request.uid}`);
        transaction.set(roleRef, role);
        transaction.delete(requestRef);
        return true;
      })
      .then(() => {
        console.log(`Transaction successfully committed!`);
        return true;
      })
      .catch(err => {
        console.log("Transaction failed: ", err);
        throw new Error(err);
      });
  });
};
