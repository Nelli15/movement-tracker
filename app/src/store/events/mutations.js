

export function setEvent (state, payload) {
  state.events[payload.id] = payload
}

export function setFilterQuery (state, payload) {
  state.filterQuery = payload
}
