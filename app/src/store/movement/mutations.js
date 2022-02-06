/*
export function someMutation (state) {
}
*/

import {
  getFirestore,
  serverTimestamp,
  setDoc,
  doc,
  deleteDoc,
  updateDoc,
  collection,
  addDoc
} from "@firebase/firestore";

export function cleanMovement (state, payload) {
  state.movement = { id: '', role: { id: '', label: ''}}
  state.members = {}
  state.parents = {}
  state.shares = {}
  state.requests = {}
  state.invites = {}
  state.stats = {}
  state.snapshots = {}
  state.trends = {}
  state.roleSortCriteria = []
  state.trees = {}
  state.statTotals = {}
  state.statImports = []
}
export function cleanStyles (state, payload) {
  state.roles = {}
  state.mods = {}
  state.complexStats = {}
  state.calcStats = {}
}
export function cleanSnapshots (state, payload) {
  state.snapshots = {}
}
export function toggleFilterVisible (state, payload) {
  state.filterVisible = !state.filterVisible
}
export function setFilterQuery (state, payload) {
  state.filterQuery = payload
}
export function setMovement (state, payload) {
  state.movement = payload
}
export function setUserRole (state, payload) {
  state.movement.role = payload
}

export function setPermissions (state, payload) {
  console.log('permissions', payload)
  state.permissions = typeof payload === "object" ? payload : {}
}

export function addStyle (state, payload) {
  // console.log(payload)
  function toObject (arr) {
    var rv = {}
    for (var i = 0; i < arr.length; ++i) rv[arr[i]] = true
    return rv
  }
  if (Array.isArray(payload.members)) {
    payload.members = toObject(payload.members)
  }
  if (payload.type === 'role') {
    state.roles[payload.id] = payload
    if (!state.roleSortCriteria.find(x => x.id === payload.id)) {
      state.roleSortCriteria.push(payload)
    }
  } else if (payload.type === 'mod') {
    state.mods[payload.id] = payload
  } else if (payload.type === 'complex') {
    if (typeof payload.condition !== 'object' || payload.condition === null) {
      payload.condition = {
        class: 'expression',
        elements: [
          {
            class: 'condition',
            included: true,
            id: '',
            gen: 'member'
          },
          {
            class: 'condition',
            included: true,
            id: '',
            gen: 'member'
          }
        ],
        operator: 'OR'
      }
    }
    state.complexStats[payload.id] = payload
  } else if (payload.type === 'calc') {
    if (typeof payload.condition !== 'object' || payload.condition === null) {
      payload.condition = {
        class: 'expression',
        elements: [
          {
            class: 'condition',
            id: ''
          },
          {
            class: 'condition',
            id: ''
          }
        ],
        operator: 'plus'
      }
    }
    state.calcStats[payload.id] = payload
  }
}
export function removeStyle (state, id) {
  if (state.roles[id]) {
    delete state.roles[id]
  }
  if (state.mods[id]) {
    delete state.mods[id]
  }
  if (state.stats[id]) {
    delete state.stats[id]
  }
  if (state.complexStats[id]) {
    delete state.complexStats[id]
  }
  if (state.calcStats[id]) {
    delete state.calcStats[id]
  }
}

export function updateStateMember (state, payload) {
  
    state.members[payload.memberId][payload.key] = payload.localValue ? payload.localValue : payload.value
}

export function setUserRoleDefinition (state, payload) {
  state.userRoleDefinitions[payload.id] = payload
}

export function setUserInvites (state, payload) {
  state.userInvites = payload
}
export function setUserRequests (state, payload) {
  state.userRequests = payload
}
export function setUser (state, payload) {
  state.users[payload.id] = payload.data
}
export function removeUser (state, payload) {
  delete state.users[payload.id]
}
export function setStats (state, payload) {
  const stats = JSON.parse(JSON.stringify(payload ? payload: {}))
  state.stats = stats
}

export function setStatTotals (state, payload) {
  state.statTotals[payload.treeId] = payload.data
}

export function setStatImports (state, payload) {
  state.statImports = payload
}

export function setSnapshot (state, payload) {
  state.snapshots[payload.id] = payload
}

export function setMovementSnap (state, payload) {
  state.tree = payload.tree
  state.stats = payload.stats
  state.members = payload.members
}

// Depreciated?
export function setMemberList (state, payload) {
  state.memberList = payload
}

export function setMember (state, payload) {
  state.members[payload.id] = payload
}

export function moveLocalMember ({ commit }, payload) {
  move(payload.memberId, payload.oldParentId, payload.value, state)
}

export function addRoleSortCriteria (state, payload) {
  state.roleSortCriteria.push(payload)
}

export function setRoleSortCriteria (state, payload) {
  state.roleSortCriteria = payload
}
export function setCurrentTree (state, payload) {
  state.currentTree = payload
}
export function setSortKey(state,payload) {
  state.sortKey = payload
}

export function setTree (state, payload) {
  if(!payload.id) { console.error('Missing tree id'); return false}
  let tree = {
    id: payload.id,
    label: payload.label ? payload.label : state.trees[payload.id] ? state.trees[payload.id].label : '',
    tree: payload.tree ? payload.tree : state.trees[payload.id] ? state.trees[payload.id].tree : ''
  }
  state.trees[payload.id] = tree
}

export function removeTree (state, id) {
  if(!id) { console.error('Missing tree id'); return false}
  delete state.trees[id]
}

export async function updateRoleDefinitionRule (state, payload) {

  state.userRoleDefinitions[payload.userRole].rules[payload.ruleKey] = payload.value
  let key = 'rules.'.concat(payload.ruleKey)
  // return firebase.firestore().doc(`/movements/${state.movement.id}/user-role-definitions/${payload.userRole}`).update({ ['rules.access.view']: payload.value }).catch(err => console.error(err))
  // use this once the bug with updating nested fields is fixed
  return await updateDoc(
          doc(
            getFirestore(),
            `/movements/${state.movement.id}/user-role-definitions/${payload.userRole}`
          ),
          { [key]: payload.value }
        ).catch(err => console.error(err)); 
}