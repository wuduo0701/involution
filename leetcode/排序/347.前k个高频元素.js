/*
 * @lc app=leetcode.cn id=347 lang=javascript
 *
 * [347] 前 K 个高频元素
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var topKFrequent = function (nums, k) {
  if (nums.length === 1) return nums

  // 定义hash 集合，看每个值出现几次
  const map = new Map()
  for (let num of nums) {
    if (map.has(num)) {
      map.set(num, map.get(num) + 1)
    } else {
      map.set(num, 1)
    }
  }
  // 对出现的次数从大到小排序
  const sortNum = Array.from(map).sort((a, b) => b[1] - a[1])
  // 截取前k个数组 并打印出结果
  return sortNum.slice(0, k).map((arr) => arr[0])
}
// @lc code=end
