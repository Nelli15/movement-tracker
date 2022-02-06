import '../../data/firebase'
import firebase from "@firebase/app"
require("@firebase/firestore")
import Vue from 'vue'
function buildTree (members, parentKey) {
  // Takes a list of members and a parentKey and returns a tree of children for that parent along with all subsequent grand children
  let children = [], ii
  if (members[parentKey]) {
    for (ii in members[parentKey]) {
      children.push({
        name: members[parentKey][ii].name,
        id: members[parentKey][ii].id,
        baseStyle: members[parentKey][ii].baseStyle,
        overrideStyles: Array.isArray(members[parentKey][ii].overrideStyles) ? members[parentKey][ii].overrideStyles : [members[parentKey][ii].overrideStyles],
        parent: members[parentKey][ii].parent,
        display: members[parentKey][ii].display,
        children: buildTree(members, members[parentKey][ii].id)
        // header: members[parent][ii].header
      })
      // people
    }
  }
  children = children ? children.sort((a, b) => { return (a.name > b.name) ? 1 : (a.name < b.name) ? -1 : 0 }) : []
  return children
}

function getBackground (member, baseStyles, overrideStyles) {
  // set background color
  // console.log(member, baseStyles, overrideStyles, Array.isArray(member.overrideStyles), typeof member.overrideStyles)
  if (member.overrideStyles) {
    if (Array.isArray(member.overrideStyles)) {
      for (var key in member.overrideStyles) {
        // console.log(overrideStyles[member.overrideStyles[key]])
        if (typeof overrideStyles[member.overrideStyles[key]] === 'object') {
          if (overrideStyles[member.overrideStyles[key]].style) {
            if (overrideStyles[member.overrideStyles[key]].style.backgroundOverride === true) {
              return overrideStyles[member.overrideStyles[key]].style.background
            }
          }
        }
      }
    } else {
      if (typeof overrideStyles[member.overrideStyles] === 'object') {
        if (overrideStyles[member.overrideStyles].style) {
          if (overrideStyles[member.overrideStyles].style.backgroundOverride === true) {
            return overrideStyles[member.overrideStyles].style.background
          }
        }
      }
    }
  }

  if (member.baseStyle && member.baseStyle > '') {
    if (typeof baseStyles[member.baseStyle] === 'object') {
      if (baseStyles[member.baseStyle].style) {
        return baseStyles[member.baseStyle].style.background
      }
    }
  }
  return 'white'
}

function getColor (member, baseStyles, overrideStyles) {
  // set text color
  // if(member.overrideStyles && member.overrideStyles !== "no-overrideStyles" && member.overrideStyles[0] !== "no-overrideStyles")
  if (member.overrideStyles) {
    if (Array.isArray(member.overrideStyles)) {
      for (var key in member.overrideStyles) {
        if (typeof overrideStyles[member.overrideStyles[key]] === 'object') {
          if (overrideStyles[member.overrideStyles[key]].style) {
            if (overrideStyles[member.overrideStyles[key]].style.colorOverride === true) {
              return overrideStyles[member.overrideStyles[key]].style.color
            }
          }
        }
      }
    } else {
      if (typeof overrideStyles[member.overrideStyles] === 'object') {
        if (overrideStyles[member.overrideStyles].style) {
          // if(overrideStyles[member.overrideStyles].style.colorOverride == true)
          // {
          return overrideStyles[member.overrideStyles].style.color
          // }
        }
      }
    }
  }
  if (member.baseStyle && member.baseStyle > '') {
    if (typeof baseStyles[member.baseStyle] === 'object') {
      if (baseStyles[member.baseStyle].style) {
        return baseStyles[member.baseStyle].style.color
      }
    }
  }
  return 'black'
}

