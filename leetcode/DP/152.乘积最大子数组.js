ng
/*
 * @lc app=leetcode.cn id=152 lang=javascript
 *
 * [152] 乘积最大子数组
 * 给你一个整数数组 nums ，请你找出数组中乘积最大的非空连续子数组（该子数组中至少包含一个数字），
 * 并返回该子数组所对应的乘积。
 * 测试用例的答案是一个 32-位 整数。
 */

// 示例 1:
// 输入: nums = [2,3,-2,4]
// 输出: 6
// 解释: 子数组 [2,3] 有最大乘积 6。

// 示例 2:
// 输入: nums = [-2,0,-1]
// 输出: 0
// 解释: 结果不能为 2, 因为 [-2,-1] 不是子数组。
// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var maxProduct = function (nums) {
  // 初始化
  let [max, min, result] = [nums[0], nums[0], nums[0]]
  for (let i = 1; i < nums.length; i++) {
    // 负数会改变乘积的符号
    // 交换最大最小值，确保最大乘积
    if (nums[i] < 0) {
      ;[max, min] = [min, max]
    }
    // 更新最大乘积
    max = Math.max(nums[i], max * nums[i])
    // 更新最小乘积
    min = Math.min(nums[i], min * nums[i])

    result = Math.max(result, max)
  }
  return result
}
// @lc code=end
