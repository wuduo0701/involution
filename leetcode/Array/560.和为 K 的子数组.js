/*
 * @lc app=leetcode.cn id=560 lang=javascript
 *
 * [560] 和为 K 的子数组
 * 给你一个整数数组 nums 和一个整数 k ，请你统计并返回 该数组中和为 k 的子数组的个数 。
 * 子数组是数组中元素的连续非空序列。
 */

// 示例 1：
// 输入：nums = [1,1,1], k = 2
// 输出：2

// 示例 2：
// 输入：nums = [1,2,3], k = 3
// 输出：2

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var subarraySum = function (nums, k) {
  let sum = 0 // 前缀和
  let ans = 0 // 结果
  let map = new Map() // 用于存储前缀和及其出现的次数
  map.set(0, 1) // 设置默认值，0出现了1次
  for (let i of nums) {
    sum += i
    // 检查是否存在前缀和为 sum - k 的情况
    if (map.has(sum - k)) {
      // 如果存在，说明从某个位置到当前元素的子数组和为 k，将其出现的次数加到 count 中
      // 因为此时的sum = k + (sum - k)，如果存在sum - k，即之前就有和为sum - k的数。
      ans += map.get(sum - k)
    }
    // 更新当前前缀和的出现次数
    map.set(sum, (map.get(sum) || 0) + 1)
  }
  return ans
}
// @lc code=end
