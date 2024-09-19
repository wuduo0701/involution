/*
 * @lc app=leetcode.cn id=94 lang=javascript
 *
 * [94] 二叉树的中序遍历
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
 * @return {number[]}
 */

// TODO: 前中后序遍历 口诀（靠记值出现的顺序）
// 1. 值在前面 就是前序
// 2. 值在中间 就是中序
// 2. 值在后面 就是后序

var inorderTraversal = function (root) {
  let result = []

  function inorder(node, result) {
    if (node !== null) {
      inorder(node.left, result)
      result.push(node.val)
      inorder(node.right, result)
    }
  }
  inorder(root, result)
  return result
}
// @lc code=end
