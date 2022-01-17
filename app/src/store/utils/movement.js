export function toArray (object) {
  if (!object) {
    return []
  }
  if (Object.keys(object).length <= 0) {
    return []
  }
  return Object.keys(object).map(i => object[i])
}
