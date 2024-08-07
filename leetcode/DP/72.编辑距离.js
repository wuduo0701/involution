/*
 * @lc app=leetcode.cn id=72 lang=javascript
 *
 * [72] 编辑距离
 */

// 给你两个单词 word1 和 word2， 请返回将 word1 转换成 word2 所使用的最少操作数  。
// 你可以对一个单词进行如下三种操作：1.插入一个字符、2.删除一个字符、3.替换一个字符
// 示例 1：
// 输入：word1 = "horse", word2 = "ros"
// 输出：3
// 解释：
// horse -> rorse (将 'h' 替换为 'r')
// rorse -> rose (删除 'r')
// rose -> ros (删除 'e')

// 示例 2：
// 输入：word1 = "intention", word2 = "execution"
// 输出：5
// 解释：
// intention -> inention (删除 't')
// inention -> enention (将 'i' 替换为 'e')
// enention -> exention (将 'n' 替换为 'x')
// exention -> exection (将 'n' 替换为 'c')
// exection -> execution (插入 'u')

// @lc code=start
/**
 * @param {string} word1
 * @param {string} word2
 * @return {number}
 */
var minDistance = function (word1, word2) {
  const m = word1.length
  const n = word2.length
  // 表示将 word1 的前 i 个字符转换成 word2 的前 j 个字符所需的最少操作数。
  const dp = Array.from(new Array(m + 1), () => new Array(n + 1).fill(0))

  // word2为空的情况
  for (let i = 0; i <= m; i++) {
    dp[i][0] = i
  }
  // word1为空的情况
  for (let j = 0; j <= n; j++) {
    dp[0][j] = j
  }
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (word1[i - 1] === word2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] // 字符相等，证明当前位置不需要变化
      } else {
        dp[i][j] = Math.min(
          // 意味着前i个字符和j-2个字符相等，只需在第i个字符上加上 word[j-1]字符即可
          // 即需要先将前i个字符转换成前j-1个字符，再在第i个字符上加上 word[j-1]字符即可
          dp[i][j - 1] + 1, // 新增一个字符
          // 这意味着我们需要将 word1 的前i-1个字符转化成word2的j个字符，然后在删除word1的第i-1个字符
          dp[i - 1][j] + 1, // 删除一个字符
          // 我们需要先将 word1 的i-1个字符转化为 word2 的j-1个字符，然后在第i-1个字符上加上 word[j-1]字符即可
          dp[i - 1][j - 1] + 1 // 替换一个字符
        )
      }
    }
  }
  return dp[m][n]
}
// @lc code=end
