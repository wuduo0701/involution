/**
 * 异步更新源码实现
 * 1.通过一个队列（queue）来收集需要更新的 watcher。
 * 2.使用 nextTick 函数来异步执行这些更新
 */
import nextTick from './nextTick' // 引入nextTick

// 定义watcher类
class Watcher {
  update() {
    // 放到watcher队列中，异步更新
    queueWatcher(this)
  }
  // 触发更新
  run() {
    this.get()
  }
}
// 初始化数据
let queue = [] // 需要更新的watcher队列
let has = {} // 保存已经存在的watcher
let pending = false // 异步队列是否在执行

// 队列中添加watcher
function queueWatcher(watcher) {
  const { id } = watcher
  // 判断是否存在，去重
  if (!has(id)) {
    queue.push(watcher)
    has[id] = true
    // 异步队列未在执行
    if (!pending) {
      pending = true
      nextTick(flushSchedulerQueue)
    }
  }
}
// 执行watcher队列的任务
function flushSchedulerQueue() {
  queue.forEach((watcher) => {
    const { id } = watcher
    has[id] = null // 重新置空
    watcher.run()
    if (watcher.options.render) {
      // 在更新之后执行对应的回调: 这里是updated钩子函数
      watcher.cb()
    }
  })
  resetSchedulerState()
}
function resetSchedulerState() {
  queue = []
  has = {}
  pending = false
}
