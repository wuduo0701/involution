/*
 * @lc app=leetcode.cn id=394 lang=javascript
 *
 * [394] 字符串解码
 * 给定一个经过编码的字符串，返回它解码后的字符串。
 * 编码规则为: k[encoded_string]，表示其中方括号内部的 encoded_string 正好重复 k 次。注意 k 保证为正整数。
 * 你可以认为输入字符串总是有效的；输入字符串中没有额外的空格，且输入的方括号总是符合格式要求的。
 * 此外，你可以认为原始数据不包含数字，所有的数字只表示重复的次数 k ，例如不会出现像 3a 或 2[4] 的输入。
 */

// 示例 1：
// 输入：s = "3[a]2[bc]"
// 输出："aaabcbc"

// 示例 2：
// 输入：s = "3[a2[c]]"
// 输出："accaccacc"

// 示例 3：
// 输入：s = "2[abc]3[cd]ef"
// 输出："abcabccdcdcdef"

// 示例 4：
// 输入：s = "abc3[cd]xyz"
// 输出："abccdcdcdxyz"

// @lc code=start
/**
 * @param {string} s
 * @return {string}
 */
var decodeString = function (s) {
  const numStack = [] // 倍数栈
  const strStack = [] // 存 待拼接的str 的栈

  let carry = 0 // 倍数
  let result = ''
  for (let chart of s) {
    // 是数字
    if (!isNaN(chart)) {
      carry = carry * 10 + Number(chart) // 算出倍数，number可能是连续出现
    } else if (chart === '[') {
      // 字符串和倍数需要分别进栈
      // 清空
      strStack.push(result)
      result = ''
      numStack.push(carry)
      carry = 0
    } else if (chart === ']') {
      let repeatTimes = numStack.pop() // 重复的次数
      // strStack.pop() 就是数组前的数
      // 此时的result就是重复的字符串
      result = strStack.pop() + result.repeat(repeatTimes)
    } else {
      result += chart // 拼接字符串（两个符号之间的）
    }
  }
  return result
}
// @lc code=end
