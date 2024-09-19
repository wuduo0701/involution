var zigzagLevelOrder = function (root) {
  let result = []
  function order(node, index) {
    if (node !== null) {
      result[index] = result[index] || []
      if (index % 2 === 0) {
        result[index].push(node.val)
      } else {
        result[index].unshift(node.val)
      }
      order(node.left, index + 1)
      order(node.right, index + 1)
    }
  }
  order(root, 0)
  return result
}
