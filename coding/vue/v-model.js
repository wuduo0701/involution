// 发布者
function Subject() {
  // 所有订阅者
  this.observers = []

  // 添加一个订阅者
  this.attach = function (callback) {
    this.observers.push(callback)
  }

  this.notify = function () {
    this.observers.forEach((callback) => callback(value))
  }
}
