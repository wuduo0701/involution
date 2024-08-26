/*
 * @lc app=leetcode.cn id=581 lang=javascript
 *
 * [581] 最短无序连续子数组
 * 给你一个整数数组 nums ，你需要找出一个 连续子数组 ，
 * 如果对这个子数组进行升序排序，那么整个数组都会变为升序排序。
 * 请你找出符合题意的 最短 子数组，并输出它的长度。
 */

// 示例 1：
// 输入：nums = [2,6,4,8,10,9,15]
// 输出：5
// 解释：你只需要对 [6, 4, 8, 10, 9] 进行升序排序，那么整个表都会变为升序排序。

// 示例 2：
// 输入：nums = [1,2,3,4]
// 输出：0

// 示例 3：
// 输入：nums = [1]
// 输出：0

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var findUnsortedSubarray = function (nums) {
  // 复制数组，从小到大排
  const sortNum = nums.slice().sort((a, b) => a - b)
  let left = 0,
    right = nums.length - 1
  while (left <= right && nums[left] === sortNum[left]) {
    left++
  }
  while (left <= right && nums[right] === sortNum[right]) {
    right--
  }
  return right - left + 1
}
// @lc code=end
