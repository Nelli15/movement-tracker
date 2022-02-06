
import { httpsCallable, getFunctions } from '@firebase/functions'
import { updateDoc, doc, getFirestore, serverTimestamp, deleteDoc } from "@firebase/firestore"
import { logEvent, getAnalytics } from '@firebase/analytics'
import { Notify, Loading } from 'quasar'
import {getAuth} from '@firebase/auth'
// import { getFirestore } from "@firebase/firestore";

export function copy (id) {
  // vue.copyLoading = true
  // Loading.show()
  // console.log(id)
  var copyMovement = httpsCallable(
    getFunctions(),
    'mt-movements-copy'
  )
  copyMovement({ movId: id })
    .then(() => {
      // Loading.hide()
      // vue.fetchMovements()
      Notify.create({
        color: 'positive',
        textColor: 'white',
        icon: 'cloud_download',
        message: 'Movement Copied'
      })
      if (process.env.PROD) logEvent(getAnalytics(), 'movement_copied')
      return true
    })
    .catch(err => {
      if (process.env.PROD) logEvent(getAnalytics(), 'exception', { description: err, fatal: false })
      console.error(new Error('Oops, something went wrong: ' + err))
      // vue.copyLoading = false
      // Loading.hide()
      Notify.create({
        color: 'negative',
        textColor: 'white',
        icon: 'error',
        message: 'Oops, Something went wrong!'
      })
    })
}

export function carbonCopy (id) {
  // Loading.show()
  // console.log(id)
  var carbonCopyMovement = httpsCallable(
    getFunctions(),
    'mt-movements-carbonCopy'
  )
  carbonCopyMovement({ movId: id })
    .then(() => {
      // Loading.hide()
      // vue.fetchMovements()
      Notify.create({
        color: 'positive',
        textColor: 'white',
        icon: 'cloud_download',
        message: 'Movement Copied'
      })
      if (process.env.PROD) logEvent(getAnalytics(), 'movement_carbon_copied')
      return true
    })
    .catch(err => {
      if (process.env.PROD) logEvent(getAnalytics(), 'exception', { description: err, fatal: false })
      console.error(new Error('Oops, something went wrong: ' + err))
      // Loading.hide()
      Notify.create({
        color: 'negative',
        textColor: 'white',
        icon: 'error',
        message: 'Oops, Something went wrong!'
      })
    })
}

export function changeColor (id, newColor) {
  // Loading.show()
  updateDoc(doc(getFirestore(), `/movements/${id}`), {
    style: { backgroundColor: newColor },
    last_modified: serverTimestamp(),
    uid: getAuth().currentUser.uid
  })
    .then(() => {
      // Loading.hide()
      Notify.create({
        color: 'positive',
        textColor: 'white',
        icon: 'cloud_download',
        message: 'Movement Updated'
      })
      if (process.env.PROD) logEvent(getAnalytics(), 'movement_color_changed')
      return true
    })
    .catch(err => {
      if (process.env.PROD) logEvent(getAnalytics(), 'exception', { description: err, fatal: false })
      console.error(new Error('Oops, something went wrong: ' + err))
      Notify.create({
        color: 'negative',
        textColor: 'white',
        icon: 'error',
        message: 'Oops, Something went wrong!'
      })
    })
}

export async function create () {
  var createMovement = httpsCallable(
    getFunctions(),
    'mt-movements-create'
  )
  return createMovement()
    .then(res => {
      if (process.env.PROD) logEvent(getAnalytics(), 'movement_created')
      return true
    })
    .catch(err => {
      if (process.env.PROD) logEvent(getAnalytics(), 'exception', { description: err, fatal: false })
      console.error(new Error('Oops, something went wrong: ' + err))
      return false
    })
}
export function rename (id, newName) {
  updateDoc(doc(getFirestore(), `/movements/${id}`), {
    name: newName,
    last_modified: serverTimestamp(),
    uid: getAuth().currentUser.uid
  })
    .then(() => {
      // Loading.hide()
      Notify.create({
        color: 'positive',
        textColor: 'white',
        icon: 'cloud_download',
        message: 'Movement Updated'
      })
      if (process.env.PROD) logEvent(getAnalytics(), 'movement_renamed')
      return true
    })
    .catch(err => {
      // Loading.hide()
      if (process.env.PROD) logEvent(getAnalytics(), 'exception', { description: err, fatal: false })
      console.error(new Error('Oops, something went wrong: ' + err))
      Notify.create({
        color: 'negative',
        textColor: 'white',
        icon: 'error',
        message: 'Oops, Something went wrong!'
      })
    })
}

export function remove (id) {
  // if (vue.confirmDelete === 'DELETE') {
  Loading.show({
    message:
      'Deleteing Movement<br/><span class="text-primary">Hang on...</span>'
  })
  deleteDoc(doc(getFirestore(), `/movements/${id}`))
    .then(() => {
      Loading.hide()
      Notify.create({
        color: 'positive',
        textColor: 'white',
        icon: 'cloud_download',
        message: 'Movement Deleted'
      })
      if (process.env.PROD) logEvent(getAnalytics(), 'movement_deleted')
      return true
    })
    .catch(err => {
      if (process.env.PROD) logEvent(getAnalytics(), 'exception', { description: err, fatal: false })
      console.error(new Error('Oops, something went wrong: ' + err))
      Loading.hide()
      Notify.create({
        color: 'negative',
        textColor: 'white',
        icon: 'error',
        message: 'Oops, Something went wrong!'
      })
    })
}
export function color (movement) {
  if (movement) {
    if (movement.style) {
      if (movement.style.backgroundColor) {
        let r = 0,
          g = 0,
          b = 0
        const h = movement.style.backgroundColor
        // console.log(h.length)
        if (h.length === 7) {
          r = parseInt(h[1] + h[2], 16)
          g = parseInt(h[3] + h[4], 16)
          b = parseInt(h[5] + h[6], 16)
        }
        var percent = (100 * (r / 255 + g / 255 + b / 255)) / 3
        // console.log(percent)
        // var percent = vue.hexToPercent()
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
}
export function backgroundColor (movement) {
  // console.log(vue.movement.style.backgroundColor)
  if (movement) {
    if (movement.style) {
      if (movement.style.backgroundColor) {
        // if (movement.style.backgroundColor === '#FFFFFF' || movement.style.backgroundColor === '#ffffff' || movement.style.backgroundColor === 'white') {
        //   return '#007bff'
        // }
        return movement.style.backgroundColor
      }
    }
  }
  return '#007bff'
}

export default {
  create,
  copy,
  carbonCopy,
  changeColor,
  rename,
  remove,
  color,
  backgroundColor
}
