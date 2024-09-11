/**
 * 事件触发器类
 * 包含事件绑定，事件触发以及移除
 */
class EventEmiter {
  constructor() {
    this.listeners = {}
  }
  // 监听函数
  on(event, fn) {
    if (this.listeners[event]) {
      this.listeners[event].push(fn)
    } else {
      this.listeners[event] = [fn]
    }
  }
  // 触发
  emit(event, ...args) {
    if (this.listeners[event]) {
      this.listeners[event].forEach((fn) => {
        fn.apply(this, args)
      })
    }
  }
  // 移除监听
  remove(event) {
    delete this.listeners[event]
  }
}
const eventHub = new EventEmiter()

eventHub.on('test', (data) => {
  console.log(data)
})

eventHub.emit('test', 1)
eventHub.emit('test', 2)
