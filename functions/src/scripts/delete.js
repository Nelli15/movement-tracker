exports.deleteCollection = function (db, collectionPath, batchSize) {
  var collectionRef = db.collection(collectionPath)
  var query = collectionRef.orderBy('__name__').limit(batchSize)

  return new Promise((resolve, reject) => {
    deleteQueryBatch(db, query, batchSize, resolve, reject)
  })
}

const deleteQueryBatch = function (db, query, batchSize, resolve, reject) {
  query.get()
    .then((snapshot) => {
      // When there are no documents left, we are done
      if (snapshot.size === 0) {
        return resolve(false)
      }

      // Delete documents in a batch
      var batch = db.batch()
      snapshot.docs.forEach((doc) => {
        batch.delete(doc.ref)
      })

      return batch.commit()
    }).then((snapshot) => {
      return snapshot.size
    }).then((numDeleted) => {
      if (numDeleted === 0) {
        return resolve(true)
      }

      // Recurse on the next process tick, to avoid
      // exploding the stack.
      process.nextTick(() => {
        deleteQueryBatch(db, query, batchSize, resolve, reject)
      })
      return resolve(true)
    })
    .catch(reject)
}

exports.deleteQueryBatch = this.deleteQueryBatch
