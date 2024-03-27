# 技术相关问题

## JS 相关

- [js 类型](./js/1.md)
- [数组常用方法](./js/arr.md)
- [== 和 ===区别，分别在什么情况使用](./js/1.md)
- [new 操作符具体干了什么](./js/1.md)
- [浅拷贝和深拷贝]

  - 原理
  - 手写深拷贝

    - typeof 判断是否为基础类型、或者为 null。return obj
    - 如果是日期，return new Date(obj)
    - 如果是正则，return new RegExp(obj)
    - 创建一个新对象，判断是否为数组。const newObj = Array.isArray(obj) ? [] : {}
    - 递归拷贝

    ```js
    function deepClone(obj) {
      // 如果是基础数据类型  直接返回
      if (typeof obj !== 'object') return obj
      // 如果是null或者undefined 不进行拷贝操作
      if (obj === null || obj === undefined) return obj
      // 如果是正则和日期 拷贝
      if (obj instanceof Date) return new Date(obj)
      if (obj instanceof RegExp) return new RegExp(obj)

      const newObj = Array.isArray(obj) ? [] : {}
      // 如果是数组：key: index，对象：key: key
      for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
          // 实现一个递归拷贝
          const value = obj[key]
          // 递归调用deepClone，value可能还是对象，所以递归调用
          newObj[key] = typeof value === 'object' ? deepClone(value) : value // 这里相当于用了又一层引用赋值给了新对象
        }
      }
      return newObj
    }
    ```

- [函数珂里化]
  - 原理
    将接受多个参数传递的函数转化为一系列使用一个参数的函数
  - 手写
    ```js
    function curry(fn, ...args) {
      let length = fn.length
      return function () {
        let totalArgs = [...args, ...arguments]
        return totalArgs.length >= length
          ? fn.call(this, ...totalArgs)
          : curry.call(this, fn, ...totalArgs)
      }
    }
    ```
- for in 和 for of 的区别
  > for in 能用于对象和数组，for of 只能用于对象
  - for in 用于遍历对象的可枚举属性的，即 key 值
  - for of 用于遍历可迭代对象的值，如数组的 value 值
- 哪些地方不能使用箭头函数
  > 箭头函数会丢失 this 指向
  - 对象方法
  - 构造函数，new 实例会报错
  - 原型方法，如`Array.prototype.myMethod = () => console.log(this)`
  - arguments。箭头函数没有内置 arguments 对象
  - call、apply、bind 时
- new 一个对象的过程

  - 具体过程
    1. 创建一个新的空对象
    2. 新对象的原型链（`__proto__`）指向构造函数的原型（`prototype`）
    3. 构造函数的 this 指向新对象，并调用构造函数
    4. 如果上面的调用结果为对象`对instanceof判断`，则返回这个对象，否则为新对象
  - 实现代码

    ```js
    function myNew(fn, ...args) {
      let obj = {}
      obj.__proto__ = fn.prototype
      const result = fn.apply(obj, args)
      return result instanceof Object ? result : obj
    }

    // 示例使用
    function Person(name, age) {
      this.name = name
      this.age = age
    }

    const person = myNew(Person, 'Alice', 25)
    console.log(person.name) // Alice
    console.log(person.age) // 25
    ```

- 节流和防抖

  ```html
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Document</title>
    </head>

    <body>
      <button id="debounce" style="margin-right: 20px;">debounce</button>
      <button id="throttle">throttle</button>
    </body>
    <script>
      function debounce(fn, timeout = 500) {
        let self = this,
          args = arguments,
          timer = null
        return function () {
          if (timer) clearTimeout(timer)
          timer = setTimeout(() => {
            fn.apply(self, args)
          }, timeout)
        }
      }
      function throttle(fn, timeout = 500) {
        let self = this,
          args = arguments,
          first = true,
          timer = null
        return function () {
          if (first) {
            fn.apply(self, args)
            first = false
            return
          }
          if (timer) return
          timer = setTimeout(() => {
            clearTimeout(timer)
            timer = null
            fn.apply(self, args)
          }, timeout)
        }
      }
      let buttonDebounce = document.querySelector('#debounce')
      buttonDebounce.addEventListener(
        'click',
        debounce(function () {
          console.log('buttonDebounce')
        }, 1000)
      )
      let buttonThrottle = document.querySelector('#throttle')
      buttonThrottle.addEventListener(
        'click',
        throttle(function () {
          console.log('buttonThrottle')
        }, 1000)
      )
    </script>
  </html>
  ```

