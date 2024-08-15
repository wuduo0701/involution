# Computed

> 计算属性，基于其他响应式数据的变化自动更新
> 具有以下特点：
>
> 1. 缓存。只有当依赖的数据变化时，缓存才会失效并重新计算
> 2. 依赖追踪：Vue 会自动追踪 computed 属性的依赖，并在依赖变化时重新计算

## computed 原理

1. 初始化计算属性时，遍历 computed 对象，给其中每一个计算属性分别生成唯一 `computed watcher`
2. 初始化时，计算属性并不会立即计算，只有当获取的计算属性值才会进行对应计算
3. 初始化计算属性时，将 `Dep.target` 设置成当前的 `computed watcher`，将 `computed watcher` 添加到所依赖 data 值对应的 dep 中（依赖收集的过程），然后计算 computed 对应的值，后将 dirty 改成 false
4. 当所依赖 data 中的值发生变化时，调用 set 方法触发 dep 的 notify 方法，将 computed watcher 中的 dirty 设置为 true
5. 下次获取计算属性值时，若 dirty 为 true, 重新计算属性的值
6. dirty 是控制缓存的关键，当所依赖的 data 发生变化，dirty 设置为 true，再次被获取时，就会重新计算

# Watch

> 监听属性。watch 选项用于观察和响应数据的变化
> 具有以下特点：
>
> 1. 直接响应：watch 选项不会缓存值，而是直接响应数据的变化。
> 2. 回调函数：当被观察的数据变化时，watch 会调用指定的回调函数。

## watch 原理

1. 遍历 watch 对象， 给其中每一个 watch 属性，生成对应的 user watcher
2. 调用 watcher 中的 get 方法，将 Dep.target 设置成当前的 user watcher，并将 user watcher 添加到监听 data 值对应的 dep 中（依赖收集的过程
3. 当所监听 data 中的值发生变化时，会调用 set 方法触发 dep 的 notify 方法，执行 watcher 中定义的方法
4. 设置成 deep：true 的情况，递归遍历所监听的对象，将 user watcher 添加到对象中每一层 key 值的 dep 对象中，这样无论当对象的中哪一层发生变化，wacher 都能监听到。通过对象的递归遍历，实现了深度监听功能

# computed 和 watch 的区别

1. 计算属性本质上是 computed watcher，而 watch 本质上是 user watcher（用户自己定义的 watcher）
2. computed 有缓存的功能，通过 dirty 控制
3. wacher 设置 deep：true，实现深度监听的功能
4. computed 可以监听多个值的变化
