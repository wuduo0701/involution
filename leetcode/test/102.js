var levelOrder = function (root) {
  let result = []
  function order(node, index) {
    if (node !== null) {
      result[index] = result[index] || []
      result[index].push(node.val)
      order(node.left, index + 1)
      order(node.right, index + 1)
    }
  }
  order(root, 0)

  return result
}
