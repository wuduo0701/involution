/*
 * @lc app=leetcode.cn id=102 lang=javascript
 *
 * [102] 二叉树的层序遍历
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
var levelOrder = function (root) {
  // 递归-方法
  if (!root) return []
  const result = []

  function order(node, index = 0) {
    if (node !== null) {
      result[index] = result[index] || []
      result[index].push(node.val)
      order(node.left, index + 1, result)
      order(node.right, index + 1, result)
    }
  }
  order(root, 0)
  return result

  // 迭代的方法
  // if (!root) return []
  // const result = []
  // const queue = [root]
  // while (queue.length) {
  //   const queueLen = queue.length
  //   const nodeLevel = []

  //   for (let i = 0; i < queueLen; i++) {
  //     let node = queue.shift()
  //     nodeLevel.push(node.val)

  //     if (node.left) queue.push(node.left)
  //     if (node.right) queue.push(node.right)
  //   }
  //   result.push(nodeLevel)
  // }
  // return result
}
// @lc code=end
