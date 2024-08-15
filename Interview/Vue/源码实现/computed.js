/**
 * computed 源码实现
 * 1.
 */
import Watcher from './Watcher'

const noop = () => {} // 空函数
// computed初始化的Watcher传入lazy: true，就会触发Watcher中的dirty值为true
const computedWatcherOptions = { lazy: true }
//Object.defineProperty 默认value参数
const sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
}

// 初始化computed
class initComputed {
  // vm vue实例，computed对象
  constructor(vm, computed) {
    //新建存储watcher对象，挂载在vm对象执行。（初始化 computed 属性）
    const watchers = (vm._computedWatchers = Object.create(null))
    for (const key in computed) {
      const userDef = computed[key]
      //getter值为computed中key的监听函数或对象的get值
      let getter = typeof userDef === 'function' ? userDef : userDef.get

      // 新建computed watcher
      watchers[key] = new Watcher(vm, getter, noop, computedWatcherOptions)

      if (!(key in vm)) {
        // 定义计算属性
        this.defineComputed(vm, key, userDef)
      }
    }
  }
  // 重新定义计算属性  对get和set劫持
  // 利用Object.defineProperty来对计算属性的get和set进行劫持
  defineComputed(target, key, userDef) {
    if (typeof userDef === 'function') {
      sharedPropertyDefinition.get = this.createComputedGetter(key)
      sharedPropertyDefinition.set = noop
    } else {
      sharedPropertyDefinition.get = userDef.get || noop
      sharedPropertyDefinition.set = userDef.set || noop
    }
    Object.defineProperty(target, key, sharedPropertyDefinition)
  }

  // 计算属性的getter 获取计算属性的值时会调用
  createComputedGetter(key) {
    return function () {
      // 获取对应的计算属性watcher
      const watcher = this._computedWatchers && this._computedWatchers[key]
      if (watcher) {
        // dirty为true,计算属性需要重新计算
        if (watcher.dirty) {
          watcher.evaluate()
        }
        // 获取依赖
        if (Dep.target) {
          watcher.depend()
        }
        //返回计算属性的值
        return watcher.value
      }
    }
  }
}
