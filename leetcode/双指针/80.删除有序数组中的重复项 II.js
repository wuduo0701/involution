/*
 * @lc app=leetcode.cn id=80 lang=javascript
 *
 * [80] 删除有序数组中的重复项 II
 * 给你一个有序数组 nums ，请你 原地 删除重复出现的元素，使得出现次数超过两次的元素只出现两次 ，返回删除后数组的新长度。
 * 不要使用额外的数组空间，你必须在 原地 修改输入数组 并在使用 O(1) 额外空间的条件下完成。
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function (nums) {
  let n = nums.length
  // 对于初始小于等于2的 无需处理
  if (n <= 2) return n
  // left：慢指针，表示处理符合要求的数组的长度，
  // right：快指针，表示已经检查过的数组的长度
  let left = 2,
    right = 2
  while (right < n) {
    // 因为相同元素最多出现两次而非一次，所以需要建议 left - 2的元素和right做对比
    // 如果不想到则符合要求，替换。并且left++
    // right++ 是无论是否符合条件都执行
    if (nums[left - 2] !== nums[right]) {
      nums[left] = nums[right]
      left++
    }
    right++
  }
  return left
}
// @lc code=end
