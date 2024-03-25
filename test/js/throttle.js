function throttle(fn, timeout = 500) {
  let self = this,
    timer = null,
    firstTimer = true
  return function () {
    if (firstTimer) {
      fn.apply(self, arguments)
      firstTimer = false
      return
    }
    if (timer) return
    timer = setTimeout(() => {
      clearTimeout(timer)
      fn.apply(self, arguments)
    }, timeout)
  }
}
