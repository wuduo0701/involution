/*
 * @lc app=leetcode.cn id=151 lang=javascript
 *
 * [151] 反转字符串中的单词
 */

// @lc code=start
/**
 * @param {string} s
 * @return {string}
 */
var reverseWords = function (s) {
  // 1. 去除两端空白字符
  // 2. 按空白字符分割（\s+ 匹配一个或多个空白字符）
  // 3. 反转数组并重新组成字符串
  return s.trim().split(/\s+/).reverse().join(' ')
}
// @lc code=end
