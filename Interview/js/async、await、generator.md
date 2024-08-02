# async、await、generator

1. 是 `generator` （迭代函数）的语法糖
   ```js
   // async、await写法
   const getData = () =>
     new Promise((resolve) => setTimeout(() => resolve('data'), 1000))
   async function test() {
     const data = await getData()
     console.log('data: ', data)
     const data2 = await getData()
     console.log('data2: ', data2)
     return 'success'
   }
   test().then((res) => console.log(res))
   ```
2. async 返回值是一个 `Promise` 对象，有无值看是否 return
3. await 关键字只能放在 async 函数内部
4. async、await 要结合 try/catch 使用，防止意外的错误

## generator

1. generator 函数跟普通函数在写法上的区别就是，函数命名前多了一个星号 `*`
   ```js
   // generator 写法
   const getData = () =>
     new Promise((resolve) => setTimeout(() => resolve('data'), 1000))
   function* testG() {
     // await被编译成了yield
     const data = yield getData()
     console.log('data: ', data)
     const data2 = yield getData()
     console.log('data2: ', data2)
     return 'success'
   }
   ```
2. 只有在 generator 函数中才能使用 `yield`，相当于 generator 函数执行的中途暂停点
   1. `*` 相当于 async
   2. yield 相当于 await
3. generator 函数是不会自动执行的，每一次调用它的 next 方法，会停留在下一个 yield 的位置

## async 和 generator 的区别

1. 返回值不同
   1. async 的返回值是 `promise`
   2. generator 返回值是一个 `Iterator` （迭代器）对象
2. async 具有更好的语义化。async 能直接表名该函数是一个异步函数，await 则表名这需要等待
3. generator 函数不会自动执行，需要手动调用 `next` 方法。async 函数自带执行器。
