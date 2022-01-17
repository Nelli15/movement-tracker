module.exports = ({ admin, environment }) => async (change, context) => {
  var db = admin.firestore()
  // console.log(context)

  var beforeData = change.before.data()
  var afterData = change.after.data()

  if (
    beforeData.name !== afterData.name ||
    beforeData.email !== afterData.email ||
    beforeData.photoURL !== afterData.photoURL
  ) {
    const querySnap = await db
      .collectionGroup('users')
      .where('uid', '==', context.params.uid)
      .get()
    for (var docId in querySnap.docs) {
      const doc = querySnap.docs[docId]
      // console.log(doc, docId)
      doc.ref.update({
        name: afterData.name ? afterData.name : beforeData.name,
        email: afterData.email ? afterData.email : beforeData.email,
        photoURL: afterData.photoURL ? afterData.photoURL : beforeData.photoURL
      })
    }
  }
  return true
}
