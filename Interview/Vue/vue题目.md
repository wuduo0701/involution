# mvc 和 mvvm 理解

## MVC

> Model View Controller。通过 controller 的控制去操作 model 层的数据，并且返回给 view 层展示。

## MVVM

> MVVM 即 Model-View-ViewModel，Model 层代表数据模型，View 代表 页面，ViewModel 是 View 和 Model 层的桥梁。
> 简单理解：即双向绑定模型。数据驱动页面，页面通知更新数据。
> model 就数据，view 是页面，vm 就是 vue 框架。程序员只需要更新数据，处理都交给了框架，页面的数据就会相应更新。

## 不同点

1. ViewModel 替换了 Controller，在 UI 层之下
2. ViewModel 向 View 暴露它所需要的数据和指令对象
3. MVC 框架。开发者在代码中大量调用相同的 DOM API，处理繁琐 ，操作冗余，使得代码难以维护
4. 操作更加简单。
   1. Model 频繁发生变化，开发者需要主动更新到 View。
   2. 当用户的操作导致 Model 发生变化，开发者同样需要将变化的数据同步到 Model 中

# Vue 组件中 data 为什么必须是一个函数？

1. 因为组件是可以复用的,JS 里对象是引用关系,如果组件 data 是一个对象,那么子组件中的 data 属性值会互相污染,产生副作用。
2. 所以一个组件的 data 选项必须是一个函数,因此每个实例可以维护一份被返回对象的独立的拷贝

# vue 给对象新增属性页面没有响应

vue 只会在初始化的时候执行响应式转化，对于新增/删除的属性，vue 无法监听到。必须手动使用 `$set` 来触发

# $set 原理

1. 对于数组，会调用重写过的 splice 方法进行手动 Observe
2. 对于对象，如果 key 本来就是对象的属性，则直接修改值触发更新，否则调用 defineReactive 方法重新定义响应式对象
3. 如果 target 本身就不是响应式,直接赋值
4. 如果属性不是响应式,则调用 defineReactive 方法进行响应式处理

# scoped 属性作用

1. 让 css 样式只能用于当前的 Vue 组件，避免组件之间不互相污染
2. 原理就是给每一个 dom 元素添加了一个独一无二的动态属性

## 如何修改 scoped 中的样式

1. /deep/ 或者 ::v-deep
2. 使用两个 style 标签
3. 尽量不用，如要使用尽量用全局

# 组件通信

## 父子通信

- 父传子
  - Props
    在子组件上定义需要接受的 props，然后父组件在使用子组件上传递相应的参数
    <!-- TODO:待调研 -->
  - v-model【语法糖】
  ```js
  // v-model是Vue中一个比较出色的语法糖，就比如下面这段代码
  <ChildComponent v-model:title="pageTitle" />
  // 就是下面这段代码的简写形式
  <ChildComponent :title="pageTitle" @update:title="pageTitle = $event" />
  ```
  ```js
  const props = defineProps({
    list: {
      type: Array,
      default: () => []
    }
  })
  const emits = defineEmits(['update:list'])
  ```
- 子传父

  - emit
    在子组件中点击【添加】按钮后，emit 一个自定义事件，并将添加的值作为`参数`传递
    ```js
    const emits = defineEmits(['add']) // 触发的事件
    const handleSubmit = () => {
      // 向父组件派发事件，事件名字叫 add
      emits('add', value.value)
      value.value = ''
    }
    ```
  - refs
    <!-- 通过ref的方式获取组件或者元素 -->

    ```html
    <template>
      <!-- ref的值 与 父组件 <script> 中的 某个ref 保持一致 -->
      <child-components ref="childRefs"></child-components>
    </template>
    <script setup>
      import { ref } from 'vue'
      import ChildComponents from './child.vue'

      const childRefs = ref(null) // 代表的就是获取到的子组件
    </script>
    ```

### 兄弟/父子/全局 通信

- vuex/pinia
  状态管理工具。
