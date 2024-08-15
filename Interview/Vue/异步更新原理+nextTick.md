# vue 更新原理

## 异步更新原理

1. Vue 数据发生变化之后，不会立即更新 dom，而是异步更新的
2. 侦听到数据变化，Vue 将开启一个队列，并缓存在同一事件循环中发生的所有数据变更（优化性能）
3. 如果同一个 watcher 被多次触发，只会被推入到队列中一次，可以避免重复修改相同的 dom，这种去除重复数据，对于避免不必要的计算和 DOM 操作是非常重要的
4. 同步任务执行完毕，开始执行异步 watcher 队列的任务，一次性更新 DOM

### 具体更新过程

1. 当你修改数据时，Vue 会将更新任务推入一个队列。
2. 在同一个事件循环中，Vue 会合并所有的更新，确保只进行一次 DOM 更新。
3. 使用 Promise 、 MutationObserver 、setImmediate 、setTimeout(fn, 0) 来处理微任务。当当前的任务完成后，Vue 会执行队列中的更新任务。任务优先级依次降低

### nextTick 为什么要优先使用微任务实现？

1. vue nextTick 的源码实现，异步优先级判断，总结就是 Promise > MutationObserver > setImmediate > setTimeout
2. 优先使用 Promise，因为根据 event loop 与浏览器更新渲染时机，宏任务 → 微任务 → 渲染更新，使用微任务，本次 event loop 轮询就可以获取到更新的 dom
3. 如果使用宏任务，要到下一次 event loop 中，才能获取到更新的 dom
