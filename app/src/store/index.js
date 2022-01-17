import firebase from './../data/firebase.js'
import {createStore} from 'vuex'

import auth from './auth'
import movements from './movements'
import movement from './movement'
import snapshot from './snapshot'
import trends from './trends'
import general from './general'
import events from './events'

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */

export default function (/* { ssrContext } */) {
  const store = new createStore({
    modules: {
      general,
      auth,
      movements,
      movement,
      snapshot,
      trends,
      events
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEV
  })

  store.dispatch('auth/fetchCreds')
  return store
}
