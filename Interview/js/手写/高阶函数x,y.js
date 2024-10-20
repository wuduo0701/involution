// 实现高阶函数，每 x 秒执行一次函数，一共执行 y 次
function executeEveryXSeconds(fn, x, y) {
  let count = 0
  const intervalId = setInterval(() => {
    if (count < y) {
      fn()
      count++
    } else {
      clearInterval(intervalId)
    }
  }, x * 1000)
}

// 示例用法
executeEveryXSeconds(
  () => {
    console.log('函数执行了')
  },
  2,
  5
) // 每 2 秒执行一次，执行 5 次
