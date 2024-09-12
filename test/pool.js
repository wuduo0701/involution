class Pool {
  constructor(max) {
    this.queue = []
    this.maxLimit = max
    this.currentIdx = 0
    this.results = []

    // 如果是先输出的先放入结果
    this.index = 0
  }
  add(task, index) {
    return new Promise((resolve) => {
      const runTask = () => {
        this.currentIdx++
        task()
          .then((result) => {
            this.results[this.index++] = result
            resolve()
          })
          .catch((error) => {
            this.results[this.index++] = { error }
            resolve()
          })
          .finally(() => {
            this.currentIdx--
            if (this.queue.length > 0) {
              const nextTask = this.queue.shift()
              nextTask()
            }
          })
      }
      if (this.currentIdx < this.maxLimit) {
        runTask()
      } else {
        this.queue.push(runTask)
      }
    })
  }
  async runAll(tasks) {
    const taskPromises = tasks.map((task, index) => this.add(task, index))
    await Promise.all(taskPromises)
    return this.results
  }
}
const delay = (ms) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('resolve' + ms + 'ms')
    }, ms)
  })
}
const tasks = [
  () => delay(2000),
  () => delay(4000),
  () => delay(5000),
  () => delay(6000),
  () => delay(1000)
]

const pool = new Pool(2)

pool.runAll(tasks).then((result) => {
  console.log('all task is completed')
  console.log(result)
})
