/**
 *  Vue 响应式系统的核心源码，用于依赖追踪和更新
 */

import { queueWatcher } from './scheduler'

export default class Watcher {
  constructor(vm, expOrFn, cb, options) {
    this.vm = vm
    this.getter = expOrFn
    this.cb = cb
    this.dirty = true // 对于 computed 属性，初始值为 true
    this.value = this.lazy ? undefined : this.get()
  }

  get() {
    Dep.target = this
    const value = this.getter.call(this.vm, this.vm)
    Dep.target = null
    return value
  }

  evaluate() {
    this.value = this.get()
    this.dirty = false
  }

  depend() {
    if (Dep.target) {
      this.deps.forEach((dep) => dep.depend())
    }
  }

  update() {
    if (this.lazy) {
      this.dirty = true
    } else if (this.sync) {
      this.run()
    } else {
      queueWatcher(this)
    }
  }

  run() {
    const value = this.get()
    if (value !== this.value) {
      const oldValue = this.value
      this.value = value
      this.cb.call(this.vm, value, oldValue)
    }
  }
}
