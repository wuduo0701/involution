/*
 * @lc app=leetcode.cn id=206 lang=javascript
 *
 * [206] 反转链表
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
 * @param {ListNode} head
 * @return {ListNode}
 */
var reverseList = function (head) {
  let prev = null // 前一个节点
  let curr = head
  while (curr) {
    let temp = curr.next // 暂存下一个节点，后续赋给curr，相当于往后移动链表
    curr.next = prev // 【反转】将当前节点的 next 指向前一个节点
    prev = curr // 更新prev节点
    curr = temp // curr 更新为下一个节点。
  }
  return prev
}
// @lc code=end
