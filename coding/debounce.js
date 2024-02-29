// 防抖：函数在规定时间结束触发才会被再次调用，如果期间被使用，则重置进行计算。如：索框只有用户在输入完毕后才去服务器执行查询。
// NOTE:函数思路
//1.有timer时先清楚定时，然后重新计时。等计时结束后执行函数
function debounce(fn, timeout = 500) {
  let timer = null
  self = this
  return function () {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      fn.call(self, ...arguments)
    }, timeout)
  }
}
