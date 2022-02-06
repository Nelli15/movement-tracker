import firebase from "@firebase/app"
require("@firebase/firestore")

function copy (id, vue) {
  vue.copyLoading = true
  // console.log(id)
  var copyMovementV2 = firebase.functions().httpsCallable('copyMovementV2')
  copyMovementV2({ movementId: id })
    .then(() => {
      vue.copyLoading = false
      // vue.fetchMovements()
      vue.$q.notify({
        color: 'positive',
        textColor: 'white',
        icon: 'cloud_download',
        message: 'Movement Copied'
      })
      return true
    })
    .catch(err => {
      console.log(err)
      vue.copyLoading = false
      vue.$q.notify({
        color: 'negative',
        textColor: 'white',
        icon: 'error',
        message: 'Oops, Something went wrong!'
      })
    })
}

function carbonCopy (id, vue) {
  vue.carbonCopyLoading = true
  // console.log(id)
  var carbonCopyMovementV2 = firebase
    .functions()
    .httpsCallable('carbonCopyMovementV2')
  carbonCopyMovementV2({ movementId: id })
    .then(() => {
      vue.carbonCopyLoading = false
      // vue.fetchMovements()
      vue.$q.notify({
        color: 'positive',
        textColor: 'white',
        icon: 'cloud_download',
        message: 'Movement Copied'
      })
      return true
    })
    .catch(err => {
      console.log(err)
      vue.carbonCopyLoading = false
      vue.$q.notify({
        color: 'negative',
        textColor: 'white',
        icon: 'error',
        message: 'Oops, Something went wrong!'
      })
    })
}

function changeColor (id, newColor, vue) {
  firebase
    .firestore()
    .doc(`/movements/${id}`)
    .update({
      style: { backgroundColor: newColor },
      last_modified: firebase.firestore.Timestamp.now()
    })
    .then(() => {
      vue.$q.notify({
        color: 'positive',
        textColor: 'white',
        icon: 'cloud_download',
        message: 'Movement Updated'
      })
      return true
    })
    .catch(err => {
      console.log(err)
      vue.$q.notify({
        color: 'negative',
        textColor: 'white',
        icon: 'error',
        message: 'Oops, Something went wrong!'
      })
    })
}

function create (vue) {
  vue.$q.loading.show({
    message:
      'Your new Movement will be available in a moment<br/><span class="text-primary">Hang on...</span>'
  })
  vue.createLoading = true
  // vue.$toasted.global.toast_success('We are building the Movement, vue may take a moment!')
  var createMovementV2 = firebase.functions().httpsCallable('createMovementV2')
  createMovementV2()
    .then(res => {
      // console.log(res);
      // vue.$toasted.global.toast_success('Movement Created Successfully!')
      // vue.$router.push({ path: `/movement//${res.data.movementId}` })
      vue.createLoading = false
      vue.$q.loading.hide()
      vue.$q.notify({
        color: 'positive',
        textColor: 'white',
        icon: 'cloud_download',
        message: 'Movement Created'
      })
      return true
    })
    .catch(err => {
      console.log(err)
      vue.createLoading = false
      vue.$q.loading.hide()
      vue.$q.notify({
        color: 'negative',
        textColor: 'white',
        icon: 'error',
        message: 'Oops, Something went wrong!'
      })
      // vue.$toasted.global.toast_error('Oops, ' + err)
    })
}
function rename (id, newName, vue) {
  firebase
    .firestore()
    .doc(`/movements/${id}`)
    .update({
      name: newName,
      last_modified: firebase.firestore.Timestamp.now()
    })
    .then(() => {
      vue.$q.notify({
        color: 'positive',
        textColor: 'white',
        icon: 'cloud_download',
        message: 'Movement Updated'
      })
      return true
    })
    .catch(err => {
      console.log(err)
      vue.$q.notify({
        color: 'negative',
        textColor: 'white',
        icon: 'error',
        message: 'Oops, Something went wrong!'
      })
    })
}
function remove (id, vue) {
  // if (vue.confirmDelete === 'DELETE') {
  vue.removeLoading = true
  vue.$q.loading.show({
    message:
      'Deleteing Movement<br/><span class="text-primary">Hang on...</span>'
  })
  // console.log(`/movements/${vue.$route.params.movementId}`)
  // console.log(vue.movement)
  firebase
    .firestore()
    .doc(`/movements/${id}`)
    .delete()
    .then(() => {
      // console.log(res);
      // vue.$toasted.global.toast_success('Movement Deleted Successfully!')
      // vue.confirmDelete = ''
      vue.$store.commit('removeMovement', id)
      vue.removeLoading = false
      vue.$q.loading.hide()
      vue.$q.notify({
        color: 'positive',
        textColor: 'white',
        icon: 'cloud_download',
        message: 'Movement Deleted'
      })
      vue.$router.push('/app/home')
      // this.$router.push('/app/home')
      return true
    })
    .catch(err => {
      console.log(err)
      vue.removeLoading = false
      vue.$q.loading.hide()
      vue.$q.notify({
        color: 'negative',
        textColor: 'white',
        icon: 'error',
        message: 'Oops, Something went wrong!'
      })
      // vue.$toasted.global.toast_error('Oops, ' + err)
    })
  // } else {
  //   // vue.$toasted.global.toast_error("Unable to Delete Movement, Please check you typed 'DELETE'")
  // }
}
function color (movement) {
  if (movement) {
    // console.log(vue.movement.style)
    if (movement.style) {
      if (movement.style.backgroundColor) {
        let r = 0,
          g = 0,
          b = 0,
          h = movement.style.backgroundColor
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
function backgroundColor (movement) {
  // console.log(vue.movement.style.backgroundColor)
  if (movement) {
    if (movement.style) {
      if (movement.style.backgroundColor) {
        if (
          movement.style.backgroundColor === '#FFFFFF' ||
          movement.style.backgroundColor === '#ffffff' ||
          movement.style.backgroundColor === 'white'
        ) {
          return '#007bff'
        }
        return movement.style.backgroundColor
      }
    }
  }
  return '#007bff'
}

export {
  create,
  copy,
  carbonCopy,
  changeColor,
  rename,
  remove,
  color,
  backgroundColor
}
