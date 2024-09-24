var maximalSquare = function (matrix) {
  let m = matrix.length,
    n = matrix[0].length
  let max = 0
  const dp = Array.from(new Array(m + 1), () => new Array(n + 1)).fill(0)
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (dp[i][j] === '1') {
        dp[i + 1][j + 1] = Math.min(dp[i][j], dp[i + 1][j], dp[i][j + 1]) + 1
        max = Math.max(dp[i + 1][j + 1], max)
      }
    }
  }
  return max
}