- provide/inject
  - provide
    父组件提供，提供数据的一方。尽量用`readonly`包装，避免被其他组件修改
  - inject
    子组件接收，接收数据的一方。
- eventbus
  事件总线。但在 vue3 已经移除了，但是可以通过第三方库调用，如 `mitt` 或 `tiny-emitter`

  Q: 为什么移除`eventbus`
  A: 1、 难以追踪数据变化 2、命名问题。事件通信并不存在命名空间 3、生命周期。太过于依赖组件的加载与卸载，如未卸载，可能会存在内存泄漏的危险

# VueJS 与 ReactJS 相比有什么优势 ？

1. Vue 更小且更快
2. 方便的模板简化了开发过程
3. 相比学习 JSX 它有更简单的 JavaScript 语法
4. 深受国内企业和开发者喜爱

# ReactJS 与 VueJS 相比有什么优势 ？

1. ReactJS 在大型应用程序开发中提供了更大的灵活性
2. 易于测试
3. 非常适合创建移动应用程序
4. 生态系统规模大，成熟度高

# vue 和 react 的相同点和不同点

## 相同点

1.  都是响应式，推崇单向数据流
2.  都使用 Virtural DOM
3.  都使用组件化思想，流程基本一致
4.  都支持服务端渲染

## 不同点

1. 语法不同。vue 使用的是模版语法，react 使用的是 JSX 语法。模版语法相当于原生 js 更简单
2. 数据流不同。vue 是双向数据绑定，react 是单向数据流。
3. 响应式原理不同。
   1. vue 的响应式特点是依赖收集，自动派发更新，数据可变。
   2. react 则是基于状态，单向数据流，数据不可变。
4. diff 算法不同。
   1. vue2 中采用的整体策略为：深度优先，同层比较。采用的是双端比较法
   2. vue3 则在原基础上增加了静态标记、treesharking 等，进一步提升速度
   3. React 是递归同层比较，标识差异点保存到 Diff 队列保存，得到 patch 树，再统一操作批量更新 DOM。这块没看过源码，了解比较少

# vue 响应式原理

> vue 采用数据劫持结合发布-订阅模式,通过 `Object.defineproperty` 来劫持各个属性的 setter,getter，在数据变动时发布消息给订阅者,触发响应的监听回调.
> 整个响应式最核心的就是 Dep 收集的实现，它实际上是连接数据和数据对应观察者的桥梁。

1. 对于 data 和 props 会通过 observe 或 defineReactive，把他们变成响应式的数据。
   1. 内部会持有一个 dep 依赖，如果有访问这些响应式的数据，就会把这些依赖进行收集，即订阅者
   2. 当去修改这些数据的时候，就会通过调用 notify 方法来通知我们这些订阅者去做 updata 的逻辑
2. 对于 computed，初始化时遍历 computed 对象，给每一个计算属性分别生成唯一 `computed watcher`。他既是订阅者又是发布者
   1. 初始化不会进行计算，只要当访问的时候才会计算并进行依赖收集，即订阅者
   2. 将 `computed watcher` 添加到所依赖 data 值对应的 dep 中，如果 data 更新，会通知 computed 进行更新
   3. 同时结果如果变了，就会调用 notify 通知订阅 computed 变化的这些订阅者来触发它们的更新。
3. 对于 watch，初始化会创建一个 user watcher
   1. 原理类似 computed。因为他们也是一个 watcher
   2. 他会监听所观察的对象，进行相应的操作
4. vue 的渲染就是基于响应式系统的。对于每一个组件都有一个 `render watcher`
   1. 页面上会订阅 props,data 等，作为订阅者订阅去订阅数据变化
   2. 一旦被通知更新，就会触发 `render watcher` 的 update 方法。在执行 run 方法的过程中，实际上最后会调用 `updateComponent` 方法重新去做一次渲染
   3. 涉及 patch 和 diff 算法。

data 和 props 的变化通过 Vue 的响应式系统来管理，Vue 使用 Dep 来收集依赖并通知相关的 Watcher
Watcher 只有三种：computed、watch、render

