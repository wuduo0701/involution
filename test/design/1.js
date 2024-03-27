class PubAndSub {
  constructor() {
    this.messageList = {}
    this.listenerList = {}
  }
  publish(type, content) {
    if (!this.messageList[type]) {
      this.messageList[type] = []
    }
    this.messageList[type].push(content)
  }
  subsciber(type, cb) {
    if (!this.listenerList[type]) {
      this.listenerList[type] = []
    }
    this.listenerList[type].push(cb)
  }
  notify(type) {
    const messages = this.messageList[type]
    const listeners = this.listenerList[type] || []
    listeners.forEach((cb, index) => cb(messages[index]))
  }
}
class Publisher {
  constructor(name, context) {
    this.name = name
    this.context = context
  }
  publish(type, content) {
    this.context.publish(type, content)
  }
}
class Subcriber {
  constructor(name, context) {
    this.name = name
    this.context = context
  }
  subsciber(type, cb) {
    this.context.subsciber(type, cb)
  }
}

const TYPE_A = 'movie'
const TYPE_B = 'music'
const pubsub = new PubAndSub()

const publisherA = new Publisher('publisherA', pubsub)
const publisherB = new Publisher('publisherB', pubsub)
publisherA.publish(TYPE_A, 'movie1')
publisherB.publish(TYPE_B, 'music1')
publisherB.publish(TYPE_A, 'movie2')

const subsciberA = new Subcriber('subsciberA', pubsub)
const subsciberB = new Subcriber('subsciberB', pubsub)
const subsciberC = new Subcriber('subscriberC', pubsub)

subsciberA.subsciber(TYPE_A, (res) => {
  console.log(res)
})
subsciberB.subsciber(TYPE_B, (res) => {
  console.log(res)
})
subsciberC.subsciber(TYPE_A, (res) => {
  console.log('subscriberC received', res)
})

pubsub.notify(TYPE_A)
pubsub.notify(TYPE_B)
