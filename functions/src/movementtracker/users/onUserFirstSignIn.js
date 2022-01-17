module.exports = ({ admin, environment }) => async user => {
  var db = admin.firestore()
  // console.log("signing user in")
  // console.log(user.uid)
  // console.log(user.displayName)
  // console.log(user.email)

  var userSanitized = {}
  userSanitized.name = user.displayName
  userSanitized.email = user.email
  userSanitized.photoURL = user.photoURL
  userSanitized.uid = user.uid
  // userSanitized.movements = []
  // userSanitized.photo = validator.blacklist(data.user.photoUrl, `()+"<>{}[]`+'`')
  const batch = db.batch()
  var docRef = db.collection('/app-users').doc(user.uid)
  docRef.set(userSanitized)
  db.collectionGroup('invites')
    .where('email', '==', userSanitized.email)
    .get()
    .then(invitesSnap => {
      invitesSnap.forEach(inviteSnap => {
        // console.log(inviteSnap.data())
        // add the user to the projects they have been invited too
        batch.set(
          inviteSnap.ref.parent.parent.collection('/app-users').doc(`/${user.uid}`),
          {
            uid: user.uid,
            email: userSanitized.email,
            name: userSanitized.name,
            role: inviteSnap.data().role,
            photoURL: userSanitized.photoURL
          }
        )
        // delete the old invites
        batch.delete(inviteSnap.ref)
      })
      // commit the batch and exit
      return batch
        .commit()
        .then(res => {
          return true
        })
        .catch(err => {
          console.log(err)
        })
    })
  // return db.runTransaction(async transaction => {
  const doc = docRef.get()
  if (!doc.exists) {
    // first time user login
    // console.log('Registering User')
    // admin.analytics().logEvent('sign_up', { method: 'New User' })
    // console.log('Success')
    // res.success = true
    const notifications = await db
      .collection(`/users-pending/${user.email}/notifications`)
      .get()
    // console.log(1)
    notifications.forEach(async snap => {
      // console.log(2)
      // let snap = await transaction.get(notificationRef)
      // console.log(snap)
      if (snap) {
        docRef.set(userSanitized)
        for (var key in snap.docs) {
          // console.log(snap)
          var snapData = snap.docs[key].data()
          // console.log(snapData)
          if (snapData !== 'invite') {
            db.collection(`/app-users/${user.uid}/notifications`)
              .doc()
              .set(snapData)
          }
          db.collection(`/users-pending/${user.email}/notifications`).delete()
        }
      }
    })
  } else {
    console.log('User already exists')
    return false
  }
  // })
  // .then(() => {
  //   return console.log('Transaction successfully committed!')
  // }).catch((error) => {
  //   console.log(new Error('Transaction failed: ', error))
  // })
}