function getOutline (member, baseStyles, overrideStyles) {
  // set border color
  if (member.overrideStyles) {
    if (Array.isArray(member.overrideStyles)) {
      for (var key in member.overrideStyles) {
        if (typeof overrideStyles[member.overrideStyles[key]] === 'object') {
          if (overrideStyles[member.overrideStyles[key]].style) {
            if (overrideStyles[member.overrideStyles[key]].style.outlineOverride === true) {
              return overrideStyles[member.overrideStyles[key]].style.outline
            }
          }
        }
      }
    } else {
      if (typeof overrideStyles[member.overrideStyles] === 'object') {
        if (overrideStyles[member.overrideStyles].style) {
          if (overrideStyles[member.overrideStyles].style.outlineOverride === true) {
            return overrideStyles[member.overrideStyles].style.outline
          }
        }
      }
    }
  }
  if (member.baseStyle && member.baseStyle > '') {
    if (typeof baseStyles[member.baseStyle] === 'object') {
      if (baseStyles[member.baseStyle].style) {
        // if(baseStyles[member.baseStyle].style.outlineOverride == true)
        // {
        return baseStyles[member.baseStyle].style.outline
        // }
      }
    }
  }
  return 'white'
}

function checkUnderline (member, baseStyles, overrideStyles) {
  if (member.overrideStyles) {
    if (Array.isArray(member.overrideStyles)) {
      for (var key in member.overrideStyles) {
        if (typeof overrideStyles[member.overrideStyles[key]] === 'object') {
          if (overrideStyles[member.overrideStyles[key]].style) {
            if (overrideStyles[member.overrideStyles[key]].style.underlineOverride === true) {
              if (overrideStyles[member.overrideStyles[key]].style.underline === true) {
                return true
              }
            }
          }
        }
      }
    } else {
      if (typeof overrideStyles[member.overrideStyles] === 'object') {
        if (overrideStyles[member.overrideStyles].style) {
          if (overrideStyles[member.overrideStyles[key]].style.underlineOverride === true) {
            if (overrideStyles[member.overrideStyles].style.underline === true) {
              return true
            }
          }
        }
      }
    }
  }
  if (member.baseStyle && member.baseStyle > '') {
    if (typeof baseStyles[member.baseStyle] === 'object') {
      if (baseStyles[member.baseStyle].style) {
        if (baseStyles[member.baseStyle].style.underline === true) {
          return true
        }
      }
    }
  }
  return false
}

function checkRound (member, baseStyles, overrideStyles) {
  // console.log(member.overrideStyles)
  // console.log(member.baseStyle)
  // console.log(member.overrideStyles && member.overrideStyles !== "no-overrideStyles" && member.overrideStyles[0] !== "no-overrideStyles")
  if (member.overrideStyles) {
    if (Array.isArray(member.overrideStyles)) {
      for (var key in member.overrideStyles) {
        if (typeof overrideStyles[member.overrideStyles[key]] === 'object') {
          if (overrideStyles[member.overrideStyles[key]].style) {
            if (overrideStyles[member.overrideStyles[key]].style.roundOverride === true) {
              if (overrideStyles[member.overrideStyles[key]].style.round === true) {
                return true
              }
            }
          }
        }
      }
    } else {
      if (typeof overrideStyles[member.overrideStyles] === 'object') {
        if (overrideStyles[member.overrideStyles].style) {
          // console.log(overrideStyles[member.overrideStyles].style)
          if (overrideStyles[member.overrideStyles[key]].style.roundOverride === true) {
            if (overrideStyles[member.overrideStyles].style.round === true) {
              return true
            }
          }
        }
      }
    }
  }
  if (member.baseStyle && member.baseStyle > '') {
    if (typeof baseStyles[member.baseStyle] === 'object') {
      if (baseStyles[member.baseStyle].style) {
        if (baseStyles[member.baseStyle].style.round === true) {
          return true
        }
      }
    }
  }
  return false
}

