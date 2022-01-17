/*
export function someMutation (state) {
}
*/

import packageJson from '../../../package.json'

export function setUserLoadStatus (state, payload) {
  state.userLoadStatus = payload
}
export function setUser (state, payload) {
  state.user = payload
  // state.logInCheck = true
}
export function setNewVersion (state, payload) {
  var v1 = packageJson.version
  var v2 = payload
  var options = []
  var lexicographical = options && options.lexicographical,
    zeroExtend = options && options.zeroExtend,
    v1parts = v1.split('.'),
    v2parts = v2.split('.')

  function isValidPart (x) {
    return (lexicographical ? /^\d+[A-Za-z]*$/ : /^\d+$/).test(x)
  }
  // console.log(!v1parts.every(isValidPart), !v2parts.every(isValidPart))
  if (!v1parts.every(isValidPart) || !v2parts.every(isValidPart)) {
    state.newVersion = false
    return NaN
  }

  if (zeroExtend) {
    while (v1parts.length < v2parts.length) v1parts.push('0')
    while (v2parts.length < v1parts.length) v2parts.push('0')
  }

  if (!lexicographical) {
    v1parts = v1parts.map(Number)
    v2parts = v2parts.map(Number)
  }

  // console.log(v1parts, v2parts)

  for (var i = 0; i < v1parts.length; ++i) {
    if (v2parts.length === i) {
      // console.log(1)
      state.newVersion = true
      return 1
    }

    if (v1parts[i] === v2parts[i]) {
      // console.log(v1parts[i], v2parts[i])
      continue
    } else if (v1parts[i] > v2parts[i]) {
      // console.log(1)
      state.newVersion = true
      return 1
    } else {
      // console.log(-1)
      state.newVersion = false
      return -1
    }
  }

  if (v1parts.length !== v2parts.length) {
    // console.log(-1)
    state.newVersion = false
    return -1
  }
  // console.log(0)
  state.newVersion = false
  return 0
}
export function setUserKey (state, payload) {
  state.user[payload.key] = payload.val
}
export function setVersionInfo (state, payload) {
  state.versionInfo = payload
}
export function setHideWhatsNew (state, payload) {
  state.hideWhatsNew = payload
}
