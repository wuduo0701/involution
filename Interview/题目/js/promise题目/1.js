Promise.resolve(1)
  .then(() => 2)
  .then(3)
  .then((value) => value * 3)
  .then(Promise.resolve(4))
  .then(console.log)

// 答案：6
// 如果.then(onFulfilled, onRejected)中的onFulfilled不是函数，当Promise被解决（resolved）时，Promise链会跳过这个onFulfilled，并将前一个Promise的值传递给下一个.then()。
// 如果onRejected不是函数，当Promise被拒绝（rejected）时，Promise链会跳过这个onRejected，并将前一个Promise的拒绝原因传递给下一个.then()或.catch()。
