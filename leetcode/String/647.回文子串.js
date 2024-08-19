/*
 * @lc app=leetcode.cn id=647 lang=javascript
 *
 * [647] 回文子串
 * 给你一个字符串 s ，请你统计并返回这个字符串中 回文子串 的数目。
 * 回文字符串 是正着读和倒过来读一样的字符串。
 * 子字符串 是字符串中的由连续字符组成的一个序列。
 */

// @lc code=start
/**
 * @param {string} s
 * @return {number}
 */
var countSubstrings = function (s) {
  let len = s.length
  let result = 0

  for (let i = 0; i < len; i++) {
    result += centerFn(i, i) // 奇数长度的回文子串
    result += centerFn(i, i + 1) // 偶数长度的回文子串
  }

  // 中心回文法
  function centerFn(left, right) {
    let count = 0
    // 当有一个回文串的时候，计数+1
    while (left >= 0 && right < len && s[left] === s[right]) {
      count++
      left--
      right++
    }
    return count
  }
  return result
}
// @lc code=end