function getLabel (member, baseStyles, overrideStyles) {
  var res = ''
  if (member.overrideStyles) {
    if (Array.isArray(member.overrideStyles)) {
      let spaceAdded = false
      for (var key in member.overrideStyles) {
        if (typeof overrideStyles[member.overrideStyles[key]] === 'object') {
          if (overrideStyles[member.overrideStyles[key]].icon > '') {
            if (overrideStyles[member.overrideStyles[key]].style.prepend === true) {
              if (!spaceAdded) {
                res += ' '
                spaceAdded = true
              }
              res += `[${overrideStyles[member.overrideStyles[key]].icon}] `
            }
          }
        }
      }
    } else if (typeof member.overrideStyles === 'string') {
      if (typeof overrideStyles[member.overrideStyles] === 'object') {
        if (overrideStyles[member.overrideStyles].icon > '') {
          if (overrideStyles[member.overrideStyles].style.prepend === true) {
            res += `[${overrideStyles[member.overrideStyles].icon}] `
          }
        }
      }
    }
  }
  res += member.name
  if (member.overrideStyles) {
    if (Array.isArray(member.overrideStyles)) {
      let spaceAdded = false
      for (key in member.overrideStyles) {
        if (typeof overrideStyles[member.overrideStyles[key]] === 'object') {
          if (overrideStyles[member.overrideStyles[key]].icon > '') {
            if (!overrideStyles[member.overrideStyles[key]].style.prepend) {
              if (!spaceAdded) {
                res += ' '
                spaceAdded = true
              }
              res += `[${overrideStyles[member.overrideStyles[key]].icon}]`
            }
          }
        }
      }
    } else if (typeof member.overrideStyles === 'string') {
      if (typeof overrideStyles[member.overrideStyles] === 'object') {
        if (overrideStyles[member.overrideStyles].icon > '') {
          if (!overrideStyles[member.overrideStyles].style.prepend) {
            res += ` [${overrideStyles[member.overrideStyles[key]].icon}]`
          }
        }
      }
    }
  }
  return res
}

const state = {
  // user: {
  // notChecked: true
  // }
  movements: {},
  movement: {
    id: ''
  },
  // currentMovement: '',
  members: {},
  noParents: {},
  tree: {},
  pages: {},
  size: 100,
  parentOptions: [{
    label: '--No Parent--',
    value: 'No Parent'
  },
  {
    label: '--First Member in Tree--',
    value: 'root'
  }],
  show: {
    movementDetails: false,
    movementLegend: false
  },
  // currentMember: {
  //   show: false
  // },
  newMember: {
    show: false
  },
  shares: [],
  requests: [],
  invites: [],
  baseStyles: {
    object: {},
    array: [],
    stats: {}
  },
  overrideStyles: {
    object: {},
    array: [],
    stats: {}
  },
  stats: {}
}

