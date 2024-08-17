/*
 * @lc app=leetcode.cn id=221 lang=javascript
 *
 * [221] 最大正方形
 * 在一个由 '0' 和 '1' 组成的二维矩阵内，找到只包含 '1' 的最大正方形，并返回其面积。
 */

// 示例 1：
// 输入：matrix = [["1","0","1","0","0"],["1","0","1","1","1"],["1","1","1","1","1"],["1","0","0","1","0"]]
// 输出：4

// 示例 2：
// 输入：matrix = [["0","1"],["1","0"]]
// 输出：1
// @lc code=start
/**
 * @param {character[][]} matrix
 * @return {number}
 */
var maximalSquare = function (matrix) {
  let m = matrix.length,
    n = matrix[0].length
  let max = 0
  // dp[i + 1][j + 1]表示以下标 (i,j) 作为正方形右下角的最大正方形边长
  let dp = Array.from(Array(m + 1), () => Array(n + 1).fill(0))
  // dp[i + 1][j + 1]的正方形面积，受限于三个方向：
  // 1. dp[i+1][j]：上方的正方形边长
  // 2. dp[i][j+1]：左方的正方形边长
  // 3. dp[i][j]：左上方的正方形边长

  for (let i = 0; i < m; ++i) {
    for (let j = 0; j < n; ++j) {
      if (matrix[i][j] === '1') {
        // 动态规划方程：dp[i + 1][j + 1] = Math.min(dp[i][j + 1], dp[i + 1][j], dp[i][j]) + 1
        dp[i + 1][j + 1] = Math.min(dp[i + 1][j], dp[i][j + 1], dp[i][j]) + 1
        max = Math.max(max, dp[i + 1][j + 1])
      }
    }
  }
  return max * max
}
// @lc code=end
