/*
export function someAction (context) {
}
*/

import {
  getFirestore,
  doc,
  collection,
  getDocs,
  getDoc,
  updateDoc,
  onSnapshot,
  query,
  orderBy,
  startAt,
  endAt,
  Timestamp,
  where
} from '@firebase/firestore'
import { getAnalytics, logEvent } from '@firebase/analytics'
import { LocalStorage, Notify } from 'quasar'

export async function fetchMovement ({ commit, dispatch, state }, payload) {
  if (payload.movId === state.movement.id) {
    return
  }
  commit('cleanMovement', {})
  // console.log(payload.movId)
  var movementDoc = doc(getFirestore(), `/movements/${payload.movId}`)
  onSnapshot(movementDoc, movement => {
    if (movement.exists()){
      const movementData = movement.data()
    movementData.id = movement.id
    movementData.role = state.role
    commit('setMovement', movementData)
    }
  })

  commit('addListener', onSnapshot(
    doc(getFirestore(), `/movements/${payload.movId}/users/${payload.uid}`),
    role => {
      if (role.exists) {
        onSnapshot(doc(getFirestore(), `/movements/${payload.movId}/user-role-definitions/${role.get('role')}`),
        doc => {
          let rules = doc.get('rules')
          commit('setUserRole', {id: doc.id, label: doc.get('label')})
          commit('setPermissions', rules)
          // If the user is a owner or super editor get the other users
        // if (rules.access.view) {
        //   requestIdleCallback(() => {
        //     dispatch('fetchUsers', { movementDoc: movementDoc })
        //   })
        // }
        })

        if (role.get('roleSortCriteria')) {
          commit('setRoleSortCriteria', role.get('roleSortCriteria'))
        }

      } else {
        commit('setUserRole', '')
      }
    }
  ))
  commit(
    'setSize',
    LocalStorage.has('zoom')
      ? LocalStorage.getItem('zoom')
      : 100,
    { root: true }
  )
  dispatch('setReadyDelayed', true, { root: true })
}

export function fetchTrees ({ commit }, payload) {
    commit('addListener', onSnapshot(query(doc(getFirestore(), `/movements/${payload.movId}/lists/trees`)), doc => {
      let trees = doc.data()
      for (let ii in trees) {
      commit('setTree', {...trees[ii]})
      }
  }))
}

export function fetchMemberList ({ commit }, payload) {
  commit('addListener', onSnapshot(doc(getFirestore(), `/movements/${payload.movId}/lists/members`), async doc => {
    // console.log(doc.data())
      commit('setMemberList', { ...doc.data() })
  }))
}

export function fetchSnapshots ({ commit, state }, payload) {
  const d = new Date()
  const date = new Date(d.getFullYear(), d.getMonth(), d.getDate())
  // const toDate = payload.toDate ? new Date(payload.toDate) : new Date()
  // const fromDate = payload.fromDate
  //   ? new Date(payload.fromDate)
  //   : new Date(date.setFullYear(date.getFullYear() - 1))

  commit('addListener', onSnapshot(
    query(
      collection(
        getFirestore(),
        `/movements/${payload.id ? payload.id : state.movement.id}/snapshots`
      ),
      orderBy('date'),
      // startAt(Timestamp.fromDate(fromDate)),
      // endAt(Timestamp.fromDate(toDate))
    )
  , snap => {
    const snaps = {}
    commit('cleanSnapshots', {})
    snap.forEach(doc => {
      const data = doc.data()
      data.id = doc.id
      for (var ii in data.totals) {
        data.totals[ii] = { id: ii, ...data.totals[ii] }
      }
      commit('setSnapshot', data)
      snaps[data.id] = data
    })
  }))
}

export async function fetchSnapshotsByList ({ commit, state }, snapsToFetch) {
  // console.log("fetching the style lists");
commit('cleanSnapshots', {})
      let promises = [];
      for (let ii in snapsToFetch) {
        promises.push(
          getDoc(
            doc(
              getFirestore(),
              `/movements/${state.movement.id}/snapshots/${snapsToFetch[ii]}`
            )
          )
        );
      }

      let docs = await Promise.all(promises);
      // console.log(docs);
      for (let ii in docs) {
        if (docs[ii].exists) {
          commit('setSnapshot', { ...docs[ii].data(), id: docs[ii].id})
        }
      }
}

export function fetchSnapshot ({ commit }, payload) {
  commit('addListener', onSnapshot(
    doc(
      getFirestore(),
      `/movements/${
        payload.movId ? payload.movId : state.movement.id
      }/snapshots/${payload.snapId}`
    ),
    doc => {
      const data = doc.data()
      data.id = doc.id
      commit('setSnapshot', data)
    }
  ))
}

