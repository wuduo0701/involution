var maxSubArray = function (nums) {
  const numLen = nums.length
  if (numLen === 1) return nums
  const dp = Array(numLen + 1).fill(0)
  dp[0] = nums[0]
  max = dp[0]
  for (let i = 1; i < numLen; i++) {
    if (dp[i - 1] > 0) {
      dp[i] = dp[i - 1] + nums[i]
    } else {
      dp[i] = nums[i]
    }
    max = Math.max(dp[i], max)
  }
  return max
}
console.log(maxSubArray([-2, 1, -3, 4, -1, 2, 1, -5, 4]))
