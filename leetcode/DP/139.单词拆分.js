/*
 * @lc app=leetcode.cn id=139 lang=javascript
 *
 * [139] 单词拆分
 * 给你一个字符串 s 和一个字符串列表 wordDict 作为字典。
 * 如果可以利用字典中出现的一个或多个单词拼接出 s 则返回 true。
 * 注意：不要求字典中出现的单词全部都使用，并且字典中的单词可以重复使用。
 */

// 示例 1：
// 输入: s = "leetcode", wordDict = ["leet", "code"]
// 输出: true
// 解释: 返回 true 因为 "leetcode" 可以由 "leet" 和 "code" 拼接成。

// 示例 2：
// 输入: s = "applepenapple", wordDict = ["apple", "pen"]
// 输出: true
// 解释: 返回 true 因为 "applepenapple" 可以由 "apple" "pen" "apple" 拼接成。
//      注意，你可以重复使用字典中的单词。

// @lc code=start
/**
 * @param {string} s
 * @param {string[]} wordDict
 * @return {boolean}
 */
var wordBreak = function (s, wordDict) {
  const wordMap = new Set(wordDict)
  // dp[i] 表示字符串 s 的前 i 个字符是否可以被拼接
  const dp = new Array(s.length + 1).fill(false)
  dp[0] = true
  // 从1开始，表示开始从第一个字符开始检测
  for (let i = 1; i <= s.length; i++) {
    for (let j = 0; j < i; j++) {
      // dp[j]表示0 - j已经可以被拼接
      // 则只需判断i - j的字符串是否在字典
      if (dp[j] && wordMap.has(s.substring(j, i))) {
        dp[i] = true
        break
      }
    }
  }
  return dp[s.length]
}
// @lc code=end
