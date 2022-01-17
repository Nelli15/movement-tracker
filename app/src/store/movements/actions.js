import {
  onSnapshot,
  query,
  collectionGroup,
  where,
  getFirestore,
  getDoc,
  doc
} from '@firebase/firestore'

/*
export function someAction (context) {
}
*/

export function fetchMovements ({ dispatch, commit }, payload) {
  // Fetch all of the documents from firebase where the user has a role in the movement
  // console.log('fetch')
  // worker.postMessage({ func: 'fetchMovements', uid: payload.uid, firebase: $firestore })
  // myWorker.postMessage('generateItems')
  // console.log(expensive(1000))
  // instance.expensive(1000).then(count => {
  //   console.log(`Ran ${count} loops`)
  // })
  // console.log('generating Items')

  onSnapshot(
    query(
      collectionGroup(getFirestore(), 'users'),
      where('uid', '==', payload.uid)
    ),
    async movementsSnap => {
      // console.log(movementsSnap)
      await movementsSnap.docChanges().map(userDoc => {
        // console.log(userDoc)
        if (userDoc.type === 'added') {
          userDoc = userDoc.doc
          onSnapshot(userDoc.ref.parent.parent, async movementDoc => {
            // console.log(movementDoc)
            if (
              movementDoc.data() &&
                userDoc.get('role')
            ) {
             let permissions = await getDoc(doc(getFirestore(), `/movements/${movementDoc.id}/user-role-definitions/${userDoc.get('role')}`))
              const data = movementDoc.data()
              data.id = movementDoc.id
              data.permissions = permissions.data() ? permissions.data().rules : {}
              data.role = userDoc.get('role') ? userDoc.get('role') : ''
              data.hide = userDoc.get('hide') ? userDoc.get('hide') : false
              data.last_modified = movementDoc.get('last_modified')
                ? movementDoc.get('last_modified')
                : 'Error: No Date Available'
              commit('addMovement', data)
            }
          })
        } else if (userDoc.type === 'removed') {
          // console.log(userDoc.doc.ref.parent.parent)
          // userDoc.ref.parent.parent.get(movementDoc => {
          commit('removeMovement', userDoc.doc.ref.parent.parent.id)
          // })
        }
      })
      dispatch('setReadyDelayed', true, { root: true })
    }
  )
}
