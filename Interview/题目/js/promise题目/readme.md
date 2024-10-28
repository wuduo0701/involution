1. promise.reslove 是宏任务，会立即执行
2. new Promise 里的也会立即执行，状态改变后的才是微任务
   ```js
   new Promise((_, reject) => {
     console.log(4) // new promise是立即执行的，返回reject，即状态变更，后续reject的为异步。6为同步执行
     reject(5)
     console.log(6)
   })
   ```
3. 如果.then 中的 onFulfilled 不是函数，则会跳过这个值。会把前一个 resolve 的值传递
   ```js
   Promise.resolve(1)
     .then(() => 2) // 下面value * 3用的这个值，会跳过下面2
     .then(3)
     .then((value) => value * 3)
     .then(Promise.resolve(4))
     .then(console.log)
   ```
4. 如果.then 中的 onRejected 不是函数，则会跳过这个值。会把前一个 reject 的值传递
