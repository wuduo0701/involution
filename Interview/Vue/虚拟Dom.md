# 虚拟 DOM

> 用 JS 对象模拟真实 DOM 结构，用对象的属性（如 tag、attrs、children）描述节点。

当组件状态发生更新时，然后触发 Virtual DOM 数据的变化，然后通过 Virtual DOM 和真实 DOM 的比对，再对真实 DOM 更新。可以简单认为 Virtual DOM 是真实 DOM 的缓存。

## 优点及作用

1. 性能优化。直接操作真实 dom 的代价是很高的，频繁操作会导致回流和重绘。而 Vue `虚拟dom` 通过 `diff 算法`，比较新旧两棵树，生成差异对象。通过 `patch 算法`，以打补丁的形式进行操作，只对 dom 更新的部分进行批量操作，大大提升了性能
2. 跨平台。虚拟 DOM 是一个 JS 抽象层，与平台无关。能够在不同平台（如浏览器、移动端、服务端）上实现不同的渲染逻辑。
3. 简单方便。手动操作真实 DOM 来完成页面，繁琐又容易出错，在大规模应用下维护起来也很困难。。我们可以将 DOM 对比(diff 操作)放在 JS 层，提高效率。
   1. 我们不再需要手动去操作 DOM，只需要写好 View-Model 的代码逻辑，框架会根据虚拟 DOM 和 数据双向绑定，帮我们以可预期的方式更新视图，极大提高我们的开发效率。

## 缺点

1. 无法进行极致优化： 虽然虚拟 DOM + 合理的优化，足以应对绝大部分应用的性能需求，但在一些性能要求极高的应用中虚拟 DOM 无法进行针对性的极致优化。
2. 在一些节点较少的组件，这些遍历都是性能浪费

## 实现原理

> 主要过程分为以下三部分:
>
> 1. 用 JavaScript 对象模拟真实 DOM 树，对真实 DOM 进行抽象；
> 2. diff 算法。比较出两棵虚拟 DOM 树的差异
> 3. patch 算法。将两个虚拟 DOM 对象的差异应用到真正的 DOM 树。

## VNode 类

> vue [源码](./源码/VNode.ts) 中存在一个类，可以实例出不同类型的虚拟 DOM。定义的类型包含

1. 接收多个参数
   1. 标签名
   2. 子节点
   3. 文本节点数据
   4. 对应的真实节点
   5. context -> vue 实例
   6. key
   7. 注释节点
   8. ....
2. Vue 中 VNode 的类型：
   1. 注释节点
   2. 文本节点
   3. 元素节点
   4. 组件节点
   5. 函数式组件节点
   6. 克隆节点

### createElement

> 创建虚拟 DOM 的关键函数，向用户暴露的是 `h 函数`

1. createElement 函数接受多个参数，用于描述虚拟节点的各种属性：
   - context 表示 VNode 的上下文环境，是 Component 类型
   - tag 表示标签，它可以是一个字符串，也可以是一个 Component 类型
   - data 表示 VNode 的数据，它是一个 VNodeData 类型
   - children 表示当前 VNode 的子节点，它是任意类型的
   - normalizationType 表示子节点规范的类型，类型不同规范的方法也就不一样，主要是参考 render 函数是编译生成的还是用户手写的

## patch 算法及补丁过程

> 以新树为基准做 patch
> patch 算法可总结为以下三个主要步骤：

1. 创建节点：新的 VNode 中有而旧的 oldVNode 中没有，就在旧的 oldVNode 中创建。
2. 删除节点：新的 VNode 中没有而旧的 oldVNode 中有，就从旧的 oldVNode 中删除。
3. 更新节点：会先用 `sameVnode` 函数判断两个 Node 是否为同一个 Node
   1. 如果不是，会直接删除旧有 DOM 节点，创建新的 DOM 节点
   2. 如果是。则会执行具体 `patchVnode` 函数。
      1. 具体执行过程：新的 VNode 和旧的 oldVNode 中都有，就以新的 VNode 为准，更新旧的 oldVNode。

```js
function sameVnode(a, b) {
  return (
    a.key === b.key &&
    a.asyncFactory === b.asyncFactory &&
    ((a.tag === b.tag &&
      a.isComment === b.isComment &&
      isDef(a.data) === isDef(b.data) &&
      sameInputType(a, b)) ||
      (isTrue(a.isAsyncPlaceholder) && isUndef(b.asyncFactory.error)))
  )
}
```

### 创建节点

