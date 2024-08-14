/*
 * @lc app=leetcode.cn id=128 lang=javascript
 *
 * [128] 最长连续序列
 * 给定一个未排序的整数数组 nums ，找出数字连续的最长序列（不要求序列元素在原数组中连续）的长度。
 * 请你设计并实现时间复杂度为 O(n) 的算法解决此问题。
 */

// 示例 1：
// 输入：nums = [100,4,200,1,3,2]
// 输出：4
// 解释：最长数字连续序列是 [1, 2, 3, 4]。它的长度为 4。

// 示例 2：
// 输入：nums = [0,3,7,2,5,8,4,6,0,1]
// 输出：9

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var longestConsecutive = function (nums) {
  if (nums.length <= 1) return nums.length

  // 使用hash表存储，并去重
  const s = new Set(nums)
  let ans = 0
  for (const x of nums) {
    // x为当前元素，查找x是否有前驱节点
    if (!s.has(x - 1)) {
      // 直接判断x+1，因为x已经是存在的前驱节点
      let y = x + 1
      while (s.has(y)) {
        // 继续向下判断
        y++
      }
      // 找出最大值
      ans = Math.max(ans, y - x)
    }
  }
  return ans
}
// @lc code=end
