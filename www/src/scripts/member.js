import firebase from "@firebase/app"
require("@firebase/firestore")
function copy (member, movementId, vue) {
  firebase.firestore().collection(`/movements/${movementId}/members/`).doc()
    .set(member).then(() => {
      vue.$q.notify({
        color: 'positive',
        textColor: 'white',
        icon: 'cloud_download',
        message: 'Member Copied'
      })
      return true
    }).catch((err) => {
      console.log('Oops, something went wrong: ' + err)
      vue.$q.notify({
        color: 'negative',
        textColor: 'white',
        icon: 'error',
        message: 'Oops, Something went wrong!'
      })
    })
}

function updateParent (event, vue) {
  console.log({ parentKey: vue.currentMember.parent, childKey: vue.currentMember.id })
  // vue.deleteNodeByKey(vue.tree, vue.currentMember.id, event.value)
  vue.updateMember({ key: 'parent', memberId: vue.currentMember.id, value: event.value })
}
// function addOverrideStyle (event) {
//   var array = vue.currentMember.overrideStyles.filter(val => { console.log(val, event); return val !== event })
//   array.push(event)
//   console.log(array)
//   vue.updateMember({ key: 'overrideStyles', memberId: vue.currentMember.id, value: array })
// }
// function removeOverrideStyle (event) {
//   // var array = vue.currentMember.overrideStyles
//   var array = vue.currentMember.overrideStyles.filter(val => { console.log(val, event); return val !== event })
//   // console.log(array)
//   vue.updateMember({ key: 'overrideStyles', memberId: vue.currentMember.id, value: array })
// }
function remove (movementId, memberId, vue) {
  vue.removeMemberLoading = true
  // if (vue.currentMember.name <= '') {
  //   // vue.$toasted.global.toast_error('Creation Failed! Missing Name field')
  // } else {
  // vue.confirmDelete = false
  console.log('Deleting Member', `/movements/${movementId}/members/${memberId}`)
  firebase.firestore().doc(`/movements/${movementId}/members/${memberId}`).delete()
    .then((res) => {
      // console.log(res)
      vue.deleteDialog = false
      vue.removeMemberLoading = false
      vue.$q.notify({
        color: 'positive',
        textColor: 'white',
        icon: 'cloud_download',
        message: 'Member Deleted'
      })
      return true
    }).catch((err) => {
      console.log('Error Deleting Member', err)
      vue.removeMemberLoading = false
      vue.$q.notify({
        color: 'negative',
        textColor: 'white',
        icon: 'error',
        message: 'Oops, Something went wrong!'
      })
    // vue.$toasted.global.toast_error(`Edit Failed! ${err}`)
    })
  // }
}

export { copy, updateParent, remove }