# Vue 是如何实现数据双向绑定的

1. 数据劫持
   1. Vue 使用“响应式系统”的机制来实现双向绑定。在 Vue 组件实例化时，Vue 会遍历组件的数据对象，将其转换为响应式对象。
   2. 通过`Object.defineProperty` 方法来劫持对象的 getter 和 setter
2. 监听器和依赖收集
   1. 劫持过程中，会为每一个属性创建依赖收集器，会收集哪些访问属性。即订阅者
   2. 当属性的值发生变化时，Vue 就能够通知这些观察者，从而触发相应的更新。
3. 模板编译
   1. 在组件的渲染过程中，Vue 会将组件的模板编译为渲染函数。在编译过程中，Vue 会解析模板中的指令和表达式，并生成对应的更新函数
4. 更新视图
   1. 每一个组件都有一个 `render watcher`。Vue 会根据之前收集的依赖关系，触发对应组件的更新，并做组件渲染，实现视图的更新
5. 用户交互和事件处理
   1. 在视图更新的同时，Vue 还会监听用户的交互事件，如点击、输入等。

# Vue 异步更新原理

1. Vue 数据发生变化之后，不会立即更新 dom，而是异步更新的
2. 侦听到数据变化，Vue 将开启一个队列，并缓存在同一事件循环中发生的所有数据变更（优化性能）
3. 如果同一个 watcher 被多次触发，只会被推入到队列中一次，可以避免重复修改相同的 dom，这种去除重复数据，对于避免不必要的计算和 DOM 操作是非常重要的
4. 同步任务执行完毕，开始执行异步 watcher 队列的任务，一次性更新 DOM

### 具体更新过程

1. 当你修改数据时，Vue 会将更新任务推入一个队列。
2. 在同一个事件循环中，Vue 会合并所有的更新，确保只进行一次 DOM 更新。
3. 使用 Promise 、 MutationObserver 、setImmediate 、setTimeout(fn, 0) 来处理微任务。当当前的任务完成后，Vue 会执行队列中的更新任务。任务优先级依次降低

# keep-alive 原理

1. keep-alive 在 vue 中用于实现组件的缓存，当组件切换时不会对当前组件进行卸载
2. 支持的属性
   1. include - 字符串或正则表达式。只有名称匹配的组件会被缓存。
   2. exclude - 字符串或正则表达式。任何名称匹配的组件都不会被缓存。
   3. max - 数字。最多可以缓存多少组件实例。超出上限使用 LRU 的策略置换缓存数据。其作用就是使用 LRU 的策略防止缓存大量组件，占用大量内存。
3. 采用的是 `LRU算法(最近最少使用)`
   1. 判断缓存中是否已缓存了该实例，缓存了则直接获取，并调整 key 在 keys 中的位置（移除 keys 中 key ，并放入 keys 数组的最后一位）
   2. 如果没有缓存，则缓存该实例，若 keys 的长度大于 max （缓存长度超过上限），则移除 keys[0] 缓存

## 缓存后如何获取数据？

1. beforeRouteEnter
   每次组件渲染的时候，都会执行 beforeRouteEnter
2. actived
   在 keep-alive 缓存的组件被激活的时候，都会执行 actived 钩子

# 在 vue2 中，为什么 v-if 和 v-for 不建议同时作用于同一个标签

因为 v-for 的优先级高于 v-if，如果同时使用的话。都会把一些不符合 v-if 条件的元素渲染出来，达不到优化的目的。所以建议 vue2 中不要同时使用 v-if 和 v-for。可以把数据用 computed 进行包裹，去除不符合条件的数据。就不会重新渲染了

# SSR 和 SSG

## SSR

SSR 是指在服务器端生成完整的 HTML 页面，然后将其发送到客户端浏览器进行展示。

- 优点
  1. SEO 友好：因为搜索引擎爬虫可以直接抓取到完整的 HTML 内容。
  2. 首屏渲染快：用户可以更快地看到页面内容，因为 HTML 是由服务器生成的。
