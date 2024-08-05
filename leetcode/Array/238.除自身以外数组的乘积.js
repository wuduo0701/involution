/*
 * @lc app=leetcode.cn id=238 lang=javascript
 *
 * [238] 除自身以外数组的乘积
 * 给你一个整数数组 nums，返回 数组 answer ，其中 answer[i] 等于 nums 中除 nums[i] 之外其余各元素的乘积 。
 * 题目数据 保证 数组 nums之中任意元素的全部前缀元素和后缀的乘积都在  32 位 整数范围内。
 * 请 不要使用除法，且在 O(n) 时间复杂度内完成此题。
 */

// 示例 1:
// 输入: nums = [1,2,3,4]
// 输出: [24,12,8,6]

// 示例 2:
// 输入: nums = [-1,1,0,-3,3]
// 输出: [0,0,9,0,0]

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number[]}
 * 左右乘积法
 */
var productExceptSelf = function (nums) {
  const n = nums.length
  if (n < 2) return nums
  const result = Array.from(n)
  result[0] = 1

  // 从左往右遍历计算出左边到i - 1值的乘积（即排除自身）
  // 如result[2] = nums[0] * nums[1]
  for (i = 1; i < n; i++) {
    result[i] = result[i - 1] * nums[i - 1]
  }
  let R = 1
  // 从右往左遍历
  // 从左到i-1的乘积（即排除自身） * 右边元素的积（即排除自身）
  for (i = n - 1; i >= 0; i--) {
    result[i] *= R // 先计算乘积
    R *= nums[i] // 在计算右边的乘积
  }

  return result
}
// @lc code=end

console.log(productExceptSelf([1, 2, 3, 4]))
console.log(productExceptSelf([-1, 1, 0, -3, 3]))
