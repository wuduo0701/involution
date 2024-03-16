# leetcode

- [3.无重复字符的最长子串](../leetcode/3.js)
- [206.反转链表](../leetcode/206.js)
- [215.数组中的第 K 个最大元素](../leetcode/215.js)
  - 涉及快排、堆排序
-

# 其他

- 数组扁平化，去重，排序
  - [数组扁平化-7 种方法](../coding/flat.js)
- Pick 类型体操
- Promise
  - ![promise流转](../assets/images/promise.png)
  - [promise + promise.all](../coding/promise.js)
- 数组求交集
- 数组右移 K 位
- 数组的相关方法梳理
  > https://blog.csdn.net/qq_39200185/article/details/121015316
- 排序

# 题库

- var obj = {a: {b: {c: 2}}}; console.log(get(obj, 'a.b.c')); // 输出 2

  ```js
  var obj = { a: { b: { c: 2 } } }

  function get(obj, path) {
    // let strArr = path.split('.'),
    //   objNow = obj
    // for (i = 0; i < strArr.length; i++) {
    //   objNow = objNow[strArr[i]]
    //   if (i === strArr.length - 1) return objNow
    // }
    return path.split('.').reduce(function (acc, part) {
      return acc[part]
    }, obj)
  }
  console.log(get(obj, 'a.b.c')) // 输出 2
  ```

- console.log(fn([1, 2, 3, 4, 5], 2)) //结果为[[1,2],[3,4],[5]]

  ```js
  // NOTE:关键在这个i+=num，这样就是每隔num进行迭代
  function fn(arr, num) {
    if (arr.length < num) return arr
    const result = []
    for (let i = 0; i < arr.length; i += num) {
      result.push(arr.slice(i, i + num))
    }
    return result
  }
  console.log(fn([1, 2, 3, 4, 5], 2)) //结果为[[1,2],[3,4],[5]]
  ```

- 计算乘积除以当前项 //传参 [1,2,3,4] //输出 [24,12,8,6]

  ```js
  function Area(arr) {
    let area = arr.reduce((pre, cur) => {
      return pre * cur
    }, 1)
    return arr.map((item) => area / item)
  }
  ```

- 失败重试，200ms 试一次，500ms 试一次。还不成功就返回失败

  ```js
  // 失败重试，200ms 试一次，500ms 试一次。还不成功就返回失败
  function retry(fn, time1, time2) {
    return new Promise((resolve, reject) => {
      let retryCount = 0
      function tryAgain() {
        fn()
          .then((result) => resolve(result))
          .catch((err) => {
            retryCount++
            console.log(
              '尝试次数',
              retryCount,
              retryCount === 1 ? time1 : time2
            )
            if (retryCount < 2) {
              setTimeout(tryAgain, retryCount === 1 ? time1 : time2)
            } else {
              reject(err)
            }
          })
      }
      tryAgain()
    })
  }
  function exampleOperation() {
    return new Promise((resolve, reject) => {
      // 这里模拟一个失败的操作
      reject('Operation failed')
    })
  }
  retry(exampleOperation, 200, 500)
    .then((result) => {
      console.log('Operation succeeded:', result)
    })
    .catch((error) => {
      console.error('Operation failed:', error)
    })
  ```

- 找出字符串中连续重复次数最多的字符，输出该字符，开始位置，结束位

  ```js
  // 找出字符串中连续重复次数最多的字符，输出该字符，开始位置，结束位
  function find(str) {
    if (str.length <= 1) return str

    let max = 0,
      end = 0,
      maxStr = '',
      maxStart = 0,
      maxEnd = 0
    for (let i = 0; i < str.length; i++) {
      end = i + 1
      while (str[i] === str[end]) {
        end++
      }
      if (end - i > max) {
        max = end - i
        maxStr = str.slice(i, end)
        maxStart = i
        maxEnd = end
      }
    }
    return { str: maxStr, start: maxStart, end: maxEnd }
  }

  console.log(find('abbba'))
  console.log(find('abccc'))
  console.log(find('abcccbaaaaad'))
  ```

- 写一个 group 函数可以对数组进行分类，接收一个函数作为参数，返回一个对象.

  ```js
  //写一个group函数可以对数组进行分类，接收一个函数作为参数，返回一个对象.
  //调用如下
  // array = [0, 1, 2, 3, 4]
  // ruleFn = (item, index, array) => {
  //   return item % 2 == 0 ? 'odd' : 'even'
  // }
  // array.group(ruleFn)

  //结果如下
  // {odd:[1,3],even:[0,2,4]}
  Array.prototype.group = function (fun) {
    let obj = {}
    this.forEach((item, index) => {
      let key = fun(item + 1, index, this)
      if (!obj[key]) {
        obj[key] = [item]
      } else {
        obj[key].push(item)
      }
    })
    return obj
  }
  let array = [0, 1, 2, 3, 4]

  ruleFn = (item, index, array) => {
    return item % 2 == 0 ? 'odd' : 'even'
  }

  console.log(array.group(ruleFn))
  ```

- 数组拍平，可以自定义递归深度

  ```js
  function flatternArray(array, deep) {
    // 解法1：
    // return array.flat(deep)
    // 解法2：使用递归，在达到深度后，停止递归
    let result = []
    for (let i = 0; i < array.length; i++) {
      let item = array[i]
      if (Array.isArray(item) && deep > 0) {
        result = result.concat(flatternArray(item, deep - 1))
      } else {
        result.push(item)
      }
    }
    return result
    // 解法3：reduce版本的递归
    // return array.reduce((prev, cur) => {
    //   return prev.concat(
    //     Array.isArray(cur) && deep > 1 ? flatternArray(cur, deep - 1) : cur
    //   )
    // }, [])
  }

  console.log(flatternArray([1, 2, 3, [4, 5]], 1)) //[1,2,3,4,5]
  console.log(flatternArray([1, 2, 3, [4, [5]]], 1)) //[1,2,3,4,[5]]
  ```

- 实现 lastPromise，连续请求只有最后一次输出

  > 通过 setTimeOout 实现，因为 setTimeOut 属于宏任务，并不会立即执行。会放进下一个执行栈，而我们用了一个唯一 ID 标记了定时器，在遇到下一个宏任务，又把之前定时器给清楚了，所以只会保留了最后一个 setTimeOut

  ```js
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
  ```

-