> 新节点 VNode 有，但是 旧节点 oldVNode 没有，从旧的 oldVNode 中创建。
> 创建节点只有三种节点能被插入到 DOM 中：元素节点、注释节点、文本节点

- 执行过程
  1. 如果是初始化会执行 `createComponent` 函数，创建整个组件。
  2. 否则会执行创建节点判断
     1. 如果是元素节点，执行 `createElement`
     2. 如果是注释节点，执行 `createComment`
     3. 如果是文本节点，执行 `createTextNode`

```js
function createElm(vnode, parentElm, refElm) {
  const data = vnode.data
  const children = vnode.children
  const tag = vnode.tag
  // 元素节点
  if (isDef(tag)) {
    vnode.elm = nodeOps.createElement(tag, vnode) // 创建元素节点
    createChildren(vnode, children, insertedVnodeQueue) // 创建元素节点的子节点
    insert(parentElm, vnode.elm, refElm) // 插入到DOM中
    // 注释节点
  } else if (isTrue(vnode.isComment)) {
    vnode.elm = nodeOps.createComment(vnode.text) // 创建注释节点
    insert(parentElm, vnode.elm, refElm) // 插入到DOM中
  } else {
    // 文本节点
    vnode.elm = nodeOps.createTextNode(vnode.text) // 创建文本节点
    insert(parentElm, vnode.elm, refElm) // 插入到DOM中
  }
}
```

### 删除节点

> 新节点 VNode 没有，但是 旧节点 oldVNode 有。从旧的 oldVNode 中删除。
> 会执行 `invokeDestroyHook` 函数，也就是组件的销毁生命周期

```ts
function removeNode(el) {
  const parent = nodeOps.parentNode(el)
  // element may have already been removed due to v-html / v-text
  if (isDef(parent)) {
    nodeOps.removeChild(parent, el)
  }
}
```

### 更新节点 patchNode

> 如果两个 VNode 被认为是同个 VNode，则不会进行 patch 过程

1. 如果 VNode 与 oldVnode 新旧节点相同，不更新，直接结束。（严格相等，判断他们指向的是不是同一个实例）
2. 如果 VNode 与 oldVnode 是静态节点，且他们的 key 相同。或者他们是克隆节点或者是 v-once 生成的节点。直接替换组件实例
3. 判断 VNode 是否是文本节点
   1. 是文本节点。
      1. oldVnode 文本和 VNode 文本不一致，则把 VNode 的文本替换到 oldVnode 的文本
      2. 否则无变化
   2. 不是文本节点
      1. VNode 与 oldVnode 均有子节点。
         1. 调用 `updateChildren` 函数。也就是 `diff 算法` 。深度优先遍历，一层一层遍历子节点
      2. 只有 VNode 有子节点
         1. 如果 oldVnode 有文本，清空它。 并添加新 VNode 的子节点
         2. 否则直接添加新 VNode 的子节点
      3. 只有 oldVnode 有子节点
         1. 删除 oldVnode 子节点
      4. 如果 VNode 与 oldVnode 都没有子节点。
         1. oldVnode 有文本，则清空 oldVnode 的文本

## diff 算法

> diff 算法是一种通过同层的树节点进行比较的高效算法。diff 整体策略为：深度优先，同层比较
> 其有两个特点：
>
> 1. 比较只会在同层级进行, 不会跨层级比较
> 2. 在 diff 比较的过程中，循环从两边向中间比较(vue 的双端比较法)

### 总结：

