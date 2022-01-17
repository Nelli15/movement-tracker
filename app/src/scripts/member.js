import { getFirestore, collection, addDoc, deleteDoc, setDoc, doc, arrayUnion } from "@firebase/firestore"
import { getAnalytics, logEvent } from '@firebase/analytics'
import { getFunctions, httpsCallable } from "firebase/functions";
import { Notify, Loading } from 'quasar'

export async function add (newMember, movId, treeId = null, parent, shadow) {
  if (treeId) {
  newMember.trees = [treeId.id]
  // console.log(newMember, movId, treeId, parent)
  }
  try {
    
    return addDoc(
      collection(getFirestore(), `/movements/${movId}/members`),
      newMember
    ).then(async res => {
      if (treeId) {
        if(!shadow) {
        return await setDoc(doc(getFirestore(), `/movements/${movId}/trees/${treeId.id}/components/parents`), { [res.id]: {parent} }, {merge: true})
        } else {
          return await setDoc(doc(getFirestore(), `/movements/${movId}/trees/${treeId.id}/components/parents`), { [res.id]: {shadow: arrayUnion(parent)} }, {merge: true})
        }
      }
      return true
    }).then(() => true).catch ((err) =>{
      console.error(err)
    if (process.env.PROD) logEvent(getAnalytics(), 'exception', { description: err, fatal: false })
    console.error(new Error('Oops, something went wrong: ' + err))
    return false
  })
  } catch (err) {
    if (process.env.PROD) logEvent(getAnalytics(), 'exception', { description: err, fatal: false })
    console.error(new Error('Oops, something went wrong: ' + err))
    return false
  }
}

// export function copy (member, movId, vue, treeId = null, parent) {
//     if (treeId) {
//   newMember.trees = [treeId.id]
//   // console.log(newMember, movId, treeId, parent)
//   }
//   member.name = 'Copy of ' + member.name
//   if (!member.notes) {
//     member.notes = ''
//   }
//   member.uid = getAuth().currentUser.uid

//   addDoc(collection(getFirestore(), `/movements/${movId}/members`), member)
//     .then(async res => {
//       if (treeId) {
//       return await setDoc(doc(getFirestore(), `/movements/${movId}/trees/${treeId.id}/components/parents`), { [res.id]: {parent} }, {merge: true})
//       }
//       return true
//     }).then(() => {
//       Notify.create({
//         color: 'positive',
//         textColor: 'white',
//         icon: 'cloud_download',
//         message: 'Member Copied'
//       })
//       if (process.env.PROD) logEvent(getAnalytics(), 'member_copied')
//       return true
//     })
//     .catch(err => {
//       if (process.env.PROD) logEvent(getAnalytics(), 'exception', { description: err, fatal: false })
//       console.error(new Error('Oops, something went wrong: ' + err))
//       Notify.create({
//         color: 'negative',
//         textColor: 'white',
//         icon: 'error',
//         message: 'Oops, Something went wrong!'
//       })
//     })
// }

export function copy (memberId, movId) {
const copyMember = httpsCallable(getFunctions(), 'movementtracker-members-copy');
  copyMember({ memberId, movId }).then(res => {
      Notify.create({
        color: 'positive',
        textColor: 'white',
        icon: 'cloud_download',
        message: 'Member Copied'
      })
      if (process.env.PROD) logEvent(getAnalytics(), 'member_copied')
      return true
    })
    .catch(err => {
      console.log('Error Copying Member', err)
      Notify.create({
        color: 'negative',
        textColor: 'white',
        icon: 'error',
        message: 'Oops, Something went wrong!'
      })
    })
}

export function updateParent (event, vue) {
  // console.log({ parentKey: vue.currentMember.parent, childKey: vue.currentMember.id })
  // vue.deleteNodeByKey(vue.tree, vue.currentMember.id, event.value)
  vue.updateMember({
    key: 'parent',
    memberId: vue.currentMember.id,
    value: event.value
  })
}
// function addOverrideStyle (event) {
//   var array = vue.currentMember.mods.filter(val => { console.log(val, event); return val !== event })
//   array.push(event)
//   console.log(array)
//   vue.updateMember({ key: 'mods', memberId: vue.currentMember.id, value: array })
// }
// function removeOverrideStyle (event) {
//   // var array = vue.currentMember.mods
//   var array = vue.currentMember.mods.filter(val => { console.log(val, event); return val !== event })
//   // console.log(array)
//   vue.updateMember({ key: 'mods', memberId: vue.currentMember.id, value: array })
// }
export function remove (movId, memberId, vue) {
  // vue.removeMemberLoading = true
  // Loading.show()
  // if (vue.currentMember.name <= '') {
  //   // vue.$toasted.global.toast_error('Creation Failed! Missing Name field')
  // } else {
  // vue.confirmDelete = false
  // console.log('Deleting Member', `/movements/${movId}/members/${memberId}`)
  deleteDoc(doc(getFirestore(), `/movements/${movId}/members/${memberId}`))
    .then(res => {
      // console.log(res)
      vue.deleteDialog = false
      Loading.hide()
      Notify.create({
        color: 'positive',
        textColor: 'white',
        icon: 'cloud_download',
        message: 'Member Deleted'
      })
      if (process.env.PROD) logEvent(getAnalytics(), 'member_deleted')
      return true
    })
    .catch(err => {
      console.log('Error Deleting Member', err)
      Loading.hide()
      Notify.create({
        color: 'negative',
        textColor: 'white',
        icon: 'error',
        message: 'Oops, Something went wrong!'
      })
      // vue.$toasted.global.toast_error(`Edit Failed! ${err}`)
    })
  // }
}

