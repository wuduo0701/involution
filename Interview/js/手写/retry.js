// 重试机制
function maxRequest(fn, maxNum) {
  return new Promise((resolve, reject) => {
    let count = 0

    const attempt = () => {
      count++
      fn()
        .then(resolve)
        .catch((err) => {
          if (count < maxNum) {
            console.log('重试次数：' + count)
            attempt()
          } else {
            reject(err)
          }
        })
    }

    attempt()
  })
}

function myRequest() {
  return new Promise((resolve, reject) => {
    Math.random() > 0.5
      ? resolve('Request succeeded')
      : reject(new Error('Request failed'))
  })
}

maxRequest(myRequest, 3)
  .then((result) => console.log(result))
  .catch((error) => console.error(error))
