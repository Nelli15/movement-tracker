const admin = require('firebase-admin')

var serviceAccount = require('./serviceAccount.json')

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://tracking-tree.firebaseio.com'
  })
}

exports.movementtracker = require('./src/movementtracker')
// exports.organisations = require('./src/organisations')
