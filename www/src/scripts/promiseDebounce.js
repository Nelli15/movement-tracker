export function debounce (fn, wait = 250, immediate) {
  let timeout
  let rej

  function debounced (...args) {
    return new Promise((resolve, reject) => {
      rej = reject
      const later = () => {
        timeout = null
        if (!immediate) {
          resolve(fn.apply(this, args))
        }
      }

      clearTimeout(timeout)
      if (immediate && !timeout) {
        fn.apply(this, args)
      }
      timeout = setTimeout(later, wait)
    })
  }

  debounced.cancel = () => {
    clearTimeout(timeout)
    rej('debounce canceled')
  }

  return debounced
}
