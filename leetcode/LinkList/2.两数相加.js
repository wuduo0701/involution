/*
 * @lc app=leetcode.cn id=2 lang=javascript
 *
 * [2] 两数相加
 */

// @lc code=start
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function (l1, l2) {
  const dummy = new ListNode()
  let cur = dummy
  let carry = 0 // 进位

  while (l1 || l2 || carry) {
    const sum = (l1?.val || 0) + (l2?.val || 0) + carry // 当前节点 + 进位值
    carry = Math.floor(sum / 10) // 下一节点进位
    // 1. 计算当前相加值剩余部分，如11会进10剩1
    // 2. 把剩余部分赋予当前节点cur
    cur.next = new ListNode(sum % 10)
    cur = cur.next // 指向下一节点
    // 指针向后移
    l1 = l1?.next
    l2 = l2?.next
  }
  return dummy.next
}
// @lc code=end
