// 定义timer + firstTime
function throttle(fn, timeout = 500) {
  let timer = null,
    firstTime = true
  return function () {
    let self = this
    if (firstTime) {
      firstTime = false
      fn.apply(self, arguments)
      return
    }
    if (timer) {
      // clearTimeout(timer)
      // timer = null
      return
    }
    timer = setTimeout(() => {
      clearTimeout(timer)
      timer = null
      fn.apply(self, arguments)
    }, timeout)
  }
}

let fn1 = () => {
  console.log(222)
}
const throttleFn = throttle(fn1, 10000)

for (let index = 0; index < 10; index++) {
  throttleFn()
}
