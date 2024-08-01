/*
 * @lc app=leetcode.cn id=26 lang=javascript
 *
 * [26] 删除有序数组中的重复项
 * 给你一个 非严格递增排列 的数组 nums ，请你 原地 删除重复出现的元素，使每个元素 只出现一次 ，返回删除后数组的新长度。元素的 相对顺序 应该保持 一致 。然后返回 nums 中唯一元素的个数。
 * 考虑 nums 的唯一元素的数量为 k ，你需要做以下事情确保你的题解可以被通过：
 * 更改数组 nums ，使 nums 的前 k 个元素包含唯一元素，并按照它们最初在 nums 中出现的顺序排列。nums 的其余元素与 nums 的大小不重要。
 * 返回 k 。
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function (nums) {
  const lenth = nums.length
  if (lenth === 0) return 0
  let left = 1,
    right = 1
  while (right < lenth) {
    // 1、第一个肯定不重复，所有left为1开始
    // 2、通过判断right 和 right - 1 不一样，证明nums[right]和之前的都不同。替换值，并且left++
    // 3、通过保证0 -> left 的值都是唯一的
    if (nums[right] !== nums[right - 1]) {
      nums[left] = nums[right]
      left++
    }
    right++
  }
  return left
}
// @lc code=end
