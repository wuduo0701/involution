// 给定一个二叉树，找出其最小深度。
// 最小深度是从根节点到最近叶子节点的最短路径上的节点数量。
// 说明：叶子节点是指没有子节点的节点。

var minDepth = function (root) {
  if (!root) return 0 // 如果节点为空返回0
  // 如果当前节点左右子树有一个为空，返回不为空的子树的最小深度加 1
  if (!root.left) return minDepth(root.right) + 1
  if (!root.right) return minDepth(root.left) + 1
  // 都不为空，取较小值+1
  return Math.min(minDepth(root.left), minDepth(root.right)) + 1
}
