var inorderTraversal = function (root) {
  let result = []

  function inorder(node) {
    if (node !== null) {
      inorder(node.left)
      result.push(node.val)
      inorder(node.right)
    }
  }
  inorder(root)
  return result
}
