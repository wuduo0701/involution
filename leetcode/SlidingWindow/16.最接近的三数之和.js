/*
 * @lc app=leetcode.cn id=16 lang=javascript
 *
 * [16] 最接近的三数之和
 * 给你一个长度为 n 的整数数组 nums 和 一个目标值 target。请你从 nums 中选出三个整数，使它们的和与 target 最接近。
 * 返回这三个数的和。
 * 假定每组输入只存在恰好一个解
 */

// 示例 1：
// 输入：nums = [-1,2,1,-4], target = 1
// 输出：2
// 解释：与 target 最接近的和是 2 (-1 + 2 + 1 = 2) 。

// 示例 2：
// 输入：nums = [0,0,0], target = 1
// 输出：0

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var threeSumClosest = function (nums, target) {
  nums.sort((a, b) => a - b)
  const n = nums.length
  let closest = Number.MAX_SAFE_INTEGER
  let result = 0

  for (let i = 0; i < n - 2; i++) {
    // 优化一
    if (nums[i] === nums[i - 1]) {
      continue // 跳过重复的循环
    }
    let left = i + 1,
      right = n - 1
    while (left < right) {
      const sum = nums[i] + nums[left] + nums[right]
      if (sum === target) {
        return target
      } else if (sum > target) {
        if (sum - target < closest) {
          closest = sum - target
          result = sum
        }
        right--
      } else {
        if (target - sum < closest) {
          closest = target - sum
          result = sum
        }
        left++
      }
    }
  }
  return result
}
// @lc code=end

console.log(threeSumClosest([-1, 2, 1, -4], 1))
