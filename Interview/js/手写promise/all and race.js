class myPromise {
  // 1、返回一个新的promise
  // 2、只有两种情况，所有promise都执行成功 all 就成功；或者所有promise中有一个失败，则失败
  static all(promises) {
    let count = 0 // 执行了多少个 - 全部成功依赖这个判断
    let result = [] // 全部成功的promise返回一个汇总
    return new Promise((resolve, reject) => {
      for (let i = 0; i < promises.length; i++) {
        // Promise.resolve包一下，防止promises[i]不是Promise类型
        let p = Promise.resolve(promises[i])
        p.then((res) => {
          count++
          result[i] = res
          if (count === promises.length) {
            resolve(result) // 返回汇总结果
          }
        }).catch((err) => {
          reject(err) // 失败一个立即返回
        })
      }
    })
  }
  static race(promises) {
    // 1、返回一个新的promise
    // 2、无论成功还是失败，返回第一个执行完成的promise
    return new Promise((resolve, reject) => {
      for (let i = 0; i < promises.length; i++) {
        let p = Promise.resolve(promises[i])
        p.then((res) => {
          resolve(res)
        }).catch((err) => {
          reject(err) // 失败一个立即返回
        })
      }
    })
  }
  static allsettled(promises) {
    return new Promise((resolve, reject) => {
      let count = 0
      let result = []
      for (let i = 0; i < promises.length; i++) {
        let p = Promise.resolve(promises[i])
        p.then((result) => {
          result[i].push(result)
        })
          .catch((err) => {
            result[i].push(err)
          })
          .finally(() => {
            count++
            if (count === promises.length) {
              resolve(result)
            }
          })
      }
    })
  }
}

// 创建 test1 和 test2，但不要在这里调用 then 方法
const test3 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(100)
  }, 1000)
})

const test4 = new Promise((resolve, reject) => {
  resolve(300)
})

// 验证 all
myPromise.all([test3, test4]).then(
  (results) => {
    console.log('所有 promises 已完成', results)
  },
  (error) => {
    console.log('一个或多个 promises 失败', error)
  }
)
// 验证race
// 输出300
myPromise.race([test3, test4]).then(
  (results) => {
    console.log('首先输出的结果', results)
  },
  (error) => {
    console.log('一个或多个 promises 失败', error)
  }
)
