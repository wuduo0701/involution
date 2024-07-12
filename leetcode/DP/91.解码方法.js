/*
 * @lc app=leetcode.cn id=91 lang=javascript
 *
 * [91] 解码方法
 */
// 示例 1：
// 输入：s = "12"
// 输出：2
// 解释：它可以解码为 "AB"（1 2）或者 "L"（12）。

// 示例 2：
// 输入：s = "226"
// 输出：3
// 解释：它可以解码为 "BZ" (2 26), "VF" (22 6), 或者 "BBF" (2 2 6) 。

// 示例 3：
// 输入：s = "06"
// 输出：0
// 解释："06" 无法映射到 "F" ，因为存在前导零（"6" 和 "06" 并不等价）。

// @lc code=start
/**
 * @param {string} s
 * @return {number}
 */
var numDecodings = function (s) {
  const len = s.length
  if (len === 0) return 0
  if (len === 1) {
    return s === '0' ? 0 : 1
  }
  if (s[0] === '0') return 0 // 如果字符串以'0'开头，无法解码

  const dp = new Array(len + 1).fill(0)
  dp[0] = 1 // 边界条件，表示空字符串有一种解法
  dp[1] = 1 // 单个字符的解码方式数
  for (let i = 2; i <= len; i++) {
    // 每个位置i，都存在两种解码方式：单个字符、两个字符
    const oneDigit = Number(s.slice(i - 1, i))
    const twoDigit = Number(s.slice(i - 2, i))

    // 单个字符解码可以从 dp[i-1]转移过来
    if (oneDigit >= 1 && oneDigit <= 9) {
      dp[i] += dp[i - 1]
    }
    // 两个字符组合解码 可以从 dp[i-2]转移过来
    if (twoDigit >= 10 && twoDigit <= 26) {
      dp[i] += dp[i - 2]
    }
  }
  return dp[len]
}
// @lc code=end
