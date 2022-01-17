import {
  addDoc,
  collection,
  getFirestore,
  doc,
  deleteDoc
} from "@firebase/firestore"
import { getAnalytics, logEvent } from '@firebase/analytics'

export function saveGraph (movId, userId, details) {
  // console.log()
  details.fromDate = new Date()
  details.toDate = new Date()
  return addDoc(
    collection(getFirestore(), `/movements/${movId}/users/${userId}/graphs`),
    details
  ).catch(err => {
    if (process.env.PROD) logEvent(getAnalytics(), 'exception', { description: err, fatal: false })
    console.error(new Error('Oops, something went wrong: ' + err))
  })
}

export function uploadGraph (movId, graph) {
  return addDoc(
    collection(getFirestore(), `/movements/${movId}/graphs`),
    graph
  ).catch(err => {
    if (process.env.PROD) logEvent(getAnalytics(), 'exception', { description: err, fatal: false })
    console.error(new Error('Oops, something went wrong: ' + err))
  })
}

export function deleteGraph (movId, userId, graphId) {
  return deleteDoc(
    doc(getFirestore(), `/movements/${movId}/users/${userId}/graphs/${graphId}`)
  ).catch(err => {
    if (process.env.PROD) logEvent(getAnalytics(), 'exception', { description: err, fatal: false })
    console.error(new Error('Oops, something went wrong: ' + err))
  })
}

export function deleteMovementGraph (movId, graphId) {
  return deleteDoc(
    doc(getFirestore(), `/movements/${movId}/graphs/${graphId}`)
  ).catch(err => {
    if (process.env.PROD) logEvent(getAnalytics(), 'exception', { description: err, fatal: false })
    console.error(new Error('Oops, something went wrong: ' + err))
  })
}
