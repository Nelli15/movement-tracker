import firebase from '../../data/firebase'

const state = {
  // user: {
    // notChecked: true
  // }
  movements:{

  }
}

export const getters = {
  movements: state => state.movements,
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
        const { displayName, email, photoURL, uid } = user
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
