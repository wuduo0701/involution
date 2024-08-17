/*
 * @lc app=leetcode.cn id=20 lang=javascript
 *
 * [20] 有效的括号
 * 给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串 s ，判断字符串是否有效。
 * 有效字符串需满足：
 * 1. 左括号必须用相同类型的右括号闭合。
 * 2. 左括号必须以正确的顺序闭合。
 * 3. 每个右括号都有一个对应的相同类型的左括号。
 */

// 示例 1：
// 输入：s = "()"
// 输出：true

// 示例 2：
// 输入：s = "()[]{}"
// 输出：true

// 示例 3：
// 输入：s = "(]"
// 输出：false

// @lc code=start
/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function (s) {
  if (s.lenght < 2) return false
  if (s.length % 2 !== 0) return false

  let stack = []
  for (let item of s) {
    switch (item) {
      case '(':
      case '[':
      case '{':
        stack.push(item)
        break
      case ')':
        if (stack.pop() !== '(') return false
        break
      case ']':
        if (stack.pop() !== '[') return false
        break
      case '}':
        if (stack.pop() !== '{') return false
        break
    }
  }
  return !stack.length
}
// @lc code=end
