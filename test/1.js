class PromisePool {
  constructor(maxConcurrent) {
    this.maxConcurrent = maxConcurrent
    this.currentCount = 0
    this.queue = []
    this.results = []
    this.index = 0
  }

  addTask(task) {
    return new Promise((resolve) => {
      const runTask = () => {
        this.currentCount++
        task()
          .then((result) => {
            this.results[this.index++] = { status: 'fulfilled', value: result }
            resolve(result)
          })
          .catch((error) => {
            this.results[this.index++] = { status: 'rejected', reason: error }
            resolve() // Resolve even if there's an error to continue the pool execution
          })
          .finally(() => {
            this.currentCount--
            if (this.queue.length > 0) {
              const nextTask = this.queue.shift()
              nextTask()
            }
          })
      }

      if (this.currentCount < this.maxConcurrent) {
        runTask()
      } else {
        this.queue.push(runTask)
      }
    })
  }

  async runAll(tasks) {
    const taskPromises = tasks.map((task) => this.addTask(task))
    await Promise.all(taskPromises)
    return this.results
  }
}

const delay = (ms, shouldFail = false) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(ms)
      resolve(`Result after ${ms}ms`)
    }, ms)
  })

const pool = new PromisePool(5)

const tasks = [
  () => delay(2000), // 2秒
  () => delay(6000), // 6秒
  () => delay(7000), // 7秒
  () => delay(8000), // 8秒
  () => delay(9000), // 9秒
  () => delay(1000) // 1秒，后加入的任务
]

pool
  .runAll(tasks)
  .then((results) => {
    console.log('All tasks completed')
    console.log('Results:', results)
  })
  .catch((error) => {
    console.error('An error occurred:', error)
  })
