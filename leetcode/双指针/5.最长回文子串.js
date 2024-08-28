/*
 * @lc app=leetcode.cn id=5 lang=javascript
 *
 * [5] 最长回文子串
 *
 * https://leetcode.cn/problems/longest-palindromic-substring/description/
 *
 * algorithms
 * Medium (38.47%)
 * Likes:    7313
 * Dislikes: 0
 * Total Accepted:    1.8M
 * Total Submissions: 4.6M
 * Testcase Example:  '"babad"'
 *
 * 给你一个字符串 s，找到 s 中最长的 回文 子串。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：s = "babad"
 * 输出："bab"
 * 解释："aba" 同样是符合题意的答案。
 *
 *
 * 示例 2：
 *
 *
 * 输入：s = "cbbd"
 * 输出："bb"
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= s.length <= 1000
 * s 仅由数字和英文字母组成
 *
 *
 */

// @lc code=start
/**
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function (s) {
  if (s.length === 1) return s

  let ans = ''
  for (let i = 0; i < s.length; i++) {
    centerFn(i, i) // 单个回文
    if (s[i] === s[i + 1]) centerFn(i, i + 1) // 双个回文
  }
  function centerFn(left, right) {
    while (left >= 0 && right < s.length && s[left] === s[right]) {
      left--
      right++
    }
    // 跳出循环，恰巧是不满足的情况，所以需要 - 2
    if (right + 1 - left - 2 > ans.length) {
      // 正常跳出循环是left，right
      // 则满足条件是 left+1，right-1 的边界。而slice是不记右边的，需要加1
      ans = s.slice(left + 1, right)
    }
  }
  return ans
}
// @lc code=end
