class TreeNode {
  constructor(value) {
    this.value = value
    this.left = null
    this.right = null
  }
}
class BinaryTree {
  constructor() {
    this.root = null
  }

  // 插入节点
  insert(value) {
    const newNode = new TreeNode(value)
    if (this.root === null) {
      this.root = newNode
    } else {
      this.insertNode(this.root, newNode)
    }
  }

  // 辅助插入节点的方法
  insertNode(node, newNode) {
    if (newNode.value < node.value) {
      if (node.left === null) {
        node.left = newNode
      } else {
        this.insertNode(node.left, newNode)
      }
    } else {
      if (node.right === null) {
        node.right = newNode
      } else {
        this.insertNode(node.right, newNode)
      }
    }
  }

  // 中序遍历 (值 -> 左子数 -> 右子数)
  inorderTraversal(node, result = []) {
    if (node !== null) {
      this.inorderTraversal(node.left, result)
      result.push(node.value)
      this.inorderTraversal(node.right, result)
    }
    return result
  }

  // 前序遍历 (左子数  -> 值 -> 右子数)
  preorderTraversal(node, result = []) {
    if (node !== null) {
      result.push(node.value)
      this.preorderTraversal(node.left, result)
      this.preorderTraversal(node.right, result)
    }
    return result
  }

  // 后序遍历 (左子数 -> 右子数 -> 值)
  postorderTraversal(node, result = []) {
    if (node !== null) {
      this.postorderTraversal(node.left, result)
      this.postorderTraversal(node.right, result)
      result.push(node.value)
    }
    return result
  }

  // 层序遍历 (一层层遍历) - 递归
  // 广度优先遍历
  levelOrderTraversal(node, result = [], level = 0) {
    if (node !== null) {
      result[level] = result[level] || []
      result[level].push(node.value)

      this.levelOrderTraversal(node.left, result, level + 1)
      this.levelOrderTraversal(node.right, result, level + 1)
    }
    return result
  }
  // 层序遍历 - 迭代
  levelOrderTraversal2(root, result = []) {
    if (root !== null) {
      const queue = [root]
      while (queue.length) {
        const queueLen = queue.length
        const levelNode = [] // 这个层级存的数
        for (let i = 0; i < queueLen; i++) {
          const node = queue.shift()
          levelNode.push(node.value)

          if (node.left) queue.push(node.left) // 左子数
          if (node.right) queue.push(node.right) // 右子数
        }
        result.push(levelNode)
      }
    }
    return result
  }
}

// 创建一个二叉树实例
const tree = new BinaryTree()

// 插入节点
tree.insert(8)
tree.insert(3)
tree.insert(10)
tree.insert(1)
tree.insert(6)
tree.insert(14)
tree.insert(4)
tree.insert(7)
tree.insert(13)

console.log(tree)
console.log('Inorder Traversal:', tree.inorderTraversal(tree.root))
console.log('preorder Traversal:', tree.preorderTraversal(tree.root))
console.log('postorder Traversal:', tree.postorderTraversal(tree.root))
console.log('levelOrder Traversal:', tree.levelOrderTraversal(tree.root))
console.log('levelOrder Traversal:', tree.levelOrderTraversal2(tree.root))
