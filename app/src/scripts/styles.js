import {
  getFirestore,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  collection
} from "@firebase/firestore"
import { getAnalytics, logEvent } from '@firebase/analytics'

export function addStyle (movId, type) {
  const data = {
    label: '*A Untitled Style',
    desc: '',
    type: type
  }
  if (type === 'complex') {
    data.condition = {
      class: 'expression',
      operator: 'AND',
      elements: []
    }
  } else if (type === 'role') {
    data.style = {
      background: '#FFFFFF',
      color: '#000000',
      outline: '#FFFFFF',
      round: false,
      underline: false
    }
  } else if (type === 'mod') {
    data.icon = ''
    data.style = {
      background: '#FFFFFF',
      backgroundOverride: false,
      color: '#000000',
      colorOverride: false,
      outline: '#FFFFFF',
      outlineOverride: false,
      prepend: false,
      round: false,
      underline: false
    }
  } else if (type === 'calc') {
    data.unit = 0
    data.target = 0
    data.condition = {
      class: 'expression',
      operator: 'plus',
      elements: []
    }
  }
  console.log(data)
  return addDoc(collection(getFirestore(), `/movements/${movId}/styles`), data)
    .then(() => {
      if (process.env.PROD) logEvent(getAnalytics(), 'style_created', { type: type })
      return true
    })
    .catch(err => {
      if (process.env.PROD) logEvent(getAnalytics(), 'exception', { description: err, fatal: false })
      console.error(new Error('Oops, something went wrong: ' + err))
    })
}
export function updateStyleByKey (movId, styleId, key, val) {
  // console.log(movId, styleId, ksey, val)
  return updateDoc(
    doc(getFirestore(), `/movements/${movId}/styles/${styleId}`),
    { [key]: val }
  )
    .then(() => {
      if (process.env.PROD) logEvent(getAnalytics(), 'style_edited')
      return true
    })
    .catch(err => {
      if (process.env.PROD) logEvent(getAnalytics(), 'exception', { description: err, fatal: false })
      console.error(new Error('Oops, something went wrong: ' + err))
    })
}

export function copyStyle (movId, style) {
  return addDoc(collection(getFirestore(), `/movements/${movId}/styles`), style)
    .then(() => {
      if (process.env.PROD) logEvent(getAnalytics(), 'style_duplicated')
      return true
    })
    .catch(err => {
      if (process.env.PROD) logEvent(getAnalytics(), 'exception', { description: err, fatal: false })
      console.error(new Error('Oops, something went wrong: ' + err))
    })
}

export function deleteStyle (movId, styleId) {
  // console.log(role);
  return deleteDoc(doc(getFirestore(), `/movements/${movId}/styles/${styleId}`))
    .then(() => {
      if (process.env.PROD) logEvent(getAnalytics(), 'style_deleted')
      return true
    })
    .catch(err => {
      if (process.env.PROD) logEvent(getAnalytics(), 'exception', { description: err, fatal: false })
      console.error(new Error('Oops, something went wrong: ' + err))
    })
}

export function saveStyle (movId, uid, style) {
  return updateDoc(
    doc(getFirestore(), `/movements/${movId}/styles/${style.id}`),
    {
      label: style.label,
      desc: style.desc,
      target: style.target ? style.target : 0
    }
  )
    .then(() => {
      if (process.env.PROD) logEvent(getAnalytics(), 'style_edited')
      return true
    })
    .catch(err => {
      if (process.env.PROD) logEvent(getAnalytics(), 'exception', { description: err, fatal: false })
      console.error(new Error('Oops, something went wrong: ' + err))
    })
}