1. 结束循环的条件（`oldStartIdx > oldEndIdx || newStartIdx > newEndIdx`）
2. 在遍历中，如果存在 key，并且满足 sameVnode，会将该 DOM 节点进行复用(只通过移动节点顺序)，否则则会创建一个新的 DOM 节点。
3. oldStartVnode、oldEndVnode 与 newStartVnode、newEndVnode 两两比较共有`4种`比较方法：
   1. 如果 oldVnode 旧节点的开始节点或者结束节点不存在。说明已经处理过，直接移动下一节点比对
      1. 开始节点不存在，移动到下一节点。
         1. `oldStartVnode = oldCh[++oldStartIdx];`
      2. 结束节点不存在，移动到上一节点。
         1. `oldEndVnode = oldCh[--oldEndIdx];`
   2. 当新节点 vnode 和旧节点 oldVnode 的两个开始节点或者结束节点相同时。需要递归更新
      1. 新旧开始节点相同时 `sameVnode(oldStartVnode, newStartVnode)` 。
         1. 递归更新 `patchNode` 函数
         2. 移动新旧的开始节点。
            1. 移动旧节点：`oldStartVnode = oldCh[++oldStartIdx]`
            2. 移动新节点：`newStartVnode = newCh[++newStartIdx]`
      2. 新旧结束节点相同时 `sameVnode(oldEndVnode, newEndVnode)`
         1. 递归更新 `patchNode` 函数
         2. 移动新旧的开始节点。
            1. 移动旧节点：`oldEndVnode = oldCh[--oldEndIdx]`
            2. 移动新节点：`newEndVnode = newCh[--newEndIdx]`
   3. 当旧子树的开始节点与新子树的结束节点相同时。说明旧节点的 开始节点 已经跑到了旧节点的 结束节点 后面去了。需要移动旧的开始节点到旧的结束节点后面
      1. `sameVnode(oldStartVnode, newEndVnode)`
      2. patchVnode
      3. oldStartVnode 需要被移动到 oldEndVnode 的后面
      4. 举例：需要操作旧开始节点 'A' 移动到旧结束节点 'D'
      ```js
      oldList = ['A', 'B', 'C', 'D']
      newList = ['B', 'C', 'D', 'A']
      ```
   4. 当旧子树的结束节点与新子树的开始节点相同时。说明旧节点的 结束节点 跑到了 开始节点 的前面去了。需要移动旧的 结束节点 到旧的 开始节点 前面
      1. `sameVnode(oldEndVnode, newStartVnode)`
      2. patchVnode
      3. oldEndVnode 需要移动到 oldStartVnode 前面
      4. 举例：需要操作旧结束节点 'D' 移动到 旧开始节点 'A'
      ```js
      oldList = ['A', 'B', 'C', 'D']
      newList = ['D', 'A', 'B', 'C']
      ```
4. 以上都都不是。即当旧子树中没有新子树中的节点，需要寻找新起始节点在旧子节点中的位置
   1. 如果找不到，说明是新增节点，直接在最前面添加
   2. 如果找到了，说明是移动操作。则进一步通过 `sameVnode(vnodeToMove, newStartVnode)` 判断是否是同一节点
      1. 是同一节点，则通过 patchVnode 更新，并移动节点
      2. 不是同一节点，即相同的 key 不同的元素，则通过 createElm 创建新节点
   ```js
   // 1. 把旧子数的节点生成key 和 index的oldKeyToIdx哈希表映射
   oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx)
   // 2. 根据map查找新树上是否有相同的key
   idxInOld = isDef(newStartVnode.key)
     ? oldKeyToIdx[newStartVnode.key]
     : findIdxInOld(newStartVnode, oldCh, oldStartIdx, oldEndIdx)
   // 3. 找到即是移动操作，在找到的旧节点前插入新节点
   // 4. 找不到，则是新增操作。会直接在最前面添加
   ```
   3. 这也是为什么`需要设置key或者不能用index作为key的原因`，因为在这一步中，如果之前的四步比较都没用的话，会进入 key 值的比较。在这一步我们会基于旧树生成一个 key -> index 的哈希表映射 oldKeyToIdx。然后基于这个表在新虚拟树中查找有哪些节点是可以复用的。
      1. 如果没有设置 key。vue 会直接创建新 dom 来，这就没有达到复用的目的了
      2. 如果用 index 设置 key 的话。vue 会进一步通过`sameVnode`判断是否为同一节点。而用 index 做 key 的话，对于每个节点来说他并不是唯一的，可能会重新排列。vue 还是会创建新节点。所以说使用`index作为key和不写key没什么区别`，对于 vue 来说可能都是负优化。
5.

## 为什么需要设置 key 或者不能用 index 作为 key 的原因

key 主要用在 Vue 的虚拟 DOM 的 `diff 算法`中，是 vnode 的唯一标记，diff 算法中双端两两比较一共有 4 种比较方式。如果在四种方式都没有匹配的话，就会进入 key 值的比较。vue 会基于旧树生成一个 key -> index 的`哈希表映射 oldKeyToIdx`

1. 如果没有设置 key。vue 会直接创建新 dom 节点
2. 如果用 index 设置 key 的话。vue 会进一步通 `sameVnode` 判断是否为同一节点。而用 index 做 key 的话，对于每个节点来说可能他并不是唯一的，可能会重新排列。vue 还是会创建新节点。所以说使用`index作为key和不写key没什么区别`，对于 vue 来说可能都是负优化。
3.
