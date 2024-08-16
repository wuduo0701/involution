/*
 * @lc app=leetcode.cn id=11 lang=javascript
 *
 * [11] 盛最多水的容器
 * 给定一个长度为 n 的整数数组 height 。有 n 条垂线，第 i 条线的两个端点是 (i, 0) 和 (i, height[i]) 。
 * 找出其中的两条线，使得它们与 x 轴共同构成的容器可以容纳最多的水。
 * 返回容器可以储存的最大水量。
 * 说明：你不能倾斜容器。
 */

// @lc code=start
/**
 * @param {number[]} height
 * @return {number}
 */
var maxArea = function (height) {
  let left = 0,
    right = height.length - 1

  let ans = 0
  // 1. 一开始假设最远的柱子，因为此时的宽度最大
  while (left < right) {
    // 容纳水的容量 = 两根柱子的间距宽 * 最短的那根柱子
    const area = (right - left) * Math.min(height[left], height[right])
    ans = Math.max(ans, area) // 和之前的判断
    // 假设左边的柱子更小，因为此时的高度就是左边的
    // 所有我们要移动左边的，寻找更大的即 left++
    // 否则 right--
    if (height[left] < height[right]) {
      left++
    } else {
      right--
    }
  }
  return ans
}
// @lc code=end
