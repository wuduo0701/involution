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
  if (!root) return []
  const result = []

  function order(node, level = 0) {
    if (!node) return

    if (!result[level]) result[level] = []

    if (level % 2 === 0) {
      result[level].push(node.val)
    } else {
      result[level].unshift(node.val)
    }
    order(node.left, level + 1)
    order(node.right, level + 1)
  }
  order(root, 0)
  return result
}
// @lc code=end
