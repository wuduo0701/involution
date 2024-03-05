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

function ListNode(val, next) {
  this.val = val === undefined ? 0 : val
  this.next = next === undefined ? null : next
}
/**
 * @param {ListNode} list1
 * @param {ListNode} list2
 * @return {ListNode}
 */
var mergeTwoLists = function (list1, list2) {
  if (list1 === null && list2 === null) return list1
  if (list1 === null && list2 !== null) return list2
  if (list2 === null && list1 !== null) return list1

  const newList = new ListNode(-1)

  let prev = newList // 复制一个节点,prev为哨兵节点，会在l1和l2上随之移动
  while (list1 && list2) {
    if (list1.val <= list2.val) {
      prev.next = list1
      list1 = list1.next
    } else {
      prev.next = list2
      list2 = list2.next
    }
    prev = prev.next
  }
  // 这样比对，l1 和 l2 可能还会剩一个还未被合并完
  prev.next = list1 === null ? list2 : list1
  return newList.next
}

let l1 = new ListNode(1),
  l2 = new ListNode(2),
  l3 = new ListNode(4)
l1.next = l2
l2.next = l3

let n1 = new ListNode(1),
  n2 = new ListNode(3),
  n3 = new ListNode(4)
n1.next = n2
n2.next = n3

// console.log(l1, n1)
console.log(mergeTwoLists(l1, n1))
