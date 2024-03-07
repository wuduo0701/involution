// FIXME:重点关注
// 25. K 个一组翻转链表
// 给你链表的头节点 head ，每 k 个节点一组进行翻转，请你返回修改后的链表。

// k 是一个正整数，它的值小于或等于链表的长度。如果节点总数不是 k 的整数倍，那么请将最后剩余的节点保持原有顺序。

// 你不能只是单纯的改变节点内部的值，而是需要实际进行节点交换。

// 示例一
// 输入：head = [1,2,3,4,5], k = 2
// 输出：[2,1,4,3,5]

// 示例二
// 输入：head = [1,2,3,4,5], k = 3
// 输出：[3,2,1,4,5]

function ListNode(val, next) {
  this.val = val === undefined ? 0 : val
  this.next = next === undefined ? null : next
}
// 反转链表
var reverseList = function (start, end) {
  let [pre, cur] = [start, start.next]
  const first = cur
  while (cur !== end) {
    let next = cur.next
    cur.next = pre
    pre = cur
    cur = next
  }
  start.next = pre
  first.next = cur
  return first
}
var reverseKGroup = function (head, k) {
  // 标兵
  let dummy = new ListNode()
  dummy.next = head
  let [start, end] = [dummy, dummy.next]
  let count = 0
  while (end) {
    count++
    if (count % k === 0) {
      console.log('---start', start)
      console.log('--end', end.next)
      start = reverseList(start, end.next)
      end = start.next
    } else {
      end = end.next
    }
  }
  return dummy.next
}

let l1 = new ListNode(1),
  l2 = new ListNode(2),
  l3 = new ListNode(3),
  l4 = new ListNode(4),
  l5 = new ListNode(5)

l1.next = l2
l2.next = l3
l3.next = l4
l4.next = l5
// reverseKGroup(l1, 2)
console.log(reverseKGroup(l1, 2))
// console.log(splitListByLength(l1, 2))
