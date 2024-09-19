var levelOrder = function (root) {
  let result = []
  function order(node, index) {
    if (node !== null) {
      result[index] = result[index] || []
      result[index].push(node.val)
      order(node.left, index + 1, result)
      order(node.right, index + 1, result)
    }
  }
  order(root, 0)

  return result
}
