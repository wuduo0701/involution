/*
 * @lc app=leetcode.cn id=213 lang=javascript
 *
 * [213] 打家劫舍 II
 * 你是一个专业的小偷，计划偷窃沿街的房屋，每间房内都藏有一定的现金。这个地方所有的房屋都 围成一圈 ，这意味着第一个房屋和最后一个房屋是紧挨着的。
 * 同时，相邻的房屋装有相互连通的防盗系统，如果两间相邻的房屋在同一晚上被小偷闯入，系统会自动报警 。
 * 给定一个代表每个房屋存放金额的非负整数数组，计算你 在不触动警报装置的情况下 ，今晚能够偷窃到的最高金额。
 */

// 示例 1：
// 输入：nums = [2,3,2]
// 输出：3
// 解释：你不能先偷窃 1 号房屋（金额 = 2），然后偷窃 3 号房屋（金额 = 2）, 因为他们是相邻的。

// 示例 2：
// 输入：nums = [1,2,3,1]
// 输出：4
// 解释：你可以先偷窃 1 号房屋（金额 = 1），然后偷窃 3 号房屋（金额 = 3）。
//      偷窃到的最高金额 = 1 + 3 = 4 。

// 示例 3：
// 输入：nums = [1,2,3]
// 输出：3

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
// NOTE:关键在于环形问题可以拆解成两个线性问题。然后计算两种问题的最大值即可
// 1、第0到n-2个房子，即不考虑最后一个房子
// 2、第1到n-1个房子，即不考虑第一个房子
var rob = function (nums) {
  if (nums.length === 1) return nums[0]

  const robFn = (arr) => {
    const dp = new Array(arr.length).fill(0)
    dp[0] = arr[0] // 有一间，只有一种偷法
    dp[1] = Math.max(arr[0], arr[1]) //  有两间，只有两种偷法，取最大值
    for (let i = 2; i < arr.length; i++) {
      dp[i] = Math.max(dp[i - 2] + arr[i], dp[i - 1])
    }
    return dp[arr.length - 1] // 返回最大抢劫金额
  }

  // 分两种情况，考虑环形特性
  return Math.max(robFn(nums.slice(1)), robFn(nums.slice(0, nums.length - 1)))
}
// @lc code=end

console.log(rob([1, 2, 3, 1]))
