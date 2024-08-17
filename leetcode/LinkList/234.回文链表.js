/*
 * @lc app=leetcode.cn id=234 lang=javascript
 *
 * [234] 回文链表
 * 给你一个单链表的头节点 head ，请你判断该链表是否为回文链表。
 * 如果是，返回 true ；否则，返回 false 。
 */
// 示例 1：
// 输入：head = [1,2,2,1]
// 输出：true

// 示例 2：
// 输入：head = [1,2]
// 输出：false
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
 * @return {boolean}
 */
var isPalindrome = function (head) {
  // 零个或者一个 肯定是回文
  if (!head || !head.next) return true
  // 定义快慢指针
  let slow = head,
    fast = head

  // 快指针走两步，慢指针走一步
  // 这样慢指针刚好到链表中点
  while (fast && fast.next) {
    slow = slow.next
    fast = fast.next.next
  }
  let prev = null // 后半链表的开头
  // 反转后半链表
  while (slow) {
    let next = slow.next // 保留下一节点
    slow.next = prev // 翻转链表
    prev = slow // 移动prev
    slow = next // 移动到下一节点
  }
  // 比较前半部分和反转后的后半部分
  let left = head,
    right = prev
  while (right) {
    if (left.val !== right.val) return false
    left = left.next
    right = right.next
  }
  return true
}
// @lc code=end
