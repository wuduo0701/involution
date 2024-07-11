/*
 * @lc app=leetcode.cn id=32 lang=javascript
 *
 * [32] 最长有效括号
 * 给你一个只包含 '(' 和 ')' 的字符串，找出最长有效（格式正确且连续）括号子串的长度。
 */
// 示例 1：
// 输入：s = "(()"
// 输出：2
// 解释：最长有效括号子串是 "()"

// 示例 2：
// 输入：s = ")()())"
// 输出：4
// 解释：最长有效括号子串是 "()()"

// 示例 3：
// 输入：s = ""
// 输出：0

// @lc code=start
/**
 * @param {string} s
 * @return {number}
 */
var longestValidParentheses = function (s) {
  if (s.length < 2) return 0

  let maxLen = 0
  let stack = [-1] // 初始化栈，栈底放一个-1作为基准

  for (let i = 0; i < s.length; i++) {
    if (s[i] === '(') {
      stack.push(i) // 左括号的索引入栈
    } else {
      stack.pop() // 右括号匹配，弹出栈顶
      if (stack.length === 0) {
        stack.push(i) // 栈为空时，当前索引入栈作为新的基准
      } else {
        maxLen = Math.max(maxLen, i - stack[stack.length - 1]) // 计算有效括号长度
      }
    }
  }

  return maxLen
}
// @lc code=end
