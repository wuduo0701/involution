/*
 * @lc app=leetcode.cn id=22 lang=javascript
 *
 * [22] 括号生成
 * 数字 n 代表生成括号的对数，请你设计一个函数，用于能够生成所有可能的并且 有效的 括号组合。
 */
// 示例 1：
// 输入：n = 3

// 输出：["((()))","(()())","(())()","()(())","()()()"]
// 示例 2：
// 输入：n = 1
// 输出：["()"]

// @lc code=start
/**
 * @param {number} n
 * @return {string[]}
 */
var generateParenthesis = function (n) {
  if (n === 1) return ['()']
  const result = []
  // 回溯法
  function backtrack(str, left, right) {
    // 递归终止条件：组成一个完整的括号组合
    if (str.length === 2 * n) {
      result.push(str)
      return
    }
    // 递归生成左括号
    if (left < n) {
      backtrack(str + '(', left + 1, right)
    }
    // 递归生成右括号
    if (right < left) {
      backtrack(str + ')', left, right + 1)
    }
  }
  backtrack('', 0, 0)
  return result
}
// @lc code=end