export const getters = {
  movements: state => state.movements,
  movement: state => {
    if (state.movement) {
      return {
        id: state.movement.id,
        name: state.movement.name
      }
    }
  },
  lastUpdated: state => {
    if (state.movement.last_modified && state.movement.last_modified !== 'Error: No Date Available') {
      // console.log('date', state.movement.last_modified, state.movement)
      var date = state.movement.last_modified.toDate()
      return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} ${date.getHours()}:${('00' + date.getMinutes()).slice(-2)}`
    } else {
      return 'Error: No Date Available'
    }
  },
  // currentMovement: state => state.movement.id,
  backgroundColor: state => {
    if (state.movement) {
      if (state.movement.style) {
        if (state.movement.style.backgroundColor) {
          return state.movement.style.backgroundColor
        }
      }
    }
    return 'white'
  },
  color: state => {
    if (state.movement) {
      if (state.movement.style) {
        if (state.movement.style.backgroundColor) {
          let r = 0, g = 0, b = 0, h = state.movement.style.backgroundColor
          // console.log(h.length)
          if (h.length === 7) {
            r = parseInt(h[1] + h[2], 16)
            g = parseInt(h[3] + h[4], 16)
            b = parseInt(h[5] + h[6], 16)
          }
          var percent = 100 * ((r / 255) + (g / 255) + (b / 255)) / 3
          // console.log(percent)
          // var percent = state.hexToPercent()
          // console.log(percent)
          if (percent >= 50) {
            return 'black'
          } else {
            return 'white'
          }
        }
      }
    }
    return 'black'
  },
  stats: state => {
    return state.stats
  },
  overrideStyleStats: state => {
    var stats = []
    // console.log(movement.stats)
    for (var key in state.stats) {
      if (state.stats[key].type === 'override') {
        stats.push(state.stats[key])
      }
    }
    return stats.sort((a, b) => { return (a.label > b.label) ? 1 : (a.label < b.label) ? -1 : 0 })
  },
  baseStyleStats: state => {
    var stats = []
    // console.log(movement.stats)
    for (var key in state.stats) {
      if (state.stats[key].type === 'base') {
        stats.push(state.stats[key])
      }
    }
    return stats.sort((a, b) => { return (a.label > b.label) ? 1 : (a.label < b.label) ? -1 : 0 })
  },
  totalStats: state => {
    // if (state.movement) {
    if (state.stats) {
      return {
        treeTotal: state.stats.treeTotal,
        noParentTotal: state.stats.noParentTotal
      }
    }
    // }
  },
  noAccess: state => !state.movement,
  viewer: state => {
    if (state.movement) {
      // console.log()
      return ['owner', 'super editor', 'editor', 'viewer'].indexOf(state.movement.role) !== -1
      // state.movement.baseStyle in ['owner', 'superEditor', 'editor', 'viewer']
    }
  },
  editor: state => {
    if (state.movement) {
      return ['owner', 'super editor', 'editor'].indexOf(state.movement.role) !== -1
    }
  },
  superEditor: state => {
    if (state.movement) {
      return ['owner', 'super editor'].indexOf(state.movement.role) !== -1
    }
  },
  owner: state => {
    if (state.movement) {
      return ['owner'].indexOf(state.movement.role) !== -1
    }
  },
  tree: state => {
    return state.tree
    // if (state.members) {
    //   return buildTree(state.members, 'root').concat(buildTree(state.members, '--First Member in Tree--'))
    //   // return {
    //   //   root: buildTree(state.members, 'root').concat(buildTree(state.members, '--First Member in Tree--')),
    //   //   noParent: buildTree(state.members, 'No Parent').concat(buildTree(state.members, '--No Parent--')).concat(buildTree(state.members, ''))
    //   // }
    // } else {
    //   return {}
    // }
  },
  noParents: state => {
    return state.noParents
    // if (state.members) {
    //   return buildTree(state.members, 'No Parent')
    //     .concat(buildTree(state.members, '--No Parent--'))
    //     .concat(buildTree(state.members, ''))
    //     .concat(buildTree(state.members, null))
    //     .concat(buildTree(state.members, undefined))
    // } else {
    //   return {}
    // }
  },
  pages: state => state.pages,
  size: state => state.size,
  show: state => state.show,
  baseStyles: state => state.baseStyles.object,
  overrideStyles: state => state.overrideStyles.object,
  baseStyleOptions: state => state.baseStyles.array,
  // {
  //   if (state.movement) {
  //     return getbaseStyleOptions(state.movement)
  //   }
  // },
  overrideStyleOptions: state => state.overrideStyles.array,
  // {
  //   if (state.movement) {
  //     return getoverrideStyleOptions(state.movement)
  //   }
  // }

  // name: state => state.movement.name
  parents: state => {
    if (state.movement) {
      let parentOptions = {}
      for (var key in state.parentOptions) {
        parentOptions[state.parentOptions[key].value] = state.parentOptions[key]
      }
      // console.log(parentOptions)
      return parentOptions
    }
  },
  parentOptions: state => {
    if (state.parentOptions) {
      return state.parentOptions
    }
  },
  currentMember: state => state.currentMember,
  shares: state => state.shares,
  requests: state => state.requests,
  invites: state => state.invites,
  newMember: state => state.newMember
}

export const mutations = {
  setMovements (state, payload) {
    // console.log('setMovements', payload)
    state.movements = payload
    // state.logInCheck = true
  },
  addMovement (state, payload) {
    Vue.set(state.movements, payload.id, payload)
  },
  removeMovement (state, id) {
    // state.movements.id = null
    Vue.delete(state.movements, id)
  },
  setMovement (state, payload) {
    // console.log('setMovement', payload)
    state.movement = payload
    // state.logInCheck = true
  },
  setMembers (state, payload) {
    state.members = payload
    state.tree = buildTree(state.members, 'root')
      .concat(buildTree(state.members, '--First Member in Tree--'))
    state.noParents = buildTree(state.members, 'No Parent')
      .concat(buildTree(state.members, '--No Parent--'))
      .concat(buildTree(state.members, ''))
      .concat(buildTree(state.members, null))
      .concat(buildTree(state.members, undefined))
    // state.logInCheck = true
  },
  setPages (state, payload) {
    state.pages = payload
  },
  setSize (state, payload) {
    state.size = payload
  },
  setShow (state, payload) {
    state.show[payload.key] = !payload.value
  },
  setOverrideStyles (state, payload) {
    payload.array.sort((a, b) => { return (a.label > b.label) ? 1 : (a.label < b.label) ? -1 : 0 })
    state.overrideStyles = payload
  },
  setBaseStyles (state, payload) {
    payload.array.sort((a, b) => { return (a.label > b.label) ? 1 : (a.label < b.label) ? -1 : 0 })
    state.baseStyles = payload
  },
  setParentOptions (state, payload) {
    payload.sort((a, b) => { return (a.label > b.label) ? 1 : (a.label < b.label) ? -1 : 0 })
    payload.unshift({
      label: '--No Parent--',
      value: 'No Parent'
    },
    {
      label: '--First Member in Tree--',
      value: 'root'
    })
    state.parentOptions = payload
  },
  closeDrawers (state, payload) {
    for (var key in state.show) {
      state.show[key] = false
    }
  },
  setCurrentMember (state, payload) {
    // state.currentMember = payload
    state.currentMember = payload
    // console.log('new current Member', state.currentMember)
  },
  setNewMember (state, payload) {
    // state.currentMember = payload
    state.newMember = payload
    // console.log('new current Member', state.currentMember)
  },
  setInvites (state, payload) {
    state.invites = payload
  },
  setRequests (state, payload) {
    state.requests = payload
  },
  setShares (state, payload) {
    state.shares = payload
  },
  setStats (state, payload) {
    state.stats = payload
  }
}

export const actions = {
  fetchMovements ({ dispatch, commit }, payload) {
    // this._vm.$q.loading.show()
    // console.log('getting baseStyles where uid === ', payload.uid)
    // console.log(user)
    firebase.firestore().collectionGroup('roles').where('uid', '==', payload.uid)
      .onSnapshot(async movementsSnap => {
        // console.log('# movements', movementsSnap.size)
        let movements = {}
        var promises = movementsSnap.docChanges().map(userDoc => {
          return new Promise((resolve, reject) => {
            // console.log(userDoc.type)
            if (userDoc.type === 'added') {
              userDoc = userDoc.doc
              userDoc.ref.parent.parent.onSnapshot(movementDoc => {
                console.log()
                movements[movementDoc.id] = movementDoc.data()
                movements[movementDoc.id].id = movementDoc.id
                movements[movementDoc.id].role = userDoc.data().role
                movements[movementDoc.id].last_modified = movementDoc.data().last_modified ? movementDoc.data().last_modified : 'Error: No Date Available'
                commit('addMovement', movements[movementDoc.id])
                resolve()
              })
            }
          })
        })
        // console.log('here')
        await Promise.all(promises)
        // console.log(Object.keys(movements).length)
        // if (Object.keys(movements).length) {
        //   commit('setMovements', movements)
        // }
        // console.log('fetchMovement', payload)
        if (payload.movementId) {
          dispatch('fetchMovement', payload)
        } else {
          // this._vm.$q.loading.hide()
        }
      })
    // if (state.movement.id) {
    //   commit('setMovement', payload[state.movement.id])
    // }
  },
  async fetchMovement ({ commit, dispatch }, payload) {
    // commit('setCurrentMovement', payload.movementId)
    if (!state.movements[payload.movementId]) {
      commit('setMovement', { id: payload.movementId })
      // this._vm.$q.loading.hide()
      return false
    }
    // this._vm.$q.loading.show()
    console.log('fetching movement', state.movements[payload.movementId])
    if (state.movements) {
      commit('setMovement', { id: 'fake' })
      if ((state.movement.id !== payload.movementId) || payload.force) {
        // var movement = state.movements[state.movement.id]
        // console.log('fetching movement', state.movements[payload.movementId])
        commit('setMovement', state.movements[payload.movementId])
        let members = {}, baseStyles = { object: {}, array: [] }, overrideStyles = { object: {}, array: [] }
        var movementDoc = firebase.firestore().doc(`/movements/${payload.movementId}`)
        await movementDoc.collection('/styles')
          .onSnapshot(async styleQuery => {
            baseStyles = { object: {}, array: [] }
            overrideStyles = { object: {}, array: [] }
            // console.log(styleQuery.size, 'styles found')
            await movementDoc.collection(`/members`).onSnapshot(async membersSnap => {
              // console.log('# members', membersSnap.size)
              // membersSnap.docChanges().forEach(change => console.log(change))
              var promises = membersSnap.docChanges().map(change => {
                let memberDoc = change.doc
                // console.log(members)
                if (memberDoc.exists && change.type !== 'removed') {
                  // members[memberDoc.id] = memberDoc.data()
                  var data = memberDoc.data()
                  // data.movement = payload.movementId
                  data.id = memberDoc.id
                  data.exists = memberDoc.exists
                  members[memberDoc.id] = data
                } else {
                  // console.log(memberDoc)
                  delete members[memberDoc.id]
                }
              })
              await Promise.all(promises)
              // console.log(members)
              dispatch('fetchMembers', members)
            })
            // console.log(styleQuery.size)
            if (styleQuery.size > 0) {
              let styleData
              await styleQuery.forEach(style => {
                // console.log(style.data())
                styleData = style.data()
                styleData.id = style.id
                if (!styleData.style) {
                  styleData.style = {
                    color: '#000000',
                    background: '#FFFFFF',
                    outline: '#FFFFFF',
                    round: false,
                    underline: false,
                    prepend: false,
                    colorOverride: false,
                    backgroundOverride: false,
                    outlineOverride: false,
                    roundOverride: false,
                    underlineOverride: false
                  }
                  firebase.firestore().doc(`/movements/${movementDoc.id}/styles/${styleData.id}`)
                    .update({
                      style: {
                        color: '#000000',
                        background: '#FFFFFF',
                        outline: '#FFFFFF',
                        round: false,
                        underline: false,
                        prepend: false,
                        colorOverride: false,
                        backgroundOverride: false,
                        outlineOverride: false,
                        roundOverride: false,
                        underlineOverride: false
                      }
                    })
                }
                if (styleData.type === 'base') {
                  // console.log(styleData.label)
                  baseStyles.object[style.id] = styleData
                  baseStyles.array.push(baseStyles.object[style.id])
                } else if (styleData.type === 'override') {
                  // console.log(styleData)
                  overrideStyles.object[style.id] = styleData
                  overrideStyles.array.push(overrideStyles.object[style.id])
                }
                // console.log(baseStyles, overrideStyles)
              })
              commit('setBaseStyles', baseStyles)
              commit('setOverrideStyles', overrideStyles)
            } else {
              if (state.movement.memberRoles) {
                await state.movement.memberRoles.forEach(style => {
                  baseStyles.object[style.id] = style
                  baseStyles.object[style.id].label = baseStyles.object[style.id].label ? baseStyles.object[style.id].label : baseStyles.object[style.id].name
                  baseStyles.object[style.id].name = null
                  baseStyles.object[style.id].value = baseStyles.object[style.id].value ? baseStyles.object[style.id].value : baseStyles.object[style.id].id
                  baseStyles.object[style.id].type = 'base'
                  baseStyles.array.push(baseStyles.object[style.id])
                  firebase.firestore().collection(`/movements/${payload.movementId}/styles`).doc(style.id).set(baseStyles.object[style.id])
                })
              }
              if (state.movement.memberMods) {
                await state.movement.memberMods.forEach(style => {
                  overrideStyles.object[style.id] = style
                  overrideStyles.object[style.id].label = overrideStyles.object[style.id].label ? overrideStyles.object[style.id].label : overrideStyles.object[style.id].name
                  overrideStyles.object[style.id].name = null
                  overrideStyles.object[style.id].value = overrideStyles.object[style.id].value ? overrideStyles.object[style.id].value : overrideStyles.object[style.id].id
                  overrideStyles.object[style.id].type = 'override'
                  overrideStyles.array.push(overrideStyles.object[style.id])
                  firebase.firestore().collection(`/movements/${payload.movementId}/styles`).doc(style.id).set(overrideStyles.object[style.id])
                })
              }
            }
            // baseStyles.array = baseStyles.array.sort((a, b) => { return (a.label > b.label) ? 1 : (a.label < b.label) ? -1 : 0 })
            // overrideStyles.array = overrideStyles.array.sort((a, b) => { return (a.label > b.label) ? 1 : (a.label < b.label) ? -1 : 0 })
            // console.log(baseStyles)
            commit('setBaseStyles', baseStyles)
            commit('setOverrideStyles', overrideStyles)
          })
        // console.log(`/movements/${this.currentMovement}/members`)
        // console.log(this.share)
        movementDoc.collection(`/roles`).onSnapshot((shareSnap) => {
          // console.log(share, shareSnap)
          let share = {}
          for (var key in shareSnap.docs) {
            // console.log(this.share)
            var member = shareSnap.docs[key].data()
            member.id = shareSnap.docs[key].id
            share[member.id] = member

            firebase.firestore().doc(`/status/${shareSnap.docs[key].id}`).onSnapshot(doc => {
              // console.log(doc.id)
              share[doc.id].online = false
              if (doc.exists) {
                // console.log(doc.data().state)
                if (doc.data().state === 'online') {
                  // console.log(true)
                  share[doc.id].online = true
                }
              }
              // this.$forceUpdate()
            })
            commit('setShares', share)
          }
        })
        movementDoc.collection(`/invites`).onSnapshot((shareSnap) => {
          // console.log(shareSnap)
          let pendingShare = []
          for (var key in shareSnap.docs) {
            // console.log(this.share)
            pendingShare.push(shareSnap.docs[key].data())
          }
          commit('setInvites', pendingShare)
        })
        movementDoc.collection(`/requests`).onSnapshot((requestSnap) => {
          // console.log(shareSnap)
          let pendingRequests = []
          for (var key in requestSnap.docs) {
            // console.log(this.share)
            var requestData = requestSnap.docs[key].data()
            requestData.role = 'viewer'
            pendingRequests.push(requestData)
          }
          commit('setRequests', pendingRequests)
        })
      }
    }
  },
  async fetchMembers ({ commit, dispatch }, payload) {
    let members = {}, parent, child
    let parentOptions = []
    let stats = {
      treeTotal: {
        name: 'Total on Tree',
        total: 0
      },
      noParentTotal: {
        name: 'Total with No Parent',
        total: 0
      }
    }
    await state.baseStyles.array.forEach(style => {
      // console.log(style)
      stats[style.id] = {
        id: style.id,
        label: style.label,
        total: 0,
        type: 'base'
      }
    })
    await state.overrideStyles.array.forEach(style => {
      // console.log(style)
      stats[style.id] = {
        id: style.id,
        label: style.label,
        total: 0,
        type: 'override'
      }
    })
    for (parent in members) {
      members[parent] = []
      // console.log(members[parent].length)
    }
    // for (parent in payload) {
    // console.log('number of children', parent, payload[parent])
    for (child in payload) {
    // return Promise((resolve, reject) => {
      var member = payload[child]
      // console.log(member.name, member.id)
      // console.log(overrideStyles)
      // var member = member
      member.baseStyle = member.baseStyle ? member.baseStyle : member.role
      member.baseStyle = state.baseStyles.object[member.baseStyle] ? member.baseStyle : 'default'
      member.overrideStyles = member.overrideStyles ? member.overrideStyles : member.mods
      member.overrideStyles = Array.isArray(member.overrideStyles) ? member.overrideStyles : [member.overrideStyles]
      member.display = {
        label: getLabel(member, state.baseStyles.object, state.overrideStyles.object),
        background: getBackground(member, state.baseStyles.object, state.overrideStyles.object),
        color: getColor(member, state.baseStyles.object, state.overrideStyles.object),
        outline: getOutline(member, state.baseStyles.object, state.overrideStyles.object),
        underline: checkUnderline(member, state.baseStyles.object, state.overrideStyles.object),
        round: checkRound(member, state.baseStyles.object, state.overrideStyles.object)
      }
      // member.header = 'true'
      // console.log(member)
      if (!members[member.parent]) {
        members[member.parent] = []
      }
      // console.log(members)
      // console.log(member)
      members[member.parent].push(member)
      // resolve()
      parentOptions.push({
        label: member.name,
        value: member.id
      })
      // console.log(member, state.baseStyles.object[member.baseStyle])
      if (!stats[member.baseStyle]) {
        stats[member.baseStyle] = {
          id: member.baseStyle,
          label: state.baseStyles.object[member.baseStyle].label,
          total: 0,
          type: 'base'
        }
      }
      stats[member.baseStyle].total += 1

      for (var key in member.overrideStyles) {
        if (!stats[member.overrideStyles[key]]) {
          if (!state.overrideStyles.object[member.overrideStyles[key]]) {
            member.overrideStyles.filter(val => { return val !== member.overrideStyles[key] })
            break
          }
          // console.log(state.overrideStyles.object[member.overrideStyles[key]])
          stats[member.overrideStyles[key]] = {
            id: member.overrideStyles[key],
            label: state.overrideStyles.object[member.overrideStyles[key]].label,
            total: 0,
            type: 'override'
          }
        }
        stats[member.overrideStyles[key]].total += 1
      }
      // console.log(member, stats.treeTotal, stats.noParentTotal)
      if (member.parent !== 'No Parent') {
        stats.treeTotal.total += 1
      } else {
        stats.noParentTotal.total += 1
      }
      // console.log(stats)
      // if (state.currentMember.id === member.id) {
      //   member.show = true
      //   dispatch('updateCurrentMember', member)
      // }
    }
    commit('setStats', stats)
    commit('setParentOptions', parentOptions)
    commit('setMembers', members)
    // this._vm.$q.loading.hide()
  },
  changeSize ({ commit }, option) {
    // console.log(option)
    if (option === '-') {
      commit('setSize', state.size - 10)
    } else if (option === '+') {
      commit('setSize', state.size + 10)
    }
  },
  showDrawer ({ commit, dispatch }, payload) {
    var current = state.show[payload]
    // dispatch('updateCurrentMember')
    commit('closeDrawers', payload)
    commit('setShow', { key: payload, value: current })
  },
  updateMember ({ commit }, payload) {
    // console.log('updating member', this._vm)
    // console.log(payload)
    // commit('', payload)
    // oldMember = state.member
    // commit('setMember', payload)
    return firebase.firestore().doc(`/movements/${state.movement.id}/members/${payload.memberId}`).update({ [payload.key]: payload.value })
      .then(() => {
        this._vm.$q.notify({
          color: 'positive',
          textColor: 'white',
          icon: 'cloud_download',
          message: 'Member Updated'
        })
        Promise.resolve()
        return true
      }).catch(err => {
        console.log('Oops, something went wrong: ' + err)
        this._vm.$q.notify({
          color: 'negative',
          textColor: 'white',
          icon: 'error',
          message: 'Oops, Something went wrong!'
        })
      })
  }
  // updateCurrentMember ({ commit }, payload) {
  //   commit('closeDrawers', payload)
  //   if (!payload) {
  //     commit('setCurrentMember', { show: false })
  //     return
  //   }
  //   payload.show = true
  //   commit('setCurrentMember', payload)
  // },
  // updateNewMember ({ commit }, payload) {
  //   // console.log(payload)
  //   commit('closeDrawers', payload)
  //   if (!payload) {
  //     // console.log('no payload')
  //     // payload = state.currentMember
  //     commit('setNewMember', { show: false })
  //     return
  //   }
  //   // console.log('payloadId', payload.id, 'currentMember ID', state.currentMember.id, state.currentMember)
  //   // if (state.currentMember.id === payload.id) {
  //   // console.log('matched')
  //   // payload.show = !payload.show
  //   // } else {
  //   payload.show = true
  //   // }
  //   // console.log(payload)
  //   commit('setNewMember', payload)
  // },
  // fetchRequests ({ commit }, payload) {
  //   commit('setRequests', payload)
  // },
  // fetchInvites ({ commit }, payload) {
  //   commit('setInvites', payload)
  // },
  // fetchShares ({ commit }, payload) {
  //   commit('setShares', payload)
  // },
  // updateMovement ({ commit }, payload) {
  // }
}

export default {
  state,
  getters,
  mutations,
  actions
}
