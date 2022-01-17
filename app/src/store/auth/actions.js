/*
export function someAction (context) {
}
*/

import {
  getAnalytics,
  setUserId,
  setUserProperties,
  logEvent
} from '@firebase/analytics'
import { onAuthStateChanged, getAuth } from '@firebase/auth'
import {
  getDoc,
  doc,
  getFirestore,
  addDoc,
  updateDoc
} from "@firebase/firestore"

import { Dark } from 'quasar'
import packageJson from '../../../package.json'

export async function fetchCreds ({ commit }) {
  // console.log('fetching Creds')
  onAuthStateChanged(getAuth(), async user => {
    if (user) {
      const { displayName, email, uid, photoURL } = user

      setUserId(getAnalytics(), uid)
      // console.log(email, email.indexOf('@powertochange.org.au'), { user_type: email.indexOf('@powertochange.org.au') !== -1 ? 'aus_missionary' : 'other', app_color: Dark.isActive ? 'dark' : 'light' })
      setUserProperties(getAnalytics(), {
        user_type:
          email.indexOf('@powertochange.org.au') !== -1
            ? 'aus_missionary'
            : 'other',
        app_color: Dark.isActive ? 'dark' : 'light',
        app_version: packageJson.version
      })
      // firebase.getAnalytics().setUserProperties({  })
      const cleanedUser = { displayName, email, photoURL, uid }
      // getAuth().currentUser.getIdToken(/* forceRefresh */ true).then(idToken => {
      //   commit('setUserLoadStatus', true)
      // })

      const userDoc = doc(getFirestore(), `/app-users/${uid}`)
      getDoc(doc(getFirestore(), `/app-users/${getAuth().currentUser.uid}`))
        .then(async docSnap => {
          if (!docSnap.exists) {
            cleanedUser.lastVersion = '0.0.0'
            await addDoc(
              doc(getFirestore(), `/app-users/${uid}`),
              cleanedUser
            ).catch(err => {
              if (process.env.PROD) logEvent(getAnalytics(), 'exception', {
                description: err,
                fatal: false
              })
              console.error(new Error('Oops, something went wrong: ' + err))
            })
          }
          user = docSnap.data()
            ? docSnap.data()
            : {
              name: '',
              email: '',
              photoURL: '',
              uid: ''
            }

          cleanedUser.lastVersion =
            user && user.lastVersion ? user.lastVersion : '0.0'
          // console.log(cleanedUser, user)
          cleanedUser.hideWhatsNew = user ? !!user.hideWhatsNew : false

          if (
            user.uid !== cleanedUser.uid ||
            user.name !== cleanedUser.displayName ||
            user.photoURL !== cleanedUser.photoURL ||
            user.email !== cleanedUser.email
          ) {
            user.uid = cleanedUser.uid
            user.name = cleanedUser.displayName
            user.photoURL = cleanedUser.photoURL
            user.email = cleanedUser.email

            updateDoc(doc(getFirestore(), `/app-users/${uid}`), user).catch(err => {
              if (process.env.PROD) logEvent(getAnalytics(), 'exception', {
                description: err,
                fatal: false
              })
              console.error(new Error('Oops, something went wrong: ' + err))
            })
          }
          // console.log(cleanedUser)
          commit('setUser', cleanedUser)
          commit('setNewVersion', cleanedUser.lastVersion)
          commit('setHideWhatsNew', cleanedUser.hideWhatsNew)
          commit('setUserLoadStatus', true)

          return true
        })
        .catch(err => {
          if (process.env.PROD) logEvent(getAnalytics(), 'exception', {
            description: err,
            fatal: false
          })
          console.error(new Error('Oops, something went wrong: ' + err))
        })
      commit('setUser', cleanedUser)
    } else {
      commit('setUser', {})
      commit('setUserLoadStatus', true)
    }
  })
}

export function updateUser ({ commit }, payload) {
  // console.log('upadting  user', payload)
  updateDoc(doc(getFirestore(), `app-users/${state.user.uid}`), {
    [payload.key]: payload.val
  })
    .then(res => {
      commit('setUserKey', payload)
      if (payload.analytics) {
        setUserProperties({
          [`user_${payload.key}`]: payload.val
        })
      }
      return true
    })
    .catch(err => {
      if (process.env.PROD) logEvent(getAnalytics(), 'exception', { description: err, fatal: false })
      console.error(new Error('Oops, something went wrong: ' + err))
    })
}

export function fetchVersionInfo ({ commit }, payload) {
  // payload should include
  // newVersion = the most recent versions to include
  // lastVersion = the earliest version to include
  return getDoc(
    query(
      collection(getFirestore(), '/version-info'),
      orderBy('version', 'desc'),
      where('version', '<=', payload.newVersion),
      where('version', '>=', payload.lastVersion)
    )
  )
    .then(snap => {
      // console.log(snap)
      const data = []
      snap.forEach(doc => {
        data.push(doc.data())
      })
      commit('setVersionInfo', data)
      return true
    })
    .catch(err => {
      if (process.env.PROD) logEvent(getAnalytics(), 'exception', { description: err, fatal: false })
      console.error(new Error('Oops, something went wrong: ' + err))
    })
}
