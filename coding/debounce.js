// 防抖： 秒后在执行该事件，若在 n 秒内被重复触发，则重新计时。如：input搜索框，窗口大小resize。
// NOTE:函数思路
//1.有timer时先清楚定时，然后重新计时。等计时结束后执行函数
function debounce(fn, timeout = 500) {
  let timer = null
  return function () {
    let self = this, // 保存 this指向
      args = arguments // arguments 是一个类数组对象，它包含了函数被调用时传入的所有参数，只在函数体内用

    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      fn.apply(self, args)
    }, timeout)
  }
}
