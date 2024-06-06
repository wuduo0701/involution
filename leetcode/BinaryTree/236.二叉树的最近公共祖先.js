/*
 * @lc app=leetcode.cn id=236 lang=javascript
 *
 * [236] 二叉树的最近公共祖先
 */

// @lc code=start
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */
var lowestCommonAncestor = function (root, p, q) {
  // 特殊情况：
  // 1、如果不存在根节点、那么就返回根节点
  // 2、如果p和q中有一个是根节点，那么根节点就是最近公共祖先
  if (root === null || root === p || root === q) {
    return root
  }
  // 利用递归思想：分别递归左右子数
  const left = lowestCommonAncestor(root.left, p, q) // 递归左子树
  const right = lowestCommonAncestor(root.right, p, q) // 递归右子树

  // 如果左右子数都找到了，则结果只能是在根节点
  if (left !== null && right !== null) return root
  // 如果左子数没找到，则结果就在右边；否则相反
  return left === null ? right : left
}
// @lc code=end
