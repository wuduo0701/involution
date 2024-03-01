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

var lengthOfLongestSubstring = (str) => {
  if (str.length <= 1) return str.length
  let max = 0,
    left = 0,
    right = 1,
    tempStr = ''
  while (right < str.length) {
    tempStr = str.slice(left, right)
    if (tempStr.indexOf(str[right]) > -1) {
      left++
      continue
    } else {
      right++
    }
    max = Math.max(max, right - left)
  }
  return max
}
let str1 = 'abcabcbb',
  str2 = 'bbbbb',
  str3 = 'pwwkew'

console.log(lengthOfLongestSubstring(str1))
console.log(lengthOfLongestSubstring(str2))
console.log(lengthOfLongestSubstring(str3))