- 缺点
  1. 服务器负载高
  2. 响应时间可能较长

## SSG（静态站点生成）

构建时生成，交给服务端渲染，不需要在每次请求时动态生成

- 优点

1.  性能高：因为页面是静态的，服务器只需返回静态文件，响应时间非常快。
2.  服务器负载低：静态文件可以由 CDN 分发，减少服务器负载。
3.  安全性高：没有动态内容生成，减少了潜在的安全漏洞。

- 缺点：

1. 不适合频繁更新的内容：如果页面内容频繁变化，需要重新构建和部署，增加了维护成本
2. 初始构建时间长：对于大型网站，构建所有静态页面可能需要较长时间。

# Vue 更新数据后的一系列流程

1. 更新数据。vue 的响应式系统（object.defineProperty、proxy）捕获变化
2. 依赖收集。响应式数据会触发 set，Vue 会为每个数据进行依赖收集
3. 通知更新。数据变化后，Vue 会通知所有依赖于该数据的 Watcher 实例。
4. 异步队列。vue 会开启一个异步队列，缓存本次事件循环的页面更新。
   1. 缓存本轮所有的页面更新，并进行合并操作
   2. 避免不必要的数据更新
5. 执行更新。render Watcher 会重新执行组件的渲染函数，生成新的虚拟 DOM。
   1. 异步队列的所有事件处理完后，才会调用 render Watcher 执行渲染函数
   2. 每个 Vue 组件都有一个渲染函数
   3. h 函数执行虚拟 dom 生成
   4. 重新收集依赖
6. diff 和 patch 更新。比较新旧两棵树的差异，以最小化的代价更新 dom
7. 更新 DOM。更新实际 dom，页面数据得到更新

## 总结

1. 响应式数据变更，触发 set 逻辑
2. 把在依赖过程中订阅的的所有观察者，也就是 watcher，都触发它们的 update 过程
3. 开启任务队列，把本轮事件缓存起来，并进行合并。等队列执行完后再执行所有 watcher 的 run。
4. 执行更新。执行 render watcher，生成新的虚拟 dom，并执行新的依赖收集
5. 新旧 dom 执行 diff 和 patch 更新
6. 实际更新 dom

# vue 的常见优化手段

1. 使用 v-if 和 v-show
2. 合理使用 computed 和 watch
3. 组件懒加载。使用动态 import() 动态加载组件
4. v-for 使用唯一 key 值
5. 使用 keep-alive 组件
6. 避免不必要的响应式数据

# vue 为什么要用虚拟 dom

1. 性能优化。vue 以虚拟 dom 通过 diff 和 patch 算法，计算出最小的变化，以最小的代价更新 DOM。比直接操作 DOM 更加有效
2. 跨平台能力。虚拟 DOM 是 JS 的一个抽象层，和平台无关，能让 vue 在不同平台运行
3. 简化开发。不需要手动操作 DOM，vue 会帮开发者自动处理数据和 UI 的变化，简化开发流程

## 为什么有些框架不用虚拟 DOM 能更快

如 Svelte，他主要做了如下优化

1. 编译时优化。构建阶段 Svelte 将组件编译成高效的原生 JavaScript 操作，直接操作 DOM。
   1. 减少了 diff 和 patch 的比对，直接更新 dom
2. 更少的抽象层。省略了中间层的步骤，直接生成 DOM 操作
3. 细粒度更新。在编译时就能确定哪些部分需要更新，从而生成相应的 dom 操作
4. 一个框架的权衡。在性能和开发体验之间取得平衡。

# computed 和 watch

1. 计算属性本质上是 computed watcher。
   1. 惰性计算（有地方读取了计算属性，才会真正计算），即判断有没有订阅者
   2. 脏检测（dirty 属性，判断是否需要重新求值。依赖的状态发生改变，会改变 dirty。如果没。则直接返回）
2. 侦听属性本质上是 user watcher
   1. deep、sync、immediate 属性
   2. 适用于观测某个值的变化去完成一段复杂的业务逻辑
