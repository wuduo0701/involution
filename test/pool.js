const delay = (ms) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('promise is resolve after' + ms + 'ms')
    }, ms)
  })
}
class Pool {
  constructor(max) {
    this.max = max
    this.queue = []
    this.count = 0
    this.results = []
  }
  add(task, index) {
    return new Promise((resolve) => {
      const runTask = () => {
        this.count++

        task()
          .then((result) => {
            this.results[index++] = result
            resolve()
          })
          .catch((error) => {
            this.results[index++] = { error }
            resolve()
          })
          .finally(() => {
            this.count--
            if (this.queue.length > 0) {
              const nextTask = this.queue.shift()
              nextTask()
            }
          })
      }
      if (this.count < this.max) {
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

const tasks = [
  () => delay(2000),
  () => delay(4000),
  () => delay(5000),
  () => delay(6000),
  () => delay(7000),
  () => delay(1000)
]
const pool = new Pool(5)
pool.runAll(tasks).then((result) => {
  console.log('all task is completed')
  console.log(result)
})
