// import { $firebase, $firestore } from './../../data/firebase.js'

import {
  onSnapshot,
  query,
  collection,
  getFirestore,
  orderBy
} from "@firebase/firestore"
// import { getAnalytics } from '@firebase/analytics'

export function fetchEvents (context, payload) {
  // console.log(payload)
  let endDate = payload.endDate
  if (!endDate) {
    const today = new Date()
    endDate = today.setDate(today.getDate() + 7)
  }
  // console.log(new Date(endDate), new Date(payload.startDate))
  onSnapshot(
    query(
      collection(getFirestore(), `/movements/${payload.movId}/events`),
      orderBy('startDate')
      // .where(
      //   'startDate',
      //   '>=',
      //   $firebase.firestore.Timestamp.fromDate(payload.startDate)
      // )
      // .where(
      //   'startDate',
      //   '<=',
      //   $firebase.firestore.Timestamp.fromDate(new Date(endDate))
      // )
    ),
    snaps => {
      const events = {}

      for (const docRef of snaps.docs) {
        const startDate = docRef.get('startDate').toDate()
        const endDate = docRef.get('endDate').toDate()
        // console.log(docRef.get('startDate').toDate())
        const event = {
          ...docRef.data(),
          id: docRef.id,
          startDate: docRef.get('startDate').toDate(),
          endDate: docRef.get('endDate').toDate(),
          duration:
            (docRef.get('endDate').toDate() -
              docRef.get('startDate').toDate()) /
            60 /
            1000,
          timestamp: {
            date: `${String(startDate.getFullYear()).padStart(2, '0')}-${String(
              startDate.getMonth() + 1
            ).padStart(2, '0')}-${String(startDate.getDate()).padStart(
              2,
              '0'
            )}`,
            time: `${String(startDate.getHours()).padStart(2, '0')}:${String(
              startDate.getMinutes()
            ).padStart(2, '0')}`, // HH:MM (optional)
            year: startDate.getFullYear(), // YYYY
            month: startDate.getMonth() + 1, // MM (Jan = 1, etc)
            day: startDate.getDate(), // day of the month
            weekday: startDate.getDay(), // week day
            hour: startDate.getHours(), // 24-hr
            minute: startDate.getMinutes(), // mm
            day: false, // day of year
            workweek: false, // workweek number
            hasDay: true, // if this timestamp is supposed to have a date
            hasTime: true, // if this timestamp is supposed to have a time
            past: new Date() - endDate < 0, // if timestamp is in the past (based on `now` property)
            current: new Date() - startDate <= 0 && new Date() - endDate >= 0, // if timestamp is current date (based on `now` property)

            future: new Date() - startDate > 0, // if timestamp is in the future (based on `now` property)
            disabled: false // if timestamp is disabled
          }
        }
        // console.log(event)
        context.commit('setEvent', event)
      }
    }
  )
}