- 如何创造一个自定义事件

  ```js
  // 创建自定义事件
  const myEvent = new CustomEvent('myCustomEvent', {
    detail: { message: 'Hello, world!' },
    bubbles: true,
    cancelable: false
  })
  ```

- SSE 和 websocket
- Es Module 和 CommonJs

## CSS 相关

- [BFC](/Interview/CSS/1.md)
- [盒子模型](/Interview/CSS/1.md)
- [flex](/Interview/CSS/flex.md)
  - `flex:1 = flex: 1 1 0%` 放大为 1，缩小为 1，预占尺寸为 0。即均匀分配空间，既可以放大（有多余空间就放大），也可以缩小（空间不够就缩小），不预占任何空间
  - `flex: 2 = flex: 1 1 0%` 放大为 2，缩小为 1，预占尺寸为 0。即两倍速度放大，等比例缩小，不预占任何空间
  - `flex: auto = flex: 1 1 auto` 放大为 1，缩小为 1，自动预占（放大缩小前）空间
  - `flex: none = flex: 0 0 auto` 不放大缩小，自动预占空间。常用于固定尺寸不伸缩
- [布局](/Interview/CSS/布局.md)

## 浏览器

- [浏览器缓存](/Interview/broswer/cache.md)
- cors 跨域是如何做的？从协议的角度去讲一下？
- 浏览器进程+内核

## HTTP

- [输入 url 到敲下回车发生了什么](/Interview/HTTP/url.md)
- 为什么 TCP 握手不是两次？
  TCP 两次握手的话，服务器并不知道客户端的接收能力是否完好
- http1.1、http2、http3
- [TCP 三次握手、四次挥手](/Interview/HTTP/url.md)
- [TCP 和 UDP 的区别](/Interview//HTTP/OSI7.md)
- [OSI 七层网络模型](/Interview//HTTP/OSI7.md)
- [GET 和 Post 的区别](/Interview/HTTP/1.md)

## Node 服务

- ！！node 是如何处理高并发的

## Vue

## React

## Vite 相关

- 比如你说你了解 vite，那么你是如何学习的 vite 的，你在项目中为什么会选择 vite 而不是 webpack？有没有写过具体的报告出来？
- vite 对比其他打包工具有什么优势缺点？
- 如果 vite 打包大文件性能会不会有影响？
  - 在开发环境速度并不会有太大影响。
    - vite 并不会进行打包，实时编译的。相比于 webpack 每次启动需要打包，vite 的按需编译会更有优势，它可以在加载到大文件时在按需加载
    - vite 采用了 `es moudles` 预加载依赖和按需加载源码的策略。
    - 存在缓存策略，如果大文件已经被加载过来，命中缓存后会更加快速
  - 生产环境会有影响
    - 生产环境 vite 是使用 rollup 进行打包的，处理大文件时会变慢。因为需要代码分析，压缩和拆分
    -
- tree shaking 原理
- vite 的底层原理
- [Vite 为什么比 Webpack 快](/Interview/Vite/1.md)
- [Vite 的热更新原理](/Interview/Vite/hmr.md)
- [生产环境下为何不用 ESBuild 打包？](/Interview/Vite/1.md)

## webpack

## 性能优化

## 微前端相关

> 原理 https://juejin.cn/post/7099339595233361934
> HTML Entry 源码分析 https://juejin.cn/post/6885212507837825038
> JS Entry
> 微前端原理浅析：https://juejin.cn/post/7132339270820724743

- 微前端如何实现作用域隔离
- 在微前端技术选型的时候你是如何考虑的？
- 为什么选择 qiankun，有没有具体的技术选型分析报告？
- 为什么要做微前端？
- 微前端原理是什么？怎么做隔离的？
- 为啥选 Qiankun？不能 iframe？

## 设计模式
