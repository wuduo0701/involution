# 全新的响应式系统

> vue2 中使用 Object.defineProperty 做拦截
> vue3 使用 Proxy

## Vue2 的响应式系统

> 基于 `Object.defineProperty` 劫持对象的属性：

1. Vue 2 的响应式系统是基于 Object.defineProperty 实现的。它通过递归遍历对象的每个属性，并使用 Object.defineProperty 重新定义这些属性的 getter 和 setter。
2. 当属性被访问时，getter 会被触发，Vue 会将这个属性记录为依赖。
3. 当属性被修改时，setter 会被触发，Vue 会通知所有依赖这个属性的观察者进行更新。

### 局限性

1. **无法检测新增或删除的属性**
   1. 这就是为什么所有的响应对象必须在 data 中定义
   2. 因为 Object.defineProperty 必须在对象已经存在的属性上工作，所以 Vue 2 无法检测到对对象属性的新增或删除。需要使用 Vue.set 和 Vue.delete 来显式地添加或删除属性。
2. 数组变动的检测：
   1. Vue 2 不能检测到数组的直接变动（如通过索引直接修改数组元素）。
   2. 为了监听数组变动，Vue 2 包装了一些数组方法（如 push、pop、shift、 unshift、splice、sort 和 reverse）以确保这些方法能够触发响应式更新。
   3. 7 中方法中`push、unshift、splice` 因为都是新增属性，需要手动触发响应式。实现数组的深度监听
3. 性能问题： 对于大对象和深层嵌套的对象，Vue 2 的响应式系统可能会有性能问题，因为它需要递归遍历并重新定义所有属性。

### $set 原理

1. 对于数组，会调用重写过的 splice 方法进行手动 Observe
2. 对于对象，如果 key 本来就是对象的属性，则直接修改值触发更新，否则调用 defineReactive 方法重新定义响应式对象

### Object.defineProperty 本身是可以监听数组变化

`Object.defineProperty` 本身是可以监控到数组下标的变化的，只是在 Vue 的实现中，从性能 / 体验的性价比考虑，放弃了这个特性。

object.defineProperty 在数组中的表现和在对象中的表现是一致的，数组的索引就可以看做是对象中的 key。

1. 通过索引访问或设置对应元素的值时，可以触发 getter 和 setter 方法。
2. 通过 push 或 unshift 会增加索引，对于新增加的属性，需要再手动初始化才能被 observe。
3. 通过 pop 或 shift 删除元素，会删除并更新索引，也会触发 setter 和 getter 方法。

Object.defineProperty 是有监控数组下标变化的能力的，只是性能代价和获得的用户体验收益不成正比， Vue2.x 放弃了这个特性。

## vue3 的响应式系统

> Vue 3 的响应式系统是基于 `Proxy` 实现的

1. Proxy 是 ES6 引入的一种新特性，它允许开发者创建一个对象的代理，并定义对该对象的基本操作（如读取、写入、删除属性等）的自定义行为。
2. 通过 Proxy，Vue 3 可以直接监听对象的属性访问和修改，而不需要递归遍历对象的每个属性。
3. Proxy 可以直接监听新增和删除属性的操作，使得响应式系统更加直观和高效。
4. Proxy 有多达 13 种拦截方法,不限于 apply、ownKeys、deleteProperty、has 等等，这是 Object.defineProperty 不具备的

## Object.defineProperty 和 Proxy 的不同

1. `Object.defineProperty` 只能劫持对象的属性，而 `Proxy` 是直接代理对象（劫持整个对象），并返回一个新对象，我们可以只操作新的对象达到响应式目的
2. `Object.defineProperty` 对新增属性需要手动进行 Observe
   由于 Object.defineProperty 劫持的是对象的属性，所以新增属性时，需要重新遍历对象，对其新增属性再使用 Object.defineProperty 进行劫持。
3. proxy 可以更好的支持监听数组。
   1. 可以监听数组，不用再去单独的对数组做特异性操作

# Fragments 支持

1. Vue 2 不支持在模板中返回多个根元素。
2. Vue 3 引入了 Fragments，允许组件模板返回多个根元素，简化了模板结构。

# composition Api

> vue3 采用的事 composition Api，也就是组合式 api，通过这种形式，我们能够更加容易维护我们的代码，将相同功能的变量进行一个集中式的管理

