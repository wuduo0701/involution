function debounce(fn, timeout = 500) {
  let timer = null
  return function () {
    let self = this, // 保存 this指向
      args = arguments
    if (timer) {
      clearTimeout(timeout)
    }
    timer = setTimeout(() => {
      fn.apply(self, args)
    }, timeout)
  }
}
