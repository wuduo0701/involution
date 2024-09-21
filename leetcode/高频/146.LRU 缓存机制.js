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

// 双向链表
function NodeList(key = 0, val = 0) {
  this.key = key
  this.val = val
  this.prev = null // 头结点
  this.next = null // 尾结点
}

var LRUCache = function (capacity) {
  this.capacity = capacity
  // 构造双向链表
  this.dummy = new NodeList() // 哨兵节点【不动】
  this.dummy.prev = this.dummy // 前节点是自己
  this.dummy.next = this.dummy // 后节点也是自己
  // 构造{key - node节点}的哈希表 -  相当于上面描述的书堆
  // 哈希表具有顺序结构
  this.keyToNode = new Map()
}

/**
 * @param {number} key
 * @return {number}
 */
LRUCache.prototype.get = function (key) {
  // 没找到这本书
  if (!this.keyToNode.has(key)) return -1

  // 找到这本书
  const node = this.keyToNode.get(key)
  // 从书堆中取出来（原来的删掉）
  this.remove(node)
  // 把他放到书堆顶部
  this.pushFront(node)

  // 返回节点值
  return node.val
}

/**
 * @param {number} key
 * @param {number} value
 * @return {void}
 */
LRUCache.prototype.put = function (key, value) {
  let node = this.keyToNode.get(key) // 找出这本书
  // 是否有这本书
  if (node) {
    node.val = value // 更新 value
    this.remove(node) // 把这本书抽出来
    this.pushFront(node) // 放在最上面
  } else {
    // 没找到这本书的情况，无论是否超出缓存，都需要在顶部放这本书
    const newNode = new NodeList(key, value) // 新书
    this.keyToNode.set(key, newNode) // 设置映射 - 书堆
    this.pushFront(newNode) // 放在最上面
    // 书超过缓存值
    if (this.keyToNode.size > this.capacity) {
      const backNode = this.dummy.prev // 最后一本书
      this.keyToNode.delete(backNode.key)
      this.remove(backNode) // 去掉最后一本书
    }
  }
}

// 删除双向链表中的一个节点【抽出一本书】
LRUCache.prototype.remove = function (node) {
  // node的前节点指向node的后节点
  node.prev.next = node.next
  // node的后节点指向node的前节点
  node.next.prev = node.prev
}

// 把链表中的一个节点放到头节点【把书放到书堆顶部】
LRUCache.prototype.pushFront = function (node) {
  // 更新哨兵节点、放到头结点
  node.prev = this.dummy
  node.next = this.dummy.next
  // 删除node节点
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
