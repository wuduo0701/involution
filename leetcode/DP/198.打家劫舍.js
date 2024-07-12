/*
 * @lc app=leetcode.cn id=198 lang=javascript
 *
 * [198] 打家劫舍
 * 你是一个专业的小偷，计划偷窃沿街的房屋。
 * 每间房内都藏有一定的现金，影响你偷窃的唯一制约因素就是相邻的房屋装有相互连通的防盗系统，如果两间相邻的房屋在同一晚上被小偷闯入，系统会自动报警。
 * 给定一个代表每个房屋存放金额的非负整数数组，计算你 不触动警报装置的情况下 ，一夜之内能够偷窃到的最高金额。
 */

// 示例 1：
// 输入：[1,2,3,1]
// 输出：4
// 解释：偷窃 1 号房屋 (金额 = 1) ，然后偷窃 3 号房屋 (金额 = 3)。偷窃到的最高金额 = 1 + 3 = 4 。

// 示例 2：
// 输入：[2,7,9,3,1]
// 输出：12
// 解释：偷窃 1 号房屋 (金额 = 2), 偷窃 3 号房屋 (金额 = 9)，接着偷窃 5 号房屋 (金额 = 1)。偷窃到的最高金额 = 2 + 9 + 1 = 12 。

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var rob = function (nums) {
  // 动态方程：dp[i] = Math.max(dp[i + 1], nums[i] + dp[i + 2])

  if (nums.length === 1) return nums[0]
  const dp = []
  dp[nums.length - 1] = nums[nums.length - 1] // 有一间，只有一种偷法
  dp[nums.length - 2] = Math.max(nums[nums.length - 2], nums[nums.length - 1]) //  有两间，只有两种偷法，取最大值

  // 随后往前递归-套用动态方程：dp[i] = Math.max(dp[i + 1], nums[i] + dp[i + 2])。
  // 最大值即是dp[0]
  for (let i = nums.length - 3; i >= 0; i--) {
    dp[i] = Math.max(dp[i + 1], nums[i] + dp[i + 2])
  }

  return dp[0]
}
// @lc code=end

console.log(rob([1, 2, 3, 1]))
console.log(rob([2, 7, 9, 3, 1]))
