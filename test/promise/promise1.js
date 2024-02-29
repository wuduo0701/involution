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
  } catch (error) {
    reject(error)
  }
}

myPromise.prototype.then = function (success, error) {
  const self = this
  // 判断类型
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
          throw new Error('不能返回自身')
        }
        if (x instanceof myPromise) {
          x.then(resolve, reject)
        } else {
          resolve(x)
        }
      } catch (error) {
        reject(error)
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
    if (self.status === FULLFILLED) {
      resolvePromise(error)
    }
  })
  return thenPromise
}

myPromise.all = function (promises) {
  let count = 0,
    result = []
  return new myPromise((resolve, reject) => {
    const judgePromise = function (value) {
      result.push(value)
      count++
      if (count === promises.length) resolve(result)
    }
    promises.forEach((value, index) => {
      if (promise instanceof myPromise) {
        promise.then(
          (res) => {
            judgePromise(res)
          },
          (err) => {
            reject(err)
          }
        )
      } else {
        judgePromise(value)
      }
    })
  })
}

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
  setTimeout(() => {
    resolve(200)
  }, 1000)
}).then(
  (value) => {
    console.log(value)
  },
  (error) => {
    console.log(error)
  }
)
myPromise.all([test1, test2]).then(
  (results) => {
    console.log('所有 promises 已完成', results)
  },
  (error) => {
    console.log('一个或多个 promises 失败', error)
  }
)
