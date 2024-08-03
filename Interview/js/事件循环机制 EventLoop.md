# 事件循环机制 EventLoop

> 1. JS 是单线程语言，意味着所有任务需要排队执行，所有会通过事件循环解决
> 2. 所有任务可以分成两种，一种是宏任务，另一种是微任务。
> 3. 宏任务：在主线程上排队执行的任务，只有前一个任务执行完毕，才能执行下一个任务
> 4. 微任务：不进入主线程、而进入"微任务列表"的任务
> 5. 宏任务会被推入主执行栈，微任务会被推入任务队列。等宏任务执行完成后，才会去读取本次宏任务的任务队列中的微任务，直至本次任务执行完成。在读取下一宏任务，依次类推，这样的循环就叫做事件循环。

## 宏任务和微任务

- 宏任务

  > 解释：在主线程上排队执行的任务，只有前一个任务执行完毕，才能执行下一个任务  
  > 宏任务的时间粒度比较大，执行的时间间隔是不能精确控制的，对一些高实时性的需求就不太符合

  常见的宏任务：

  - script 全部代码
  - setTimeout、setInterval、setImmediate
  - UI rendering/UI 事件
  - postMessage、MessageChannel
  - I/O（Node.js）

- 微任务

  > 不进入主线程、而进入"微任务列表"的任务  
  > 一个需要异步执行的函数，执行时机是在主函数执行结束之后、当前宏任务结束之前

  常见的微任务：

  - Promise.then
  - MutaionObserver
  - Object.observe（已废弃；Proxy 对象替代）
  - process.nextTick（Node.js）

## event loop 与 浏览器更新渲染时机

1. 浏览器更新渲染会在 event loop 中的 宏任务 和 微任务 完成后进行，即`宏任务 → 微任务 → 渲染更新`（先宏任务 再微任务，然后再渲染更新）
2. 宏任务队列中，如果有大量任务等待执行时，将 dom 的变动作为微任务，能更快的将变化呈现给用户，这样就可以在这一次的事件轮询中更新 dom

## event loop 与 vue nextTick

1. vue nextTick 的源码实现，优先级判断，总结就是 Promise > MutationObserver > setImmediate > setTimeout
2. 这里优先使用 Promise，因为根据 event loop 与浏览器更新渲染时机，使用微任务，本次 event loop 轮询就可以获取到更新的 dom
3. 如果使用宏任务，要到下一次 event loop 中，才能获取到更新的 dom

## event loop 与 process.nextTick（Node）

1. process.nextTick 和微任务混为一谈，但其实并不是同一个东西。process.nextTick 是 Node.js 自身定义实现的一种机制，有自己的 nextTickQueue
2. process.nextTick 执行顺序早于微任务

### process.nextTick 执行顺序早于微任务

```js
console.log('start')
setTimeout(() => {
  console.log('timeout')
}, 0)
Promise.resolve().then(() => {
  console.log('promise')
})
process.nextTick(() => {
  console.log('nextTick')
  Promise.resolve().then(() => {
    console.log('promise1')
  })
})
console.log('end')
// 执行结果 start end nextTick  promise promise1 timeout
```
