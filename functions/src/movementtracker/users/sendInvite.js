module.exports = ({ admin, environment }) => async (inviteSnap, context) => {
  var db = admin.firestore()
  var inviteData = inviteSnap.data()
  // check if the user being invited exists
  return db
    .collection('/app-users')
    .where('email', '==', inviteData.email.toLowerCase())
    .get()
    .then(snap => {
      if (!snap.empty) {
        // user exists
        // get the user's uid
        for (var key in snap.docs) {
          const uid = snap.docs[key].id
          // add the user to the movement and delete the invite
          var batch = db.batch()
          const userData = snap.docs[key].data()
          batch.set(db.doc(`/movements/${context.params.movId}/users/${uid}`), {
            uid,
            name: userData.name,
            email: userData.email,
            photoURL: userData.photoURL,
            role: inviteData.role
          })
          batch.delete(inviteSnap.ref)
          return batch
            .commit()
            .then(res => {
              return true
            })
            .catch(err => {
              console.log(err)
            })
        }
      } else {
        // the user doesn't exist
        // check the email is in lower case
        if (inviteData.email !== inviteData.email.toLowerCase()) {
          // console.log('emails are different')
          // the email wasn't valid, lets convert it to lower case and retry
          inviteData.email = inviteData.email.toLowerCase()
          var newInvite = db.doc(
            `/movements/${
              context.params.movId
            }/invites/${context.params.email.toLowerCase()}`
          )

          const batch = db.batch()
          batch.delete(snap.ref)

          batch.set(newInvite, inviteData)

          return batch
            .commit()
            .then(res => {
              return true
            })
            .catch(err => {
              console.error(new Error('Oops, something went wrong: ' + err))
            })
        } else {
          // user email was valid send the invite
          return db
            .collection('mail')
            .doc()
            .set({
              to: inviteData.email,
              template: {
                name: 'invite',
                data: inviteData
              }
            })
            .then(res => {
              return db
                .doc(
                  `/movements/${
                    context.params.movId
                  }/invites/${context.params.email.toLowerCase()}`
                )
                .update({ sent: true })
                .catch(err =>
                  console.error('Failed to update sent field in invite', err)
                )
            })
            .catch(err => console.error('Failed to send invite to user', err))
        }
      }
      return true
    })
    .catch(err => {
      console.error(err)
    })

  // getting dest email by query string
  // console.log(context)
  // console.log(snap.data())
  // console.log(snapData.email)
  // console.log(snapData.email.toLowerCase())

  // if (!snapData.sent) {
  //   // snapData.sent = true
  //   // const mailOptions = {
  //   //        from: 'Movement Tracker <ellis.nick96@gmail.com>', // Something like: Jane Doe <janedoe@gmail.com>
  //   //        to: snapData.email,
  //   //        subject: `Invitation to edit ${movement}`, // email subject
  //   //        html: `Hey ${snapData.name}, <br><br>You have been invited to edit the Movement ${movement} at MovementTracker.app!<br> Login to view your invitation.` // email content in HTML
  //   //    }
  //   // const movement = snapData.movementName
  //   // const email = snapData.email // The email of the user.
  //   // const displayName = snapData.name // The display name of the user.
  //   // const from = snapData.fromName
  //   // const role = snapData.role
  //   // [END eventAttributes]

  //   // sendInviteEmail(email, displayName, movement, from, role)
  // }
  // const userSnap = await db.collection('/users').where('email', '==', snapData.email.toLowerCase()).get().catch(err => { console.error(new Error('Oops, something went wrong: ' + err)) })
  // const batch = db.batch()
  // console.log(snap)
  // const notification = snapData
  // notification.header = 'New Invitation'
  // notification.body = `${notification.fromName} invited you to be a ${notification.role} of ${notification.movementName}`
  // notification.icon = 'mdi-file-tree'
  // notification.actions = {
  //   accept: true,
  //   reject: true
  // }
  // notification.type = 'invite'
  // notification.timestamp = admin.firestore.Timestamp.now()
  // batch.set(db.collection('mail').doc(), {
  //   to: notification.email,
  //   template: {
  //     name: 'invite',
  //     data: notification
  //   }
  // })
  // if (userSnap.empty) {
  //   batch.set(db.collection(`/users-pending/${snapData.email.toLowerCase()}/notifications`).doc(), notification)
  // } else {
  //   for (var key in userSnap.docs) {
  //   // console.log(snap.docs[key])
  //     batch.set(userSnap.docs[key].ref.collection('/notifications').doc(), notification)
  //   }
  // }
  // return batch.commit().then(res => {
  //   return true
  // }).catch(err => { console.error(new Error('Oops, something went wrong: ' + err)) })
}
