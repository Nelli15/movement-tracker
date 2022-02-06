/*
export function someMutation (state) {
}
*/

export function setSize (state, payload) {
  state.size = payload
}
export function setShow (state, payload) {
  state.show[payload.key] = !payload.value
}
export function closeDrawers (state, payload) {
  for (var key in state.show) {
    state.show[key] = false
  }
}
export function setHighlighted (state, payload) {
  if (state.highlight.current !== payload.id) {
    // console.log(payload)
    // state.highlight = { ...payload.members, ...payload.noParentMembers }
    state.highlight.current = payload.id
  } else {
    state.highlight = {}
  }
}
export function setReady (state, val) {
  state.ready = val
}
