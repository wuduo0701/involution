// 函数节流：n 秒内只运行一次，若在 n 秒内重复触发，只有一次生效。举例：滚动加载

// NOTE:函数逻辑
// 1. 定义1个timer和首次执行判断firstTime
// 2. 需要return 函数
// 3. 函数：定义args参数以及this指向。
// 4. 如果是第一次执行，则直接调取fn并return；如果存在的timer还在，return不执行；定义一个setTimeout定时器
function throttle(fn, timeout = 500) {
  let timer = null,
    firstTime = true
  return function () {
    const args = arguments
    const self = this
    if (firstTime) {
      fn.apply(self, args)
      firstTime = false
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

let fn1 = () => {
  console.log(222)
}
const throttleFn = throttle(fn1, 10000)

for (let index = 0; index < 10; index++) {
  throttleFn()
}
// 运用
// window.onresize = throttle(function () {
//   console.log('window onresize')
// }, 500)
