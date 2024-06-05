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

  // 中序遍历
  inorderTraversal(node, result = []) {
    if (node !== null) {
      this.inorderTraversal(node.left, result)
      result.push(node.value)
      this.inorderTraversal(node.right, result)
    }
    return result
  }

  // 前序遍历
  preorderTraversal(node, result = []) {
    if (node !== null) {
      result.push(node.value)
      this.preorderTraversal(node.left, result)
      this.preorderTraversal(node.right, result)
    }
    return result
  }

  // 后序遍历
  postorderTraversal(node, result = []) {
    if (node !== null) {
      this.postorderTraversal(node.left, result)
      this.postorderTraversal(node.right, result)
      result.push(node.value)
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
console.log('Inorder Traversal:', tree.preorderTraversal(tree.root))
console.log('Inorder Traversal:', tree.postorderTraversal(tree.root))
