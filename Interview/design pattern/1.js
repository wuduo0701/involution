// > 存在一个发布-订阅中心（调度中心），发布者可以把事件发布到调度中心，订阅者也可以把自己想订阅的事件注册到调度中心。当事件发生时，「发布-订阅中心」会将事件通知给所有注册了该事件处理函数的订阅者，然后订阅者就可以处理该事件了。
// > 核心思想在于解耦事件的发生和处理。使得订阅者和发布者不存在依赖关系，提高程序的灵活性和可维护性

// 发布-订阅中心
class PubAndSub {
  constructor() {
    this.messageList = {}
    this.listenerList = {}
  }
  // 发布者 - 发布事件
  publish(type, content) {
    if (this.messageList[type] === undefined) {
      this.messageList[type] = [content] // 不存在此类事件、注册这类
    } else {
      this.messageList[type].push(content) // 增加事件
    }
  }
  // 订阅者 - 添加订阅事件
  subscribe(type, cb) {
    if (this.listenerList[type] === undefined) {
      this.listenerList[type] = [cb]
    } else {
      this.listenerList[type].push(cb)
    }
  }
  // 通知
  notify(type) {
    const messages = this.messageList[type]
    const subscribers = this.listenerList[type] || []

    subscribers.forEach((cb, index) => cb(messages[index]))
  }
}
// 发布者
class Publisher {
  constructor(name, context) {
    this.name = name
    this.context = context
  }
  publish(type, content) {
    this.context.publish(type, content)
  }
}
// 订阅者
class Subscriber {
  constructor(name, context) {
    this.name = name
    this.context = context
  }
  subscribe(type, cb) {
    this.context.subscribe(type, cb)
  }
}

const TYPE_A = 'music'
const TYPE_B = 'movie'

const pubsub = new PubAndSub()

const publisherA = new Publisher('publisherA', pubsub)
const publisherB = new Publisher('publisherB', pubsub)
publisherA.publish(TYPE_A, 'music1')
publisherA.publish(TYPE_B, 'movie1')
publisherB.publish(TYPE_A, 'music2')

const subscriberA = new Subscriber('subscriberA', pubsub)
const subscriberB = new Subscriber('subscriberB', pubsub)
const subscriberC = new Subscriber('subscriberC', pubsub)

subscriberA.subscribe(TYPE_A, (res) => {
  console.log('subscriberA received', res)
})
subscriberB.subscribe(TYPE_B, (res) => {
  console.log('subscriberB received', res)
})
subscriberC.subscribe(TYPE_A, (res) => {
  console.log('subscriberC received', res)
})
pubsub.notify(TYPE_A)
pubsub.notify(TYPE_B)
