/*
 * @lc app=leetcode.cn id=31 lang=javascript
 *
 * [31] 下一个排列
 */

// 示例 1：
// 输入：nums = [1,2,3]
// 输出：[1,3,2]

// 示例 2：
// 输入：nums = [3,2,1]
// 输出：[1,2,3]

// 示例 3：
// 输入：nums = [1,1,5]
// 输出：[1,5,1]

// @lc code=start
/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var nextPermutation = function (nums) {
  const n = nums.length
  let i = n - 2
  // 找到第一个 num[i] < num[i+1] 的值。如[1,2,3]的下一个是[1,3,2]
  // 那么num[i] 就可以替换 如上面的 2。nums[i+1] 到 nums[n−1] 的元素是一个降序序列
  while (i >= 0 && nums[i] >= nums[i + 1]) {
    i--
  }
  // 找到中间可以替换的值，否则为降序序列
  if (i >= 0) {
    let j = n - 1
    while (j > i && nums[j] <= nums[i]) {
      --j
    }
    ;[nums[i], nums[j]] = [nums[j], nums[i]]
  }
  let left = i + 1
  let right = n - 1
  while (left < right) {
    ;[nums[left], nums[right]] = [nums[right], nums[left]]
    left++
    right--
  }
}
// @lc code=end
