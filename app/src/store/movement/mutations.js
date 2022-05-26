/*
export function someMutation (state) {
}
*/

import {
  getFirestore,
  doc,
  updateDoc,
} from "@firebase/firestore";
import { startAfter } from "firebase/firestore";

export function cleanMovement (state, payload) {
  state.movement = { id: '', role: { id: '', label: ''}}
  state.members = {}
  state.memberList = {}
  state.parents = {}
  state.users = {}
  state.userRequests = {}
  state.userInvites = {}
  state.userRoleDefinitions = {}
  state.roles = {}
  state.mods = {}
  state.complexStats = {}
  state.calcStats = {}
  state.stats = {}
  state.statTotals = {}
  state.statImports = []
  state.snapshots = {}
  state.trees = {}
  state.currentTree = {}
  state.roleSortCriteria = []
  state.filterVisible = false
  state.filterQuery = ''
  state.sortKey = ''
  state.permissions = {}

  //Clean up listeners
  if(state.listeners.length > 0) {
  for(let listener of state.listeners) {
    listener()
  }
  state.listeners = []
}
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

export function addListener (state, listener) {
  state.listeners.push(listener)
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
  // state.permissions.access_view = access_view || access_users_create || access_users_edit || access_userRoles_delete || access_userRoles_invite || access_userRoles_revoke    
  // state.permissions.members_view = members_view || members_create || members_edit || members_delete || members_export 
  // state.permissions.settings_view = settings_view || settings_roles_view || settings_roles_create || settings_roles_edit || settings_roles_delete
  //  || settings_mods_view || settings_mods_create || settings_mods_edit || settings_mods_delete
  //   || settings_calc_view || settings_calc_create || settings_calc_edit || settings_calc_delete
  //    || settings_complex_view || settings_complex_create || settings_complex_edit || settings_complex_delete 
  //    state.permissions.snapshots_view = snapshots_view || snapshots_update
  //    state.permissions.trees_view = trees_view || trees_create || trees_delete|| trees_export || subTrees_add || subTrees_remove
  //    state.permissions.trends_view = trends_view || trends_movementGraphs_view || trends_movementGraphs_create || trends_movementGraphs_delete
     
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
    if (!state.roleSortCriteria.find(x => x === payload.id)) {
      state.roleSortCriteria.push(payload.id)
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
  state.roleSortCriteria = []
  for(let ii in payload) {
    state.roleSortCriteria.push(payload[ii].id ? payload[ii].id : payload[ii])
  }
}
export function setCurrentTree (state, payload) {
  state.currentTree = payload
  if(state.currentTreeListeners.length > 0) {
  for(let listener of state.currentTreeListeners) {
    listener()
  }
  state.currentTreeListeners = []
}
}
export function setSortKey(state,payload) {
  state.sortKey = payload
}
export function addCurrentTreeListener (state, listener) {
  state.currentTreeListeners.push(listener)
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
  let currentRole = state.userRoleDefinitions[payload.userRole].rules
  currentRole[payload.ruleKey] = payload.value
  currentRole.access_view = currentRole.access_view || currentRole.access_users_invite || currentRole.access_users_revoke || currentRole.access_userRoles_create || currentRole.access_userRoles_edit || currentRole.access_userRoles_delete
  currentRole.members_view = currentRole.members_view || currentRole.members_create || currentRole.members_edit || currentRole.members_delete || currentRole.members_export 
  currentRole.settings_roles_view = currentRole.settings_roles_view || currentRole.settings_roles_create || currentRole.settings_roles_edit || currentRole.settings_roles_delete
  currentRole.settings_mods_view = currentRole.settings_mods_view || currentRole.settings_mods_create || currentRole.settings_mods_edit || currentRole.settings_mods_delete
  currentRole.settings_calc_view = currentRole.settings_calc_view || currentRole.settings_calc_create || currentRole.settings_calc_edit || currentRole.settings_calc_delete
  currentRole.settings_complex_view = currentRole.settings_complex_view || currentRole.settings_complex_create || currentRole.settings_complex_edit || currentRole.settings_complex_delete 
  currentRole.settings_view = currentRole.settings_view || currentRole.settings_roles_view || currentRole.settings_mods_view || currentRole.settings_calc_view || currentRole.settings_complex_view
  currentRole.snapshots_view = currentRole.snapshots_view || currentRole.snapshots_update
  currentRole.trees_view = currentRole.trees_view || currentRole.trees_create || currentRole.trees_delete || currentRole.trees_export || currentRole.subTrees_add || currentRole.subTrees_remove
  currentRole.trends_view = currentRole.trends_view || currentRole.trends_movementGraphs_view ||currentRole. trends_movementGraphs_create || currentRole.trends_movementGraphs_delete
  // return firebase.firestore().doc(`/movements/${state.movement.id}/user-role-definitions/${payload.userRole}`).update({ ['rules.access.view']: payload.value }).catch(err => console.error(err))
  // use this once the bug with updating nested fields is fixed
  return await updateDoc(
          doc(
            getFirestore(),
            `/movements/${state.movement.id}/user-role-definitions/${payload.userRole}`
          ),
          state.userRoleDefinitions[payload.userRole]
        ).catch(err => console.error(err)); 
}