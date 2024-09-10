class Pool {
  constructor(maxQueue) {
    this.queue = []
    this.max = maxQueue
    this.currentCount = 0
    // this.index = 0
    this.results = []
  }
  add(task, index) {
    return new Promise((resolve) => {
      const runTask = () => {
        this.currentCount++
        task()
          .then((result) => {
            this.results[index++] = result
            resolve()
          })
          .catch((error) => {
            this.results[index++] = { error }
            resolve
          })
          .finally(() => {
            this.currentCount--
            if (this.queue.length > 0) {
              const nextTask = this.queue.shift()
              nextTask()
            }
          })
      }
      if (this.currentCount < this.max) {
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
      resolve(`after resolve ${ms}ms`)
    }, ms)
  })
}
const tasks = [
  () => delay(2000), // 2秒
  () => delay(4000), // 6秒
  () => delay(5000), // 7秒
  () => delay(6000), // 8秒
  () => delay(7000), // 9秒
  () => delay(1000) // 1秒，后加入的任务
]

const poolFn = new Pool(5)
poolFn
  .runAll(tasks)
  .then((result) => {
    console.log('all task is completed')
    console.log(result)
  })
  .catch(() => {})
