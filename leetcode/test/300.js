var lengthOfLIS = function (nums) {
  if (nums.length === 1) return nums
  const dp = new Array(nums.length + 1).fill(1)
  ans = 1
  for (let i = 1; i < nums.length; i++) {
    for (let j = 0; j < i; j++) {
      if (nums[j] < nums[i]) {
        dp[i] = Math.max(dp[i], dp[j] + 1)
      }
      ans = Math.max(dp[i], ans)
    }
  }
  return ans
}
