export function eventsList (state) {
  return Object.values(state.events)
}

export function events (state) {
  return state.events
}

export function filterQuery (state) {
  return state.filterQuery
}
