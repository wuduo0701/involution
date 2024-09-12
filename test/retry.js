function retry(fn, max) {
  return new Promise((resolve, reject) => {
    let count = 0

    const temp = () => {
      count++

      fn()
        .then(resolve)
        .catch((error) => {
          if (count < max) {
            console.log('重试次数：' + count)
            temp()
          } else {
            reject(new Error(`已达最大重试次数: ${error.message}`))
          }
        })
    }
    temp()
  })
}

const randomPromise = () => {
  return new Promise((resolve, reject) => {
    Math.random() > 0.9
      ? resolve('success')
      : reject(new Error('Request failed'))
  })
}
retry(randomPromise, 5)
  .then((result) => console.log(result))
  .catch((error) => console.error(error))
