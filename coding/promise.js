// FIXME:注意不要用箭头函数
// 定义三种状态
const PENDING = 'pending' // 进行中
const FULLFILLED = 'fullfilled' // 已完成
const REJECTED = 'rejected' // 已结束

// NOTE: 以下为笔记
// 1、执行了resolve，Promise状态会变成fulfilled
// 2、执行了reject，Promise状态会变成rejected
// 3、Promise只以第一次为准，第一次成功就永久为fulfilled，第一次失败就永远状态为rejected
// 4、Promise中有throw的话，就相当于执行了reject
// 5、只有两种可能（从pending变为fulfilled和从pending变为rejected）
function myPromise(fn) {
  // 定义基本类型（状态status、值value、两种回调结果：成功或者失败） =>  都挂载到this上，也就是函数本身，即promise上面
  let self = this

  self.status = PENDING
  self.value = null
  self.fullfilledCB = []
  self.rejectedCB = []

  // 定义resolve函数(包括状态变更、值传递、函数回调)
  function resolve(value) {
    if (self.status === PENDING) {
      self.status = FULLFILLED // 变为已完成
      self.value = value
      self.fullfilledCB.map((cb) => cb(self.value))
    }
  }
  // 定义reject函数
  function reject(value) {
    if (self.status === PENDING) {
      self.status = REJECTED // 变为已完成
      self.value = value
      self.rejectedCB.map((cb) => cb(self.value))
    }
  }
  try {
    fn(resolve, reject)
  } catch (error) {
    reject(error)
  }
}

myPromise.prototype.then = function (success, error) {
  const self = this

  // 参数校验，确保为函数
  success =
    typeof success === 'function'
      ? success
      : (v) => {
          return v
        }
  error =
    typeof error === 'function'
      ? error
      : (r) => {
          throw r
        }
  // if (self.status === PENDING) {
  //   self.fullfilledCB.push(success)
  //   self.rejectedCB.push(error)
  // }
  // if (self.status === FULLFILLED) {
  //   self.fullfilledCB.push(success)
  // }
  // if (self.status === REJECTED) {
  //   self.rejectedCB.push(error)
  // }
  var thenPromise = new myPromise((resolve, reject) => {
    const resolvePromise = (cb) => {
      try {
        const x = cb(self.value)
        if (x === thenPromise) {
          // 不能返回自身哦
          throw new Error('不能返回自身。。。')
        }
        if (x instanceof myPromise) {
          // 如果返回值是Promise
          // 如果返回值是promise对象，返回值为成功，新promise就是成功
          // 如果返回值是promise对象，返回值为失败，新promise就是失败
          // 谁知道返回的promise是失败成功？只有then知道
          x.then(resolve, reject)
        } else {
          // 非Promise就直接成功
          resolve(x)
        }
      } catch (err) {
        // 处理报错
        reject(err)
        throw new Error(err)
      }
    }
    if (self.status === PENDING) {
      self.fullfilledCB.push(success)
      self.rejectedCB.push(error)
    }
    if (self.status === FULLFILLED) {
      resolvePromise(success)
    }
    if (self.status === REJECTED) {
      resolvePromise(error)
    }
  })
  // 返回这个包装的Promise
  return thenPromise
}
// 接收一个Promise数组，数组中如有非Promise项，则此项当做成功
// 如果所有Promise都成功，则返回成功结果数组
// 如果有一个Promise失败，则返回这个失败结果
myPromise.all = function (promises) {
  let result = [],
    count = 0

  return new Promise((resolve, reject) => {
    const judgePromise = (value, index) => {
      result.push(value)
      count++
      if (count === promises.length) resolve(result)
    }

    promises.forEach((promise, index) => {
      if (promise instanceof myPromise) {
        promise.then(
          (res) => {
            judgePromise(res, index) // 是否resolve
          },
          // 如果有一个Promise失败，则返回这个失败结果
          (err) => reject(err)
        )
      } else {
        judgePromise(res, index) // 是否resolve
      }
    })
  })
}

// 执行自定义Promise
const test1 = new myPromise((resolve, reject) => {
  setTimeout(() => {
    resolve(100)
  }, 1000)
}).then(
  (value) => {
    console.log(value)
  },
  (error) => {
    console.log(error)
  }
)

const test2 = new myPromise((resolve, reject) => {
  resolve(100) // 输出 状态：成功 值： 200
  // reject(100) // 输出 状态：成功 值：300
})
  .then(
    (res) => 2 * res,
    (err) => 3 * err
  )
  .then(
    (res) => console.log('成功', res),
    (err) => console.log('失败', err)
  )

// 创建 test1 和 test2，但不要在这里调用 then 方法
const test3 = new myPromise((resolve, reject) => {
  setTimeout(() => {
    resolve(100)
  }, 1000)
})

const test4 = new myPromise((resolve, reject) => {
  resolve(300)
})

// 使用 myPromise.all 来处理所有 promises
myPromise.all([test3, test4]).then(
  (results) => {
    console.log('所有 promises 已完成', results)
  },
  (error) => {
    console.log('一个或多个 promises 失败', error)
  }
)
