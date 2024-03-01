function debounce(fn, timeout = 500) {
  let self = this,
    timer = null

  return function () {
    if (timer) {
      clearTimeout(timeout)
    }
    timer = setTimeout(() => {
      fn.apply(self, arguments)
    }, timeout)
  }
}
