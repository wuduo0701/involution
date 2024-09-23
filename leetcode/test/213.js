var rob = function (nums) {
  if (nums.length === 1) return nums[0]

  const robFn = (arr) => {
    const dp = new Array(arr.length).fill(0)
    dp[0] = arr[0]
    dp[1] = Math.max(arr[0], arr[1])
    for (let i = 2; i < arr.length; i++) {
      dp[i] = Math.max(dp[i - 2] + arr[i], dp[i - 1])
    }
    return dp[arr.length - 1] // 返回最大抢劫金额
  }

  // 分两种情况，考虑环形特性
  return Math.max(robFn(nums.slice(1)), robFn(nums.slice(0, nums.length - 1)))
}

console.log(rob([2, 3, 2]))
console.log(rob([1, 2, 3, 1]))
