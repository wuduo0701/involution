// 21. 合并两个有序链表
// 将两个升序链表合并为一个新的 升序 链表并返回。新链表是通过拼接给定的两个链表的所有节点组成的。

// 示例 1：
// 输入：l1 = [1,2,4], l2 = [1,3,4]
// 输出：[1,1,2,3,4,4]

// 示例 2：
// 输入：l1 = [], l2 = []
// 输出：[]

// 示例 3：
// 输入：l1 = [], l2 = [0]
// 输出：[0]

function List(val, next) {
  this.val = val ? val : undefined
  this.next = next ? next : null
}
function mergeTwoLists(l1, l2) {
  if (!l1) return l2
  if (!l2) return l1

  let newList = new List(-1)
  let prev = newList
  while (l1 && l2) {
    if (l1.val < l2.val) {
      prev.next = l1
      l1 = l1.next
    } else {
      prev.next = l2
      l2 = l2.next
    }
    prev = prev.next
  }
  prev.next = l1 === null ? l2 : l1

  return newList.next
}

let l1 = new List(1),
  l2 = new List(2),
  l3 = new List(4)
l1.next = l2
l2.next = l3

let n1 = new List(1),
  n2 = new List(3),
  n3 = new List(4)
n1.next = n2
n2.next = n3

console.log(l1, n1)
console.log(mergeTwoLists(l1, n1))
