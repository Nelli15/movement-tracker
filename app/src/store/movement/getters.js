/*
export function someGetter (state) {
}
*/

import { toArray } from './../utils/movement.js'

export function lastUpdated (state) {
  if (
    state.movement.last_modified &&
    state.movement.last_modified !== 'Error: No Date Available'
  ) {
    var date = state.movement.last_modified.toDate()
    return `${date.getDate()}/${date.getMonth() +
      1}/${date.getFullYear()} ${date.getHours()}:${(
      '00' + date.getMinutes()
    ).slice(-2)}`
  } else {
    return 'Error: No Date Available'
  }
}
export function backgroundColor (state) {
  if (state.movement) {
    if (state.movement.style) {
      if (state.movement.style.backgroundColor) {
        return state.movement.style.backgroundColor
      }
    }
  }
  return 'white'
}
export function color (state) {
  if (state.movement) {
    if (state.movement.style) {
      if (state.movement.style.backgroundColor) {
        let r = 0,
          g = 0,
          b = 0
        const h = state.movement.style.backgroundColor
        if (h.length === 7) {
          r = parseInt(h[1] + h[2], 16)
          g = parseInt(h[3] + h[4], 16)
          b = parseInt(h[5] + h[6], 16)
        }
        var percent = (100 * (r / 255 + g / 255 + b / 255)) / 3
        if (percent >= 50) {
          return 'black'
        } else {
          return 'white'
        }
      }
    }
  }
  return 'black'
}

export function roleOpts (state) {return state.roles !== {} ? toArray(state.roles).sort((a, b) => {
      return a.label > b.label ? 1 : a.label < b.label ? -1 : 0
    }) : []}
export function modOpts (state) {return state.mods !== {} ? toArray(state.mods).sort((a, b) => {
      return a.label > b.label ? 1 : a.label < b.label ? -1 : 0
    }) : []}
export function complexOpts (state) { return state.complexStats !== {} ? toArray(state.complexStats).sort((a, b) => {
      return a.label > b.label ? 1 : a.label < b.label ? -1 : 0
    }) : []}
export function calcOpts (state) { return state.calcStats !== {} ? toArray(state.calcStats).sort((a, b) => {
      return a.label > b.label ? 1 : a.label < b.label ? -1 : 0
    }) : []}

export function modStats (state) {
  var stats = []
  for (var key in state.stats) {
    if (state.stats[key].type === 'mod') {
      
      let total = []
    let members = {}
    for(let ind in state.statImports) {
      // console.log(state.statImports[ind], state.statTotals[state.statImports[ind]])
      total.push(state.statTotals[state.statImports[ind]] && state.statTotals[state.statImports[ind]][key] ? state.statTotals[state.statImports[ind]][key].total : 0)
      members = {...members, ...state.statTotals[state.statImports[ind]] && state.statTotals[state.statImports[ind]][key] ? state.statTotals[state.statImports[ind]][key].members : {}}
    }
      stats.push({ ...state.stats[key], total: total.reduce((a, b) => a + b, 0), members: members})
    }
  }
  return stats.sort((a, b) => {
    return a.label > b.label ? 1 : a.label < b.label ? -1 : 0
  })
}
export function roleStats (state) {
  var stats = []
  for (var key in state.stats) {
    if (state.stats[key].type === 'role') {
      let total = []
    let members = {}
    for(let ind in state.statImports) {
      // console.log(state.statImports[ind], state.statTotals[state.statImports[ind]])
      total.push(state.statTotals[state.statImports[ind]] && state.statTotals[state.statImports[ind]][key] ? state.statTotals[state.statImports[ind]][key].total : 0)
      members = {...members, ...state.statTotals[state.statImports[ind]] && state.statTotals[state.statImports[ind]][key] ? state.statTotals[state.statImports[ind]][key].members : {}}
    }
      stats.push({ ...state.stats[key], total: total.reduce((a, b) => a + b, 0), members: members})
    }
  }
  return stats.sort((a, b) => {
    return a.label > b.label ? 1 : a.label < b.label ? -1 : 0
  })
}
export function complexStats (state) {
  var stats = []
  for (var key in state.stats) {
    if (state.stats[key].type === 'complex') {
      
      let total = []
    let members = {}
    for(let ind in state.statImports) {
      // console.log(state.statImports[ind], state.statTotals[state.statImports[ind]])
      total.push(state.statTotals[state.statImports[ind]] && state.statTotals[state.statImports[ind]][key] ? state.statTotals[state.statImports[ind]][key].total : 0)
      members = {...members, ...state.statTotals[state.statImports[ind]] && state.statTotals[state.statImports[ind]][key] ? state.statTotals[state.statImports[ind]][key].members : {}}
    }
      stats.push({ ...state.stats[key], total: total.reduce((a, b) => a + b, 0), members: members})
    }
  }
  return stats.sort((a, b) => {
    return a.label > b.label ? 1 : a.label < b.label ? -1 : 0
  })
}
export function calcStats (state) {
  var stats = []
  for (var key in state.stats) {
    if (state.stats[key].type === 'calc') {
      
      let total = []
    let members = {}
    for(let ind in state.statImports) {
      // console.log(state.statImports[ind], state.statTotals[state.statImports[ind]])
      total.push(state.statTotals[state.statImports[ind]] && state.statTotals[state.statImports[ind]][key] ? state.statTotals[state.statImports[ind]][key].total : 0)
      members = {...members, ...state.statTotals[state.statImports[ind]] && state.statTotals[state.statImports[ind]][key] ? state.statTotals[state.statImports[ind]][key].members : {}}
    }
      stats.push({ ...state.stats[key], total: total.reduce((a, b) => a + b, 0), members: members})
    }
  }
  return stats.sort((a, b) => {
    return a.label > b.label ? 1 : a.label < b.label ? -1 : 0
  })
}
export function totalStats (state) {
  if (state.stats) {
    let total = []
    let members = {}
    for(let ind in state.statImports) {
      // console.log(state.statImports[ind], state.statTotals[state.statImports[ind]])
      total.push(state.statTotals[state.statImports[ind]] && state.statTotals[state.statImports[ind]].treeTotal ? state.statTotals[state.statImports[ind]].treeTotal.total : 0)
      // members = {...members, ...state.statTotals[state.statImports[ind]].treeTotal.members}
    }
    return {
      
      treeTotal: { ...state.stats.treeTotal, total: total.reduce((a, b) => a + b, 0), members: members}
    }
  }
}

