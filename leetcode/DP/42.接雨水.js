/*
 * @lc app=leetcode.cn id=42 lang=javascript
 *
 * [42] 接雨水
 * 给定 n 个非负整数表示每个宽度为 1 的柱子的高度图，计算按此排列的柱子，下雨之后能接多少雨水。
 *
 */
// 示例一：
// 输入：height = [0,1,0,2,1,0,1,3,2,1,2,1]
// 输出：6
// 解释：上面是由数组 [0,1,0,2,1,0,1,3,2,1,2,1] 表示的高度图，在这种情况下，可以接 6 个单位的雨水（蓝色部分表示雨水）。

// 示例 2：
// 输入：height = [4,2,0,3,2,5]
// 输出：9
// @lc code=start
/**
 * @param {number[]} height
 * @return {number}
 */
var trap = function (height) {
  const len = height.length
  if (len === 0) return 0

  const leftMax = new Array(len).fill(0)
  const rightMax = new Array(len).fill(0)

  leftMax[0] = height[0]
  for (let i = 1; i < len; i++) {
    leftMax[i] = Math.max(leftMax[i - 1], height[i])
  }

  // 填充 right_max 数组
  rightMax[len - 1] = height[len - 1]
  for (let i = len - 2; i >= 0; i--) {
    rightMax[i] = Math.max(rightMax[i + 1], height[i])
  }

  let totalWater = 0
  for (let i = 0; i < len; i++) {
    totalWater += Math.min(leftMax[i], rightMax[i]) - height[i]
  }
  return totalWater
}
// @lc code=end
