/*
 * @lc app=leetcode.cn id=53 lang=javascript
 *
 * [53] 最大子数组和
 */
// 示例 1：
// 输入：nums = [-2,1,-3,4,-1,2,1,-5,4]
// 输出：6
// 解释：连续子数组 [4,-1,2,1] 的和最大，为 6 。

// 示例 2：
// 输入：nums = [1]
// 输出：1

// 示例 3：
// 输入：nums = [5,4,-1,7,8]
// 输出：23

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */

// 解法：https://github.com/ascoders/weekly/blob/master/%E7%AE%97%E6%B3%95/198.%E7%B2%BE%E8%AF%BB%E3%80%8A%E7%AE%97%E6%B3%95%20-%20%E5%8A%A8%E6%80%81%E8%A7%84%E5%88%92%E3%80%8B.md#%E6%9C%80%E5%A4%A7%E5%AD%90%E5%BA%8F%E5%92%8C
// 状态转移方程：
// 1. 如 dp[i - 1] > 0 则dp[i] = dp[i - 1] + nums[i]
// 2. 否则 dp[i] = nums[i]
// 最后 取出dp数组中的最大值

var maxSubArray = function (nums) {
  const numsLen = nums.length
  if (numsLen <= 1) return nums

  let dp = new Array(numsLen).fill(0) // 每个截止到这个子数组的最大和
  dp[0] = nums[0]
  let max = dp[0]

  for (let i = 1; i < numsLen; i++) {
    if (dp[i - 1] > 0) {
      dp[i] = dp[i - 1] + nums[i]
    } else {
      dp[i] = nums[i]
    }
    max = Math.max(max, dp[i])
  }
  return max
}
// @lc code=end