export async function fetchUsers ({ commit, state }, payload) {
  const movId = payload.movId ? payload.movId : state.movement.id 
  // console.log(movementDoc)
  commit('addListener', onSnapshot(collection(getFirestore(), `/movements/${movId}/users`), shareSnap => {
    const share = {}
    shareSnap.docChanges().map(change => {
      if (change.type !== 'removed') {
        var member = change.doc.data()
        member.id = change.doc.id
        share[member.id] = member
        commit('setUser', { id: member.id, data: member })
      } else {
        commit('removeUser', { id: change.doc.id })
      }
    })
  }))
  commit('addListener', onSnapshot(
    collection(getFirestore(), `/movements/${movId}/invites`),
    shareSnap => {
      const pendingShare = []
      for (var key in shareSnap.docs) {
        pendingShare.push(shareSnap.docs[key].data())
      }
      commit('setUserInvites', pendingShare)
    }
  ))
  commit('addListener', onSnapshot(
    collection(getFirestore(), `/movements/${movId}/requests`),
    requestSnap => {
      const pendingRequests = []
      for (var key in requestSnap.docs) {
        var requestData = requestSnap.docs[key].data()
        requestData.role = 'viewer'
        pendingRequests.push(requestData)
      }
      commit('setUserRequests', pendingRequests)
    }
  ))
}

export function fetchStyles ({ commit, state }, payload) {
  if (
    state.movement.id > '' ||
    (Object.keys(state.roles).length <= 0 &&
      Object.keys(state.mods).length <= 0)
  ) {
    commit('cleanStyles', {})

    commit('addListener', onSnapshot(
      doc(
        getFirestore(),
        `/movements/${payload.movId || state.movement.id}/lists/styles`
      ),
      doc => {
        let data = doc.data()
        
        for (var statId in data) {
          data[statId].id = statId
          commit('addStyle', data[statId])
        }
        commit('setStats', data)
      }
    ))
  }
}

export function updateMember ({ commit, state }, payload) {
  commit('updateStateMember', payload)
  // console.log(payload)
  return updateDoc(
    doc(
      getFirestore(),
      `/movements/${state.movement.id}/members/${payload.memberId}`
    ),
    payload.fields
  )
    .then(() => {
      Notify.create({
        color: 'positive',
        textColor: 'white',
        icon: 'cloud_download',
        message: 'Member Updated'
      })
      if (process.env.PROD) logEvent(getAnalytics(), 'member_updated')
      return true
    })
    .catch(err => {
      if (process.env.PROD) logEvent(getAnalytics(), 'exception', { description: err, fatal: false })
      console.error(new Error('Oops, something went wrong: ' + err))
      Notify.create({
        color: 'negative',
        textColor: 'white',
        icon: 'error',
        message: 'Oops, Something went wrong!'
      })
      return false
    })
}

export function fetchTreeData ({commit, state}, payload) {
  // if(!payload.movId || ! payload.treeId) return console.debug(payload)
  if (!payload.treeId) return
let ref = doc(getFirestore(), `/movements/${payload.movId}/trees/${payload.treeId}`)
  commit('addCurrentTreeListener', onSnapshot(
    doc(getFirestore(), `${ref.path}/components/tree`),
    async doc => {
      // console.log('tree', doc.data(), doc.exists())
      let tree = doc.get('tree')
      commit('setTree', { id: payload.treeId, tree: tree })
    }
  ))
  // console.log(payload)
  commit('addCurrentTreeListener', onSnapshot(
    query(collection(getFirestore(), `/movements/${payload.movId}/members`), where('trees', 'array-contains', payload.treeId)),
  
    async snap => {
      // console.log(snap)
      snap.forEach(doc => {
        const data = doc.data()
        commit('setMember', {...data, id: doc.id})
      })
      
    }
  ))
  commit('addCurrentTreeListener', onSnapshot(
    doc(getFirestore(), `/movements/${payload.movId}/trees/${payload.treeId}/components/stats`),
    async docSnap => {
        const data = docSnap.data()
        // console.log(data)
        commit('setStatImports', [payload.treeId, ...data && data.imports?data.imports:[]])
        if (data && data.imports) {
          for (let ind in data.imports) {
            commit('addCurrentTreeListener', onSnapshot(
              query(collection(getFirestore(), `/movements/${payload.movId}/members`), where('trees', 'array-contains', data.imports[ind])),
              async snap => {
                // console.log(snap)
                snap.forEach(doc => {
                  const data = doc.data()
                  commit('setMember', {...data, id: doc.id})
                })
                
              }
            ))
            commit('addCurrentTreeListener', onSnapshot(
              doc(getFirestore(), `/movements/${payload.movId}/trees/${data.imports[ind]}/components/stats`),
              async doc => {
                commit('setStatTotals', {treeId: data.imports[ind], data: {...doc.data(), id: doc.id}})
              }))
          }
        }
        commit('setStatTotals', {treeId: payload.treeId, data: {...data, id: docSnap.id}})
    }
  ))
}

export function fetchUserRoleDefinitions ({commit, state}, payload) {
  const movId = payload.movId ? payload.movId : state.movement.id 
   commit('addListener', onSnapshot(collection(getFirestore(), `/movements/${movId}/user-role-definitions`), snaps => {
        snaps.forEach(doc => {
          commit('setUserRoleDefinition', {id: doc.id, ...doc.data()})
        })
      }))
}

export function fetchMembers ({commit, state}, payload) {
  // console.log('fetchMembers', payload)
  commit('addListener', onSnapshot(
        collection(getFirestore(), `/movements/${payload.movId}/members`), snap => {
          snap.forEach(doc => {
            const data = doc.data()
            commit('setMember', {...data, id: doc.id})
          })
        }
      ))

      
}