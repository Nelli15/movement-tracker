/*
export function someGetter (state) {
}
*/

export function size (state) {
  return state.size
}
export function show (state) {
  return state.show
}
export function highlight (state) {
  return state.highlight
}
export function ready (state) {
  return state.ready && !window.cypress
}
