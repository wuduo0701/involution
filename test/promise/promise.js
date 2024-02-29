// 定义三种流转状态

// 初始化promise，都需挂载在this上面（state、value、两种状态数组收集）

// 定义resolve函数

// 定义reject函数

// try catch 执行

// 定义promise.then (挂载在原型链上)

const PENDING = 'pending'
const FULLFILLED = 'fullfilled'
const REJECTED = 'rejected'

function myPromise(fn) {
  let self = this
  self.status = PENDING
  self.value = null
  self.fullfilledCB = []
  self.rejectedCB = []

  function resolve(value) {
    if (self.status === PENDING) {
      self.status = FULLFILLED
      self.value = value
      self.fullfilledCB.map((cb) => cb(self.value))
    }
  }
  function reject(value) {
    if (self.status === PENDING) {
      self.status = REJECTED
      self.value = value
      self.rejectedCB.map((cb) => cb(self.value))
    }
  }

  try {
    fn(resolve, reject)
  } catch (e) {
    reject(e)
  }
}

myPromise.prototype.then = function (success, error) {
  const self = this

  // 参数校验
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
  var thenPromise = new myPromise((resolve, reject) => {
    const resolvePromise = (cb) => {
      try {
        const x = cb(self.value)
        if (x === thenPromise) {
          throw '不能返回自身'
        }
        if (x instanceof myPromise) {
          x.then(resolve, reject)
        } else {
          resolve(x)
        }
      } catch (err) {
        // 处理报错
        reject(err)
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
  return thenPromise
}

const test3 = new myPromise((resolve, reject) => {
  // resolve(100) // 输出：成功 值： 200
  reject(100) // 输出：成功 值：300
})
  .then(
    (res) => 2 * res,
    (err) => 3 * err
  )
  .then(
    (res) => console.log('成功', res),
    (err) => console.log('失败', err)
  )
