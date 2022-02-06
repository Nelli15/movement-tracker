
const functions = require("firebase-functions");
const admin = require("firebase-admin");

const environment = require("./src/environments/environment.js");

var serviceAccount = require('./../serviceAccount.json')

// if(process.env.prod) {
// serviceAccount = require('./../serviceAccount.json')
// } else {
//   serviceAccount = require('./../serviceAccount-test.json')
// }

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://tracking-tree.firebaseio.com'
  })
}

exports.mt = require('./src/movementtracker')
// exports.organisations = require('./src/organisations')
const context = {
  admin,
  environment
};