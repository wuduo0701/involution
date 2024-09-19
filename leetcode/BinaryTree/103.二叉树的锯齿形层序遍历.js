/*
 * @lc app=leetcode.cn id=103 lang=javascript
 *
 * [103] 二叉树的锯齿形层序遍历
 */

// @lc code=start
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
var zigzagLevelOrder = function (root) {
  // 迭代
  // if (!root) return []
  // const queue = [root]
  // const result = []
  // let level = 0

  // while (queue.length) {
  //   const queueLen = queue.length
  //   const nodeLevel = []
  //   for (let i = 0; i < queueLen; i++) {
  //     let node = queue.shift()
  //     if (level % 2 === 1) {
  //       nodeLevel.unshift(node.val)
  //     } else {
  //       nodeLevel.push(node.val)
  //     }
  //     if (node.left) queue.push(node.left)
  //     if (node.right) queue.push(node.right)
  //   }
  //   result.push(nodeLevel)
  //   level++
  // }
  // return result
  // 递归 - 方法

  // TODO:层序遍历的变体
  // 放值的时候，判断层级。如是单数，正常push，如是复数，则unshift增加
  if (!root) return []
  const result = []

  function order(node, index = 0) {
    if (node !== null) {
      result[index] = result[index] || []
      if (index % 2 === 0) {
        result[index].push(node.val)
      } else {
        result[index].unshift(node.val)
      }
      order(node.left, index + 1)
      order(node.right, index + 1)
    }
  }
  order(root, 0)
  return result
}
// @lc code=end