1. vue2 中，存在 data，method 等对象，需要把特点属性和方法维护在这个大对象中。也就是 options API
2. vue3 中使用的 composition Api。可以把相同功能的变量进行集中维护
   1. Composition API 中见不到 this 的使用，减少了 this 指向不明的情况

# 生命周期变化

消除了 create 步骤的生命周期，

## Vue2

> beforeCreate -> created -> beforeMounte -> mounted -> beforeUpdate -> updated -> beforeDestroy -> destroyed

- 创建(beforeCreate、 created) —— 在组件的创建上运行
- 挂载(beforeMounte、 mounted) —— 在挂载 DOM 时运行
- 更新(beforeUpdate、 updated) —— 修改反应性数据后运行
- 销毁(beforeDestroy、 destroyed) —— 在元素被销毁之前立即运行。
- 错误捕捉(errorCaptured)

## Vue3

> setup -> setup -> onBeforeMounte -> onMounted -> onBeforeUpdate -> onUpdated -> onBeforeUnmounted -> onUnmounted

- 创建(beforeCreate、 created) —— 在组件的创建上运行
- 挂载(beforeMounte、 mounted) —— 在挂载 DOM 时运行
- 更新(beforeUpdate、 updated) —— 修改反应性数据后运行
- 销毁(beforeDestroy、 destroyed) —— 在元素被销毁之前立即运行。
- 错误捕捉(onErrorCaptured)

# Teleport 组件

> 传送门组件。提供了一种一流的方式来将子级渲染到父组件的 DOM 层级之外的 DOM 节点中。是一种处理模态、弹出窗口以及页面顶部组件的非常好用的方法。通过 Teleport，你可以确保没有任何主机组件 CSS 规则会影响你要显示的组件，也无需使用 z-index 搞些小动作了。

# v-model 指令使用的改变

1. 变化 1：绑定默认的 modelValue 的属性和 update:modelValue 的事件
2. 变化 2：v-model 是可以传递参数的，传递的参数是绑定的 modelValue 属性的替代品
3. 变化 3：可以绑定多个 v-model 的值

# v-for 与 v-if 优先级

1. 在 Vue 2 中，v-for 的优先级高于 v-if
2. 在 Vue 3 中，v-if 的优先级高于 v-for

# 相关题目

## 在 vue2 中，为什么 v-if 和 v-for 不建议同时作用于同一个标签

因为 v-for 的优先级高于 v-if，如果同时使用的话。都会把一些不符合 v-if 条件的元素渲染出来，达不到优化的目的。所以建议 vue2 中不要同时使用 v-if 和 v-for。可以把数据用 computed 进行包裹，去除不符合条件的数据。就不会重新渲染了

## vue3 性能提升

### diff 算法优化

> vue3 在 diff 算法中相比 vue2 增加了静态标记

关于这个静态标记，其作用是为了会发生变化的地方添加一个 flag 标记，下次发生变化的时候直接找该地方进行比较
标记静态节点的 p 标签在 diff 过程中则不会比较，把性能进一步提高

### 静态提升

```html
<div>
  <!-- 需提升 -->
  <div>foo</div>
  <!-- 需提升 -->
  <div>bar</div>
  <div>{{ dynamic }}</div>
</div>
```

没有必要在重新渲染时再次创建和比对它们。Vue 编译器自动地会提升这部分 vnode 创建函数到这个模板的渲染函数之外，并在每次渲染时都使用这份相同的 vnode，渲染器知道新旧 vnode 在这部分是完全相同的，所以会完全跳过对它们的差异比对。

### tree-shaking

> 是一种通过清除多余代码方式来优化项目打包体积的技术

1. 会把没有引入的包给移除掉，尽可能最大程度的减少打包后的体积
   ```js
   import { nextTick, observable } from 'vue'
   nextTick(() => {})
   ```
2. 减少程序执行时间（更快）
3. 便于将来对程序架构进行优化（更友好）

### Patch Flag

vue3 新增了静态标记（patchflag）与上次虚拟节点对比时，只对比带有 patch flag 的节点（动态数据所在的节点）；可通过 flag 信息得知当前节点要对比的具体内容。

### 事件侦听器缓存

默认情况下绑定事件行为会被视为动态绑定（没开启事件监听器缓存），所以每次都会去追踪它的变化。开启事件侦听器缓存后，没有了静态标记。也就是说下次 diff 算法的时候直接使用。
