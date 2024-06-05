// 发布者
function Subject() {
  this.observers = []
  this.attach = function (callback) {
    this.observers.push(callback)
  }
  this.notify = function (value) {
    this.observers.forEach((callback) => callback(value))
  }
}

// 订阅者
function Observer(queue, key, callback) {
  queue[key].attach(callback)
}

// 数据拦截器
function Watcher(data, queue) {
  for (let key in data) {
    let value = data[key]
    Object.defineProperty(data, key, {
      enumerable: true,
      configurable: true,
      get: () => value,
      set: (newValue) => {
        value = newValue

        // 通知此值的所有订阅者，数据发生了更新
        queue[key].notify(value)
      }
    })
  }
  return data
}

// 消息队列
const messageQueue = {}

// 数据
const myData = Watcher({ value: '', label: '' }, messageQueue)

// 将每个数据属性都添加到观察者的消息队列中
for (let key in myData) {
  messageQueue[key] = new Subject()
}

// 订阅 value 值的变化
Observer(messageQueue, 'value', (value) => {
  console.warn('value updated:', value)
})
Observer(messageQueue, 'label', (label) => {
  console.warn('value updated:', label)
})

// 更新数据
// myData.value = 'hello world.'
// myData.value = 100
// myData.value = true
Object.assign(myData, { value: 'hello', lable: '哈喽' })
Object.assign(myData, { value: 100, lable: '一百' })
