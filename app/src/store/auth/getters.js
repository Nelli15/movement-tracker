/*
export function someGetter (state) {
}
*/
export function lastVersion (state) {
  return state.user ? state.user.lastVersion : false
}
export function user (state) {
  return state.user
}
export function loggedIn (state) {
  return 'uid' in state.user
}
export function newVersion (state) {
  process.env.PROD ? (state.hideWhatsNew ? false : state.newVersion) : false
}
export function versionInfo (state) {
  return state.versionInfo
}
export function userLoadStatus (state) {
  return state.userLoadStatus
}
