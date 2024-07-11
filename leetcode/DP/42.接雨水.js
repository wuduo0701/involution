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

  leftMax[0] = height[0] // 初始化左边第一个最大值
  for (let i = 1; i < len; i++) {
    // 当前高度的最大值，是左边i-1的最大值和当前值作比对，取出更大值
    leftMax[i] = Math.max(leftMax[i - 1], height[i])
  }

  // 填充 right_max 数组
  rightMax[len - 1] = height[len - 1] // 初始化右边第一个最大值
  for (let i = len - 2; i >= 0; i--) {
    // 当前值的最大值，是右边i+1的最大值和当前值作比对，取出更大值
    rightMax[i] = Math.max(rightMax[i + 1], height[i])
  }

  let totalWater = 0
  for (let i = 0; i < len; i++) {
    totalWater += Math.min(leftMax[i], rightMax[i]) - height[i]
  }
  console.log(leftMax, rightMax)
  return totalWater
}
// @lc code=end
trap([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1])

var trapDoublePinter = function (height) {
  let left = 0,
    right = height.length - 1,
    lettMax = 0,
    rightMax = 0,
    totalWater = 0
  while (left < right) {
    if (height[left] < height[right]) {
      if (height[left] >= lettMax) {
        lettMax = height[left]
      } else {
        totalWater += lettMax - height[left]
      }
      left++
    } else {
      if (height[right] >= rightMax) {
        rightMax = height[right]
      } else {
        totalWater += rightMax - height[right]
      }
      right--
    }
  }
  return totalWater
}

console.log(trapDoublePinter([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]))
