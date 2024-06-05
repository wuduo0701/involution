// 二叉树的前序遍历

function preorderTraversal(root) {
  const result = []
  function preorderFun(node) {
    if (!node) return
    result.push(node.val)
    preorderFun(node.left)
    preorderFun(node.right)
  }
  return preorderFun(root)
}
