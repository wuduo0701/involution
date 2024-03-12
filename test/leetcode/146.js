// 146.LRU 缓存机制
// 请你设计并实现一个满足  LRU (最近最少使用) 缓存 约束的数据结构。
// 实现 LRUCache 类：
// LRUCache(int capacity) 以 正整数 作为容量 capacity 初始化 LRU 缓存
// int get(int key) 如果关键字 key 存在于缓存中，则返回关键字的值，否则返回 -1 。
// void put(int key, int value) 如果关键字 key 已经存在，则变更其数据值 value ；如果不存在，则向缓存中插入该组 key-value 。如果插入操作导致关键字数量超过 capacity ，则应该 逐出 最久未使用的关键字。
// 函数 get 和 put 必须以 O(1) 的平均时间复杂度运行。

// 输入
// ["LRUCache", "put", "put", "get", "put", "get", "put", "get", "get", "get"]
// [[2], [1, 1], [2, 2], [1], [3, 3], [2], [4, 4], [1], [3], [4]]
// 输出
// [null, null, null, 1, null, -1, null, -1, 3, 4]

// 解释
// LRUCache lRUCache = new LRUCache(2);
// lRUCache.put(1, 1); // 缓存是 {1=1}
// lRUCache.put(2, 2); // 缓存是 {1=1, 2=2}
// lRUCache.get(1);    // 返回 1
// lRUCache.put(3, 3); // 该操作会使得关键字 2 作废，缓存是 {1=1, 3=3}
// lRUCache.get(2);    // 返回 -1 (未找到)
// lRUCache.put(4, 4); // 该操作会使得关键字 1 作废，缓存是 {4=4, 3=3}
// lRUCache.get(1);    // 返回 -1 (未找到)
// lRUCache.get(3);    // 返回 3
// lRUCache.get(4);    // 返回 4

// 理解题目含义：
// 1.【堆叠书问题】最多能放capacity本书。
//     put操作，可理解为放书。
//        如果这堆书里没有这本书，判断是否超出capacity量的书
//           没超过，直接在书堆顶上放
//           超过了，则把书堆最底部的丢掉(删除node节点)，放新书
//        如果这堆书里有这本书，找到这本书，并把它放到最顶部，并替换value值【版本号等】
//     get操作，可理解为拿书
//        如果这堆书里没有这本书，返回-1
//        如果这堆书里有这本书，返回value值，并把它放到书堆最顶部

function NodeList(key = 0, val = 0) {
  this.key = key
  this.val = val
  this.prev = null
  this.next = null
}
var LRUCache = function (capacity) {
  this.capacity = capacity
  this.dummy = new NodeList()
  this.dummy.prev = this.dummy
  this.dummy.next = this.dummy
  this.keyToMap = new Map()
}

/**
 * @param {number} key
 * @return {number}
 */
LRUCache.prototype.get = function (key) {
  if (!this.keyToMap.has(key)) return -1

  let node = this.keyToMap.get(key)
  // 删除node节点
  this.delete(node)
  // 放到顶部
  this.pushFront(node)
  return node.val
}
LRUCache.prototype.put = function (key, value) {
  let node = this.keyToMap.get(key)
  if (node) {
    node.val = value

    // 删除node节点
    this.delete(node)
    // 放到顶部
    this.pushFront(node)
  } else {
    const newNode = new NodeList(key, value)
    this.keyToMap.set(key, newNode)
    // 放到顶部
    this.pushFront(newNode)

    if (this.keyToMap.size > this.capacity) {
      const backNode = this.dummy.prev
      this.keyToMap.delete(backNode.key)
      this.delete(backNode)
    }
  }
}

LRUCache.prototype.delete = function (node) {
  node.prev.next = node.next
  node.next.prev = node.prev
}
LRUCache.prototype.pushFront = function (node) {
  node.prev = this.dummy
  node.next = this.dummy.next
  node.prev.next = node
  node.next.prev = node
}
// lRUCache = new LRUCache(2)
// console.log(lRUCache)
// console.log(lRUCache.put(1, 1))
// // lRUCache.put(1, 1) // 缓存是 {1=1}
// lRUCache.put(2, 2) // 缓存是 {1=1, 2=2}
// lRUCache.get(1) // 返回 1
// lRUCache.put(3, 3) // 该操作会使得关键字 2 作废，缓存是 {1=1, 3=3}
// lRUCache.get(2) // 返回 -1 (未找到)
// lRUCache.put(4, 4) // 该操作会使得关键字 1 作废，缓存是 {4=4, 3=3}
// lRUCache.get(1) // 返回 -1 (未找到)
// lRUCache.get(3) // 返回 3
// lRUCache.get(4) // 返回 4
