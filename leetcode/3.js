// 给定一个字符串 s ，请你找出其中不含有重复字符的 最长子串 的长度。

// 示例 1:

// 输入: s = "abcabcbb"
// 输出: 3
// 解释: 因为无重复字符的最长子串是 "abc"，所以其长度为 3。
// 示例 2:

// 输入: s = "bbbbb"
// 输出: 1
// 解释: 因为无重复字符的最长子串是 "b"，所以其长度为 1。
// 示例 3:

// 输入: s = "pwwkew"
// 输出: 3
// 解释: 因为无重复字符的最长子串是 "wke"，所以其长度为 3。
//      请注意，你的答案必须是 子串 的长度，"pwke" 是一个子序列，不是子串。

/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function (s) {
  const len = s.length
  if (len <= 1) return len

  let max = 0,
    tempStr = '',
    left = 0,
    right = 1
  while (right < len) {
    tempStr = s.slice(left, right)
    if (tempStr.indexOf(s.charAt(right)) > -1) {
      left++
      continue
    } else {
      right++
    }
    if (right - left > max) {
      max = right - left
    }
  }
  return max
}

let s1 = 'abcabcbb',
  s2 = 'bbbbb',
  s3 = 'pwwkew'

console.log(lengthOfLongestSubstring(s1))
console.log(lengthOfLongestSubstring(s2))
console.log(lengthOfLongestSubstring(s3))
