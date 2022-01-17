


export function setTrend (state, payload) {
  state.trends[`${payload.treeId}-${payload.styleId}`] =payload
}