export function memberList (state) {
  return Object.values(state.memberList)
}

export function treeOpts (state) {
  return Object.values(state.trees)
}

export function treeSorted (state) { 
      const key = state.sortKey ? state.sortKey : 'Name';
      const sortBy = state.roleSortCriteria; //toArray(this.roles).sort((a, b) => (a.label > b.label) ? 1 : -1)
      const tree = state.currentTree && state.trees[state.currentTree.id] ? JSON.parse(JSON.stringify(state.trees[state.currentTree.id].tree)) : []
      if(!Array.isArray(tree)) return []
      if (key === "Name") {
        tree.sort((a, b) =>
          (state.members[a.id]
            ? state.members[a.id].name.toLowerCase()
            : undefined) >
          (state.members[b.id]
            ? state.members[b.id].name.toLowerCase()
            : undefined)
            ? 1
            : -1
        );
        for (var child in tree) {
          // console.log(tree[child])
          sortChildrenByName(tree[child], state.members);
        }
      } else if (key === "Role") {
        if(tree > []){
        customSort({ data: tree, sortBy, members: state.members });
        for (var child in tree) {
          // console.log(tree[child])
          sortChildrenByRole(tree[child], sortBy, state.members);
        }
      }
      }
      return tree

      function sortChildrenByName(child, members) {
        child.children.sort((a, b) =>
          (members[a.id] ? members[a.id].name.toLowerCase() : undefined) >
          (members[b.id] ? members[b.id].name.toLowerCase() : undefined)
            ? 1
            : -1
        );
        for (var subChild in child.children) {
          sortChildrenByName(child.children[subChild], key, members);
        }
      }
      function customSort({ data, sortBy, members }) {
        const sortByObject = sortBy.reduce((obj, item, index) => {
          return {
            ...obj,
            [item.id]: index
          };
        }, {});

        return data.sort((a, b) => {
          return members[a.id] && members[b.id]
            ? sortByObject[members[a.id].role] -
                sortByObject[members[b.id].role] !==
              0
              ? sortByObject[members[a.id].role] -
                sortByObject[members[b.id].role]
              : (members[a.id] ? members[a.id].name.toLowerCase() : undefined) >
                (members[b.id] ? members[b.id].name.toLowerCase() : undefined)
              ? 1
              : -1
            : undefined;
        });
      }
      function sortChildrenByRole(child, sortBy, members) {
        customSort({ data: child.children, sortBy, members });
        for (var subChild in child.children) {
          sortChildrenByRole(child.children[subChild], sortBy, members);
        }
      }
}
