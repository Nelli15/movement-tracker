const functions = require('firebase-functions')
const admin = require('firebase-admin')
var db = getFirestore()

exports.onCreate = functions.firestore.document('/organisations/{organisationId}/organisation_stats/{statId}')
  .onCreate(async (doc, context) => {
    // add the stat to the LUT and look for all relevent movement stats
    console.log('Organisation: ' + context.params.organisationId)
    const newLUT = doc.data()
    const LUTdata = {}
    const statsLUTsRef = db.doc(`organisations/${context.params.organisationId}/organisation_stats/LUTs`)

    // get all the movements
    const movementsSnap = await db.collection(`organisations/${context.params.organisationId}/organisation_movements`).get()

    if (!movementsSnap.empty) {
      console.log(`checking ${movementsSnap.size} movements`)
      // find all movement stats with the same name
      for (ii in movementsSnap.docs) {
        const movement = movementsSnap.docs[ii]
        const data = movement.data()
        for (iii in data.stats) {
          if (data.stats[iii].label.toLowerCase() === newLUT.label.toLowerCase()) {
            // add the stats to the LUT data assume they are correct
            LUTdata[movement.id] = data.stats[iii].id
            newLUT[movement.id] = data.stats[iii]
          }
        }
      }
    }

    // add the new LUT data to the LUTs Doc
    statsLUTsRef.update({ [doc.id]: LUTdata }).catch(err => {
      console.error(err)
    })

    // add the new stats to the stat
    doc.ref.update(newLUT).catch(err => {
      console.error(err)
    })
  })

exports.updateLUT = functions.https.onCall((data, context) => {
  // recieves data = {
  // orgId: string <-- id of the organisation to update
  // orgStat: string <-- id of the organisation stat to update
  // newMovStat: string <-- id of the statistic from the movement to change it to
  // movId: string <-- id of the linked movement to change
  // }

  console.log('Updating LUT: ', data)
  // console.log(`/organisations/${data.orgId}/organisation_stats/${data.orgStat}`)
  const statRef = db.doc(`/organisations/${data.orgId}/organisation_stats/${data.orgStat}`)
  const LUTsRef = db.doc(`/organisations/${data.orgId}/organisation_stats/LUTs`)
  const movRef = db.doc(`/organisations/${data.orgId}/organisation_movements/${data.movId}`)

  return db.runTransaction(async (transaction) => {
    const movDoc = await transaction.get(movRef)
    // console.log(movDoc.get('stats')[data.newMovStat])
    const LUTField = `${data.orgStat}.${data.movId}`
    transaction.update(LUTsRef, { [LUTField]: data.newMovStat })
    transaction.update(statRef, { [data.movId]: movDoc.get('stats')[data.newMovStat] })
  }).then(res => {
    if (res) {
      console.log('Transaction successfully committed!')
      // console.log(newMovementRef.id)
      return true
    }
  }).catch((error) => {
    console.log(new Error('Transaction failed: ', error))
  })
})
