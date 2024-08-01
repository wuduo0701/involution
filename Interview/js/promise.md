# Promise

> 1. 是异步编程的一种解决方案，解决了传统回调函数的弊端（回调地狱），使代码可读性大大增强。
> 2. 有三种状态，Pending（进行中），Fullfilled（已成功），Rejected（已失败）。
> 3. 只能由（pending -> fullfiled）或（pending -> rejected）。到达「已成功」或者「已失败」的状态后，就不会在变

## 作用

- 链式操作减低了编码难度
- 代码可读性明显增强

## 状态和特点

1、他有三种状态，Pending（进行中），Fullfilled（已成功），Rejected（已失败）
2、状态只能由（pending -> fullfiled）或（pending -> rejected）。到达「已成功」或者「已失败」的状态后，就不会在变

## 用法

### 实例方法

1. Promise 是一个构造函数，接受一个函数作为参数，该函数的两个参数分别是 resolve 和 reject
   ```js
   const promise = new Promise(function (resolve, reject) {})
   ```
2. new 出来的实例存在 3 中方法。`then` 和 `catch` 和 `finally`

#### then

> 1. `.then` 是实例状态发生改变时的回调函数。接收两个回调函数作为参数，第一个参数是 `resolved` 状态的回调函数，第二个参数是 `rejected` 状态的回调函数
> 2. 返回的是一个新的 Promise 实例，就是 promise 能链式调用的原因

```js
getJSON('/posts.json')
  .then(
    // `resolved` 状态的回调函数
    (json) => {
      return json.post
    },
    // `rejected` 状态的回调函数
    (rejected) => {}
  )
  // 新promise
  .then(function (post) {
    // ...
  })
```

#### catch

> 1. `.catch` 方法是 `.then(null, rejection)` 或 `.then(undefined, rejection)` 的别名，用于指定发生错误时的回调函数
> 2. Promise 对象的错误具有“冒泡”性质，会一直向后传递，直到被捕获为止

#### finnally

> 1. `finally`方法用于指定不管 Promise 对象最后状态如何，都会执行的操作
> 2. 用法：最后的 `loading` 置为 false

```js
  promise
  .then(result => {···})
  .catch(error => {···})
  .finally(() => {···});
```

### 构造函数方法

#### promise.all

```js
const p = Promise.all([p1, p2, p3])
```

1. 将多个 Promise 实例，包装成一个新的 Promise 实例。
2. 只有两种情况返回。
   1. `p1、p2、p3` 三个 promise 的状态都为成功 `fulfilled` 。返回值是 `p1、p2、p3` 的返回值组成一个数组，传递给 p 的回调函数。
   2. `p1、p2、p3` 三个 promise 中**存在一个**为 `rejected`。返回值是 第一个 `rejected` 的实例的返回值。
3. 注意点：`p1、p2、p3` 中自己定义了 `catch` 方法的话。那么它一旦被 `rejected`，并不会触发外层的 `Promise.all` 的 catch 方法

#### promise.race

> 含义：race -> 赛跑

```js
const p = Promise.race([p1, p2, p3])
```

1. 将多个 Promise 实例，包装成一个新的 Promise 实例。
2. 只要 `p1、p2、p3` 三个 promise 的状态**有一个**状态改变了，则 `p` 的状态就会变

#### promise.allSettled

> 含义：allSettled -> 全部解决

```js
const p = Promise.race([p1, p2, p3])
```

1. 将多个 Promise 实例，包装成一个新的 Promise 实例。
2. 只要 `p1、p2、p3` 三个 promise 的状态**全都**改变了，则 `p` 的状态就会变

#### promise.resolve

```js
Promise.resolve('foo')
// 等价于
new Promise((resolve) => resolve('foo'))
```

1. 将相应对象转为 Promise 对象
2. 参数分为四种情况：

   1. 参数是一个 `Promise` 实例，那么 `Promise.resolve` 将不做任何修改、原封不动地返回这个实例。
   2. 参数是一个 `thenable` 对象（指的是具有 then 方法的对象）时，会将这个对象转为 Promise 对象，然后就立即执行 thenable 对象的 then()方法

   ```js
   // thenable对象
   let thenable = {
     then: function (resolve, reject) {
       resolve(42)
     }
   }
   let p1 = Promise.resolve(thenable)
   p1.then(function (value) {
     console.log(value) // 42
   })
   ```

   3. 参数不是具有`then()`方法的对象，或根本就不是对象，`Promise.resolve()`会返回一个新的 Promise 对象，状态为 `resolved`

   ```js
   // 如参数是一个变量
   const p = Promise.resolve('Hello')

   p.then(function (s) {
     console.log(s)
   })
   // Hello
   ```

   4. 没有参数时，直接返回一个 `resolved` 状态的 Promise 对象
      1. 立即 resolve()的 Promise 对象，是在本轮“事件循环”（event loop）的结束时执行 -> 放进第一个宏任务的任务队列中

   ```js
   setTimeout(function () {
     console.log('three')
   }, 0)

   Promise.resolve().then(function () {
     console.log('two')
   })

   console.log('one')

   // one
   // two
   // three
   ```

#### promise.reject

1. Promise.reject(reason)方法也会返回一个新的 Promise 实例，该实例的状态为 rejected

   ```js
   const p = Promise.reject('出错了')
   // 等同于
   const p = new Promise((resolve, reject) => reject('出错了'))

   p.then(null, function (s) {
     console.log(s)
   })
   // 出错了
   ```

2. Promise.reject()方法的参数，会原封不动地变成后续方法的参数
   ```js
   Promise.reject('出错了').catch((e) => {
     console.log(e === '出错了')
   })
   // true
   ```

#### promise.any

```js
const p = Promise.any([p1, p2, p3])
```

1. 将多个 Promise 实例，包装成一个新的 Promise 实例。
2. 只有两种情况返回。
   1. `p1、p2、p3` 三个 promise 中**有一个**为 `fulfilled`。包装实例就会变成 fulfilled 状态。
   2. `p1、p2、p3` 三个 promise 的状态都为 `rejected` ，包装实例就会变成 rejected 状态。
