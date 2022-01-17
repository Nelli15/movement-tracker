

export function addMovement (state, payload) {
  state.movements[payload.id] = payload
}
export function removeMovement (state, id) {
  delete state.movements[id]
}
export function setHidden (state, payload) {
  state.movements[payload.movId].hide = payload.hide
}

export function setMovColor (state, payload) {
  payload.mov.style.backgroundColor = payload.color
}