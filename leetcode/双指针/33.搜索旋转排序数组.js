/*
 * @lc app=leetcode.cn id=33 lang=javascript
 *
 * [33] 搜索旋转排序数组
 *
 * https://leetcode.cn/problems/search-in-rotated-sorted-array/description/
 *
 * algorithms
 * Medium (44.39%)
 * Likes:    2999
 * Dislikes: 0
 * Total Accepted:    937.9K
 * Total Submissions: 2.1M
 * Testcase Example:  '[4,5,6,7,0,1,2]\n0'
 *
 * 整数数组 nums 按升序排列，数组中的值 互不相同 。
 *
 * 在传递给函数之前，nums 在预先未知的某个下标 k（0 <= k < nums.length）上进行了 旋转，使数组变为 [nums[k],
 * nums[k+1], ..., nums[n-1], nums[0], nums[1], ..., nums[k-1]]（下标 从 0 开始
 * 计数）。例如， [0,1,2,4,5,6,7] 在下标 3 处经旋转后可能变为 [4,5,6,7,0,1,2] 。
 *
 * 给你 旋转后 的数组 nums 和一个整数 target ，如果 nums 中存在这个目标值 target ，则返回它的下标，否则返回 -1 。
 *
 * 你必须设计一个时间复杂度为 O(log n) 的算法解决此问题。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：nums = [4,5,6,7,0,1,2], target = 0
 * 输出：4
 *
 *
 * 示例 2：
 *
 *
 * 输入：nums = [4,5,6,7,0,1,2], target = 3
 * 输出：-1
 *
 * 示例 3：
 *
 *
 * 输入：nums = [1], target = 0
 * 输出：-1
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= nums.length <= 5000
 * -10^4 <= nums[i] <= 10^4
 * nums 中的每个值都 独一无二
 * 题目数据保证 nums 在预先未知的某个下标上进行了旋转
 * -10^4 <= target <= 10^4
 *
 *
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function (nums, target) {
  if (nums.length === 1) return target === nums[0] ? 0 : -1
  let left = 0,
    right = nums.length - 1
  // 1、找到数组中间元素，肯定0 - middle 和 middle - right肯定有一边是有序的
  while (left <= right) {
    let middle = (left + right) >> 1
    // 找到了，返回下标middle
    if (nums[middle] === target) return middle
    // 假设左边是有序的
    if (nums[left] <= nums[middle]) {
      // 出现在左边有序数组[0 - middle)中，继续二分查找
      if (target >= nums[left] && target < nums[middle]) {
        right = middle - 1
      } else {
        // 否则出现不在有序数组
        left = middle + 1
      }
    } else {
      // 假设右边是有序的
      // 出现右边有序数组(middle - right]中
      if (target > nums[middle] && target <= nums[right]) {
        left = middle + 1
      } else {
        // 否则出现不在有序数组
        right = middle - 1
      }
    }
  }
  return -1
}
// @lc code=end
