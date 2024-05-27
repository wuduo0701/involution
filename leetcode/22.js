// 数字 n 代表生成括号的对数，请你设计一个函数，用于能够生成所有可能的并且 有效的 括号组合。

// 示例 1：

// 输入：n = 3
// 输出：["((()))","(()())","(())()","()(())","()()()"]
// 示例 2：

// 输入：n = 1
// 输出：["()"]
// （(()  (()(  (()) ()(( ()()
function generateParenthesis(n) {
  // 结果数组
  const result = []

  // 辅助递归函数，添加左括号和右括号
  function backtrack(S, left, right) {
    if (S.length === 2 * n) {
      // 当前字符串长度等于2n时，表示形成了一个完整的组合
      result.push(S)
      return
    }

    if (left < n) {
      // 如果左括号数量没有用完，可以添加左括号
      backtrack(S + '(', left + 1, right)
    }
    if (right < left) {
      // 如果右括号数量小于左括号数量，可以添加右括号
      backtrack(S + ')', left, right + 1)
    }
  }

  // 从空字符串开始递归
  backtrack('', 0, 0)

  return result
}

// 使用例子
console.log(generateParenthesis(3)) // 输出所有括号组合
