/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
// 输入：head = [1,2,3,4,5]
// 输出：[5,4,3,2,1]

// 输入：head = [1,2]
// 输出：[2,1]
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
function ListNode(val, next) {
  this.val = val === undefined ? 0 : val
  this.next = next === undefined ? null : next
}
var reverseList = function (head) {
  if (head == null || head.next == null) {
    return head
  }
  // NOTE:迭代解法
  // let prevNode = null,
  //   currNode = head
  // while (currNode !== null) {
  //   let nextNode = currNode.next
  //   currNode.next = prevNode // 反转箭头
  //   prevNode = currNode // 移动prev 到curr
  //   currNode = nextNode // 移动curr 到prev
  // }

  // return prevNode

  // NOTE:递归解法 FIXME:多了解递归问题
  const newHead = reverseList(head.next)
  head.next.next = head
  head.next = null
  return newHead
}

let L1 = new ListNode(1),
  L2 = new ListNode(2),
  L3 = new ListNode(3),
  L4 = new ListNode(4),
  L5 = new ListNode(5)

L1.next = L2
L2.next = L3
L3.next = L4
L4.next = L5

console.log(L1)

// console.log(reverseList(L1))

console.log(reverseList(L1))
