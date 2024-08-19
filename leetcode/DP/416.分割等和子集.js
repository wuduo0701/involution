/*
 * @lc app=leetcode.cn id=416 lang=javascript
 *
 * [416] 分割等和子集
 * 给你一个 只包含正整数 的 非空 数组 nums 。请你判断是否可以将这个数组分割成两个子集，使得两个子集的元素和相等。
 */

// 示例 1：
// 输入：nums = [1,5,11,5]
// 输出：true
// 解释：数组可以分割成 [1, 5, 5] 和 [11] 。

// 示例 2：
// 输入：nums = [1,2,3,5]
// 输出：false
// 解释：数组不能分割成两个元素和相等的子集。

// @lc code=start
/**
 * @param {number[]} nums
 * @return {boolean}
 */
var canPartition = function (nums) {
  // 将题目转化成找到和 sum / 2的子集
  const sum = nums.reduce((a, b) => a + b, 0)
  if (sum % 2 !== 0) return false // 合不为偶数，则不可能被均分

  let newTarget = sum / 2
  const dp = new Array(newTarget + 1).fill(0) // dp表示和为i的数
  dp[0] = 1
  for (let num of nums) {
    for (let i = newTarget; i >= num; i--) {
      dp[i] = dp[i] + dp[i - num]
    }
  }
  return dp[newTarget]
}
// @lc code=end
