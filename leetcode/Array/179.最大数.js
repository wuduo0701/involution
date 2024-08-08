/*
 * @lc app=leetcode.cn id=179 lang=javascript
 *
 * [179] 最大数
 * 给定一组非负整数 nums，重新排列每个数的顺序（每个数不可拆分）使之组成一个最大的整数。
 * 注意：输出结果可能非常大，所以你需要返回一个字符串而不是整数。
 */
// 示例 1：
// 输入：nums = [10,2]
// 输出："210"

// 示例 2：
// 输入：nums = [3,30,34,5,9]
// 输出："9534330"

// @lc code=start
/**
 * @param {number[]} nums
 * @return {string}
 */
var largestNumber = function (nums) {
  // 方法：较大的拼接结果优先：
  // 1. 通过比较 b + a 和 a + b 的结果，我们可以确定哪个拼接结果更大
  // 例如：比较 30 和 34：
  // 30 + 34 = "3034"
  // 34 + 30 = "3430"
  // "3430" > "3034"，因此 34 应该排在 30 前面。

  // 只要确保每队数字都是都被排序成能产生最大数，即可拼接成最大数
  nums = nums.sort((a, b) => {
    return '' + b + a - ('' + a + b)
  })

  return nums[0] ? nums.join('') : '0'
}
// @lc code=end
