// 5. 最长回文子串
// 给你一个字符串 s，找到 s 中最长的回文子串

// 如果字符串的反序与原始字符串相同，则该字符串称为回文字符串。
// 示例 1：
// 输入：s = "babad"
// 输出："bab"
// 解释："aba" 同样是符合题意的答案。

// 示例 2：
// 输入：s = "cbbd"
// 输出："bb"
// c c
// cb c/b
// cbb bb
// cbbd bb
// cbbdb bdb
var longestPalindrome = function (s) {
  let len = s.length
  if (len === 1) return s

  // let dp = new Array(len).fill(false).map(() => new Array(len).fill(false))
  // for (let i = 0; i < len; i++) {
  //   dp[i][i] = true
  // }
  let ans = s[0]
  for (let i = 1; i < len; i++) {
    // ans
  }
}
longestPalindrome('babad')
