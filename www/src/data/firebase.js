import firebase from "@firebase/app"
require("@firebase/firestore")
// require('@firebase/messaging')
// require('@firebase/auth')
require('@firebase/remote-config')

const config = require('./../../../fbConfig.json')

firebase.initializeApp(config)

const remoteConfig = firebase.remoteConfig()
remoteConfig.settings = {
  minimumFetchIntervalMillis: process.env.PROD ? 3600000 : 60000
}

remoteConfig.defaultConfig = {
  home_image_url: '{"400":"https://firebasestorage.googleapis.com/v0/b/tracking-tree.appspot.com/o/public%2Fbackgrounds%2Flandscape%203%2Fhome-background-400.jpg?alt=media&token=fffa3227-b7b1-494d-83b3-7d2d7d323f79","1050":"https://firebasestorage.googleapis.com/v0/b/tracking-tree.appspot.com/o/public%2Fbackgrounds%2Flandscape%203%2Fhome-background-1050.jpg?alt=media&token=1bbcb78c-8825-4d6d-90e0-13dac614e2c3","1300":"https://firebasestorage.googleapis.com/v0/b/tracking-tree.appspot.com/o/public%2Fbackgrounds%2Flandscape%203%2Fhome-background-1300.jpg?alt=media&token=4ccb592e-afd6-4ba4-a30b-3891205fb70b","1400":"https://firebasestorage.googleapis.com/v0/b/tracking-tree.appspot.com/o/public%2Fbackgrounds%2Flandscape%203%2Fhome-background-1400.jpg?alt=media&token=e96dc45b-dcf7-4b0d-9d9d-cab454b09ccc","2000":"https://firebasestorage.googleapis.com/v0/b/tracking-tree.appspot.com/o/public%2Fbackgrounds%2Flandscape%203%2Fhome-background-2000.jpg?alt=media&token=b4102ec5-df14-4557-aff4-b26f10dfaae4","4000":"https://firebasestorage.googleapis.com/v0/b/tracking-tree.appspot.com/o/public%2Fbackgrounds%2Flandscape%203%2Fhome-background-4000.jpg?alt=media&token=47674935-4400-4c6f-b0b9-9177979cc057"}',
  home_image_url_portrait: '{"400":"https://firebasestorage.googleapis.com/v0/b/tracking-tree.appspot.com/o/public%2Fbackgrounds%2Fportrait%202%2Fkaty-anne-nTP8aZjedqI-unsplash-400_x_599.jpg?alt=media&token=eb0e90be-78cd-45f7-b4f1-7be42e9bcf3e","1050":"https://firebasestorage.googleapis.com/v0/b/tracking-tree.appspot.com/o/public%2Fbackgrounds%2Fportrait%202%2Fkaty-anne-nTP8aZjedqI-unsplash-1050_x_1574.jpg?alt=media&token=7fe426f6-96d2-4c76-89dd-f0677479d6f7","1300":"https://firebasestorage.googleapis.com/v0/b/tracking-tree.appspot.com/o/public%2Fbackgrounds%2Fportrait%202%2Fkaty-anne-nTP8aZjedqI-unsplash-1300_x_1950.jpg?alt=media&token=763e7c7e-cd59-432f-9fec-e83eaf0e2694","1400":"https://firebasestorage.googleapis.com/v0/b/tracking-tree.appspot.com/o/public%2Fbackgrounds%2Fportrait%202%2Fkaty-anne-nTP8aZjedqI-unsplash-1400_x_2100.jpg?alt=media&token=939b6c23-fb7f-4e82-8c4f-5a09e7f0dc7a","2000":"https://firebasestorage.googleapis.com/v0/b/tracking-tree.appspot.com/o/public%2Fbackgrounds%2Fportrait%202%2Fkaty-anne-nTP8aZjedqI-unsplash-2000_x_2999.jpg?alt=media&token=d32f81c0-1f7b-4d19-946d-538e90b355d4","4000":"https://firebasestorage.googleapis.com/v0/b/tracking-tree.appspot.com/o/public%2Fbackgrounds%2Fportrait%202%2Fkaty-anne-nTP8aZjedqI-unsplash-4000_x_5999.jpg?alt=media&token=288d25d8-f420-45d6-a44f-28de00e0bc94"}',
  logo_image_url: '/statics/app-logo-128x128.png'
}
remoteConfig.fetchAndActivate().catch(err => console.log(err))

firebase.firestore().enablePersistence()
  .catch(function (err) {
    if (err.code === 'failed-precondition') {
      // Multiple tabs open, persistence can only be enabled
      // in one tab at a a time.
      // ...
      console.error(err)
    } else if (err.code === 'unimplemented') {
      // The current browser does not support all of the
      // features required to enable persistence
      // ...
      console.error(err)
    }
  })

export default {
  $firebase: firebase,
  $db: firebase.firestore(),
  // $auth: firebase.auth,
  $remote: remoteConfig
  // $functions: firebase.functions()
  // messaging: firebase.messaging()
}
