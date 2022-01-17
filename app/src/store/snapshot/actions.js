/*
export function someAction (context) {
}
*/

import {
  getFirestore,
  doc,
  collection,
  getDocs,
  updateDoc,
  onSnapshot,
  query,
  orderBy,
  startAt,
  endAt,
  Timestamp,
  where
} from '@firebase/firestore'

export function fetchSnapshot ({ commit, rootState }, payload) {
  onSnapshot(
    doc(
      getFirestore(),
      `/movements/${
        payload.movId ? payload.movId : rootState.movement.movement.id
      }/snapshots/${payload.snapId}`
    ),
    doc => {
      console.log('snapshot', doc)
      const data = doc.data() ? doc.data() : {}
      console.log(data)
      data.id = doc.id
      commit('setSnapshot', data)
    }
  )
}

export function fetchTrees ({ commit }, payload) {
    onSnapshot(query(collection(getFirestore(), `/movements/${payload.movId}/snapshots/${payload.snapId}/trees`)), async snap => {
    // console.log(snap)
    snap.forEach(doc => {
      // console.log(doc)
      commit('setTree', {...doc.data(), id: doc.id})
    })
  })
}

export function fetchMemberList ({ commit }, payload) {
  onSnapshot(doc(getFirestore(), `/movements/${payload.movId}/snapshots/${payload.snapId}/lists/members`), async doc => {
    // console.log(doc.data())
      commit('setMemberList', { ...doc.data() })
  })
}

export function fetchStyles ({ commit, state, rootState }, payload) {
  if (
    rootState.movement.movement.id > '' ||
    (Object.keys(state.roles).length <= 0 &&
      Object.keys(state.mods).length <= 0)
  ) {
    commit('cleanStyles', {})

    // console.log(this.$router.currentRoute, `/movements/${id || this.$router.currentRoute.params.movId}/snapshots/${this.$router.currentRoute.params.snapId}/lists/styles`)
    onSnapshot(
      doc(
        getFirestore(),
        `/movements/${payload.movId}/snapshots/${payload.snapId}/lists/styles`
      ),
      doc => {
        let data = doc.data()
        commit('setStats', data)
        for (var statId in data) {
          data[statId].id = statId
          commit('addStyle', data[statId])
        }
      }
    )
  }
}

export function fetchTreeData ({commit, state}, payload) {
  if (!payload.treeId) return
  console.log(`/movements/${payload.movId}/snapshots/${payload.snapId}`, payload)
let ref = doc(getFirestore(), `/movements/${payload.movId}/snapshots/${payload.snapId}`)
  onSnapshot(
    doc(getFirestore(), `${ref.path}/trees/${payload.treeId}/components/tree`),
    async doc => {
      let tree = doc.get('tree')
      commit('setTree', { id: payload.treeId, tree: tree })
    }
  )
  onSnapshot(
    query(collection(getFirestore(), `${ref.path}/members`), where('trees', 'array-contains', payload.treeId)),
    async snap => {
      // console.log(snap)
      snap.forEach(doc => {
        const data = doc.data()
        commit('setMember', {...data, id: doc.id})
      })
      
    }
  )
  onSnapshot(
    doc(getFirestore(), `${ref.path}/trees/${payload.treeId}/components/stats`),
    async docSnap => {
        const data = docSnap.data()
        commit('setStatImports', [payload.treeId, ...data && data.imports?data.imports:[]])
        if (data && data.imports) {
          for (let ind in data.imports) {
            onSnapshot(
              query(collection(getFirestore(), `${ref.path}/members`), where('trees', 'array-contains', data.imports[ind])),
              async snap => {
                // console.log(snap)
                snap.forEach(doc => {
                  const data = doc.data()
                  commit('setMember', {...data, id: doc.id})
                })
                
              }
            )
            onSnapshot(
              doc(getFirestore(), `${ref.path}/trees/${data.imports[ind]}/components/stats`),
              async doc => {
                commit('setStatTotals', {treeId: data.imports[ind], data: {...doc.data(), id: doc.id}})
              })
          }
        }
        commit('setStatTotals', {treeId: payload.treeId, data: {...data, id: docSnap.id}})
    }
  )
}

export function fetchMembers ({commit, state}, payload) {
  console.log('fetchMembers', payload)
  onSnapshot(
        collection(getFirestore(), `/movements/${payload.movId}/snapshots/${payload.snapId}/members`), snap => {
          snap.forEach(doc => {
            const data = doc.data()
            console.log('member', data)
            commit('setMember', {...data, id: doc.id})
          })
        }
      );

      
}