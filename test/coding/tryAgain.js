function retry(fn, time1, time2) {
  return new Promise((resolve, reject) => {
    let num = 0

    function again() {
      fn()
        .then((result) => {
          resolve(result)
        })
        .catch((err) => {
          num++
          console.log('失败次数:', num, '重试时间：', num === 1 ? time1 : time2)
          if (num < 2) {
            setTimeout(again, num === 1 ? time1 : time2)
          } else {
            reject(err)
          }
        })
    }
    again()
  })
}

function fn() {
  return new Promise((resolve, reject) => {
    reject('失败')
  })
}
retry(fn, 200, 500)
  .then((res) => {})
  .catch((err) => {
    console.log(err)
  })
