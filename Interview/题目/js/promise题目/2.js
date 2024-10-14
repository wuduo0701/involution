Promise.resolve(1)
  .then((val) => {
    console.log(val) // 1
    return val + 1
  })
  .then((val) => {
    console.log(val) // 2
  })
  .then((val) => {
    console.log(val) // undefined
    return Promise.resolve(3).then((val) => {
      console.log(val) // 3
    })
  })
  .then((val) => {
    console.log(val) // undefined
    return Promise.reject(4)
  })
  .catch((val) => {
    console.log(val) // 4
  })
  .finally((val) => {
    console.log(val) // undefined
    return 10
  })
  .then((val) => {
    console.log(val) // undefined
  })

// 知识点：
// 1. finally块中的val不会接收任何值，因为finally不管Promise的状态如何都会执行。
// 2. finally块返回的值不会影响Promise链的值，因此返回的10不会传递给下一个then
// 3. then如果在上一步没有显式返回值（具体的值或者promise），隐式返回undefined。如下面返回的promise，会等他执行完成，在返回undefined
// return Promise.resolve(3).then((val) => {
//   console.log(val) // 3
// })
