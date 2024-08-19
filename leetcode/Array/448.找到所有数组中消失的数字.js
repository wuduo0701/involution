/*
 * @lc app=leetcode.cn id=448 lang=javascript
 *
 * [448] 找到所有数组中消失的数字
 * 给你一个含 n 个整数的数组 nums ，其中 nums[i] 在区间 [1, n] 内。
 * 请你找出所有在 [1, n] 范围内但没有出现在 nums 中的数字，并以数组的形式返回结果。
 */

// 示例 1：
// 输入：nums = [4,3,2,7,8,2,3,1]
// 输出：[5,6]

// 示例 2：
// 输入：nums = [1,1]
// 输出：[2]

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var findDisappearedNumbers = function (nums) {
  const result = []
  // 将|nums[i] - 1|位置的数字标记为负数，表示nums[i]出现过
  for (let num of nums) {
    const i = Math.abs(num) - 1
    if (nums[i] > 0) {
      nums[i] = -nums[i]
    }
  }

  // 遍历所有的nums，如果为正数的，则数所在下标就是没有出现过的
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] > 0) result.push(i + 1)
  }

  return result
}
// @lc code=end
