import { LocalStorage } from 'quasar'

export function fetchHighlighted ({ commit, rootState }, id) {
  const members = rootState.movement.stats[id].members
  commit('setHighlighted', { id, members })
}
export function changeSize ({ commit, state }, option) {
  if (option === '-') {
    LocalStorage.set('zoom', state.size - 10)
    // console.log(this._vm.q.localStorage.getItem('zoom'))
    commit('setSize', state.size - 10)
  } else if (option === '+') {
    LocalStorage.set('zoom', state.size + 10)
    commit('setSize', state.size + 10)
  }
}
export function showDrawer ({ commit, state }, payload) {
  var current = state.show[payload]
  commit('closeDrawers', payload)
  commit('setShow', { key: payload, value: current })
}
export function setReadyDelayed ({ commit }, val) {
  setTimeout(() => {
    commit('setReady', val)
  }, 1000)
}
