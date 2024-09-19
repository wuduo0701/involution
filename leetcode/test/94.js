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
