import firebase from '../../data/firebase'

const state = {
  user: {
    // notChecked: true
  }
}

export const getters = {
  user: state => state.user,
  loggedIn: state => 'uid' in state.user
}

export const mutations = {
  setUser (state, payload) {
    state.user = payload
    // state.logInCheck = true
  }
}

export const actions = {
  fetchCreds ({ commit }) {
    console.log('fetching Creds')
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        const { displayName, email, uid, photoURL } = user
        const cleanedUser = { displayName, email, photoURL, uid }
        commit('setUser', cleanedUser)
      } else {
        commit('setUser', {})
      }
    })
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
