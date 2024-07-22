/*
 * @lc app=leetcode.cn id=92 lang=javascript
 *
 * [92] 反转链表 II
 * 给你单链表的头指针 head 和两个整数 left 和 right ，其中 left <= right 。
 * 请你反转从位置 left 到位置 right 的链表节点，返回 反转后的链表 。
 */
// 示例 1：
// 输入：head = [1,2,3,4,5], left = 2, right = 4
// 输出：[1,4,3,2,5]

// 示例 2：
// 输入：head = [5], left = 1, right = 1
// 输出：[5]

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
 * @param {number} left
 * @param {number} right
 * @return {ListNode}
 */
var reverseBetween = function (head, left, right) {
  // 链表为空 / （左边 = 右边 不需要反转）
  if (!head || left === right) return head

  // 提供 dummy 哑节点
  let dummy = new ListNode(-1)
  dummy.next = head // 增加前继节点，防止为空
  let prev = dummy

  // 找到left前一个节点
  for (let i = 1; i < left; i++) {
    prev = prev.next
  }
  // 反转链表
  let curr = prev.next
  // let next = null
  for (let i = 0; i < right - left; i++) {
    let next = curr.next
    curr.next = next.next
    next.next = prev.next
    prev.next = next
  }
  return dummy.next
}
//  1  -> 2  -> 3 -> 4     5
// prev  cur  next  
// 1  3  2  4  5

// 1  4  3  2  5
// 
// @lc code=end
