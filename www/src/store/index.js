import Vue from 'vue'
import Vuex from 'vuex'
// import auth from './modules/auth'
// import movements from './modules/movements'

// import example from './module-example'

Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    state: {},
    modules: {
      // auth,
      // movements
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEV
  })

  return Store
}