// The following functions are duplicates of ./functions/src/scripts/member.js
// export async function getDisplayData (member, styles) {
//   // determine appropriate styles
//   member.display = {
//     label: getLabel(member, styles),
//     background: getBackground(member, styles),
//     color: getColor(member, styles),
//     outline: getOutline(member, styles),
//     underline: checkUnderline(member, styles),
//     shape: checkShape(member, styles)
//   }
//   return member
// }

// export function getBackground (member, styles) {
//   // set background color

//   if (member.mods) {
//     if (!Array.isArray(member.mods)) {
//       member.mods = [member.mods]
//     }
//     for (var key in member.mods) {
//       if (typeof styles[member.mods[key]] === 'object') {
//         if (styles[member.mods[key]].style) {
//           if (
//             styles[member.mods[key]].style.backgroundOverride === true
//           ) {
//             return styles[member.mods[key]].style.background
//           }
//         }
//       }
//     }
//   }
//   if (member.role > '') {
//     if (typeof styles[member.role] === 'object') {
//       if (styles[member.role].style) {
//         return styles[member.role].style.background
//       }
//     }
//   }
//   return 'white'
// }

// export function getColor (member, styles) {
//   // set text color
//   if (!Array.isArray(member.mods)) {
//     member.mods = [member.mods]
//   }
//   for (var key in member.mods) {
//     if (typeof styles[member.mods[key]] === 'object') {
//       if (styles[member.mods[key]].style.colorOverride === true) {
//         return styles[member.mods[key]].style.color
//       }
//     }
//   }
//   if (member.role > '') {
//     if (typeof styles[member.role] === 'object') {
//       return styles[member.role].style.color
//     }
//   }
//   return 'black'
// }

// export function getOutline (member, styles) {
//   // set border color
//   if (!Array.isArray(member.mods)) {
//     member.mods = [member.mods]
//   }
//   for (var key in member.mods) {
//     if (typeof styles[member.mods[key]] === 'object') {
//       if (styles[member.mods[key]].style.outlineOverride === true) {
//         return styles[member.mods[key]].style.outline
//       }
//     }
//   }
//   if (member.role && member.role > '') {
//     if (typeof styles[member.role] === 'object') {
//       return styles[member.role].style.outline
//     }
//   }
//   return 'white'
// }

// export function checkUnderline (member, styles) {
//   if (!Array.isArray(member.mods)) {
//     member.mods = [member.mods]
//   }
//   for (var key in member.mods) {
//     if (typeof styles[member.mods[key]] === 'object') {
//       if (styles[member.mods[key]].style.underlineOverride === true) {
//         return styles[member.mods[key]].style.underline
//       }
//     }
//   }
//   if (member.role && member.role > '') {
//     if (typeof styles[member.role] === 'object') {
//       return styles[member.role].style.underline
//     }
//   }
//   return false
// }

// export function checkShape (member, styles) {
//   if (!Array.isArray(member.mods)) {
//     member.mods = [member.mods]
//   }
//   for (var key in member.mods) {
//     if (typeof styles[member.mods[key]] === 'object') {
//       if (styles[member.mods[key]].style.shapeOverride === true) {
//         if (styles[member.mods[key]].style.shape) {
//           return styles[member.mods[key]].style.shape
//         }
//       }
//       if (styles[member.mods[key]].style.roundOverride === true) {
//         if (styles[member.mods[key]].style.round === true) {
//           return 'round'
//         }
//       }
//     }
//   }
//   if (member.role && member.role > '') {
//     if (typeof styles[member.role] === 'object') {
//       if (styles[member.role].style.shape) {
//         return styles[member.role].style.shape
//       }
//       if (styles[member.role].style.round) {
//         return 'round'
//       }
//     }
//   }
//   return 'not-round'
// }

// export function getLabel (member, styles) {
//   var res = ''
//   if (!Array.isArray(member.mods)) {
//     member.mods = [member.mods]
//   }
//   let spaceAdded = false
//   for (var key in member.mods) {
//     if (typeof styles[member.mods[key]] === 'object') {
//       if (styles[member.mods[key]].icon > '') {
//         if (styles[member.mods[key]].style.prepend === true) {
//           if (!spaceAdded) {
//             res += ' '
//             spaceAdded = true
//           }
//           res += `[${styles[member.mods[key]].icon}] `
//         }
//       }
//     }
//   }
//   res += member.name
//   spaceAdded = false
//   for (key in member.mods) {
//     if (typeof styles[member.mods[key]] === 'object') {
//       if (styles[member.mods[key]].icon > '') {
//         if (!styles[member.mods[key]].style.prepend) {
//           if (!spaceAdded) {
//             res += ' '
//             spaceAdded = true
//           }
//           res += `[${styles[member.mods[key]].icon}]`
//         }
//       }
//     }
//   }
//   return res
// }

export default {
  add,
  copy,
  updateParent,
  remove,
  // getDisplayData,
  // getBackground,
  // getColor,
  // getOutline,
  // checkUnderline,
  // checkShape,
  // getLabel
}
