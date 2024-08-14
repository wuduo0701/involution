function throttle(fn, timeout = 500) {
  let self = this,
    firstTime = true
  return function () {
    let args = arguments,
      timer = null

    if (firstTime) {
      firstTime = false
      fn.apply(self, args)
      return
    }
    if (timer) {
      return
    }
    timer = setTimeout(() => {
      clearTimeout(timer)
      timer = null
      fn.apply(self, args)
    }, timeout)
  }
}
