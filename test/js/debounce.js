function debounce(fn, timeout = 500) {
  let self = this,
    args = arguments,
    timer = null
  return function () {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      fn.call(self, args)
    }, timeout)
  }
}

