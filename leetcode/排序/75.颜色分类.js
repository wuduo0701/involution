/*
 * @lc app=leetcode.cn id=75 lang=javascript
 *
 * [75] 颜色分类
 * 给定一个包含红色、白色和蓝色、共 n 个元素的数组 nums ，
 * 原地 对它们进行排序，使得相同颜色的元素相邻，并按照红色、白色、蓝色顺序排列。
 * 我们使用整数 0、 1 和 2 分别表示红色、白色和蓝色。
 * 必须在不使用库内置的 sort 函数的情况下解决这个问题。
 */

// 示例 1：
// 输入：nums = [2,0,2,1,1,0]
// 输出：[0,0,1,1,2,2]

// 示例 2：
// 输入：nums = [2,0,1]
// 输出：[0,1,2]
// @lc code=start
/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var sortColors = function (nums) {
  // 0出现的次数 1出现的次数
  let n0 = 0,
    n1 = 0
  // 刷油漆问题
  // 先碰到把所有的都刷成2
  // 碰到几个比2小的从前面刷几次1
  // 碰到几个比1小的从前面刷几次0
  for (let i = 0; i < nums.length; i++) {
    const num = nums[i]
    nums[i] = 2
    if (num < 2) {
      nums[n1++] = 1
    }
    if (num < 1) {
      nums[n0++] = 0
    }
  }
}
// @lc code=end
