//实现 lastPromise，连续请求只有最后一次输出

// let lastFn = lastPromise(promiseFn) //promiseFn 是一个普通的异步函数，返回一个 Promise
// lastFn().then() //无输出
// lastFn().then() //无输出
// lastFn().then() //有输出

function lastPromise(fn) {
  let promiseId = null

  return function () {
    if (promiseId !== null) clearTimeout(promiseId)

    return new Promise((resolve, reject) => {
      promiseId = setTimeout(() => {
        fn().then(resolve).catch(reject)
      }, 0)
    })
  }
}
// 示例异步函数
function promiseFn() {
  return new Promise((resolve, reject) => {
    // 这里模拟异步操作，比如请求服务器数据
    setTimeout(() => {
      resolve('Promise resolved')
    }, 1000)
  })
}

// 创建 lastPromise 函数
const lastFn = lastPromise(promiseFn)
lastFn().then(() => {
  console.log(1)
}) //无输出
lastFn().then(() => {
  console.log(2)
}) //无输出
lastFn().then(() => {
  console.log(3)
}) //有输出
